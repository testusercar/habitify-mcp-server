#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

// Load environment variables
dotenv.config()

// Environment configuration schema
const envSchema = z.object({
  HABITIFY_API_KEY: z.string().min(1),
  //  TOOL_GLOB_PATTERNS: z.string().optional(),
  //  LOG_LEVEL: z.enum(['debug', 'info', 'notice', 'warning', 'error']).default('info').optional(),
})

// Parse and validate environment variables
const env = envSchema.parse(process.env)

const mcpServer = new McpServer(
  {
    name: '@sargonpiraev/habitify-mcp-server',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
      logging: {},
    },
    instructions: `MCP server for Habitify API integration - track habits, manage mood logs, and automate habit tracking workflows directly from AI assistants like Claude and Cursor`,
  }
)

const logger = {
  log: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'info', data: message.join(' ') }),
  error: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'error', data: message.join(' ') }),
  debug: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'debug', data: message.join(' ') }),
}

// Axios client setup
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.habitify.me',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

// Add request interceptor for environment variables
apiClient.interceptors.request.use(
  (config) => {
    if (env.HABITIFY_API_KEY) {
      config.headers['X-API-Key'] = env.HABITIFY_API_KEY
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

function handleError(error: unknown) {
  console.error(error)
  logger.error('Error occurred:', JSON.stringify(error))

  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.description || error.message
    return {
      isError: true,
      content: [{ type: 'text', text: `API Error: ${message}` }],
    } as CallToolResult
  }

  return {
    isError: true,
    content: [{ type: 'text', text: `Error: ${error}` }],
  } as CallToolResult
}

// Tools
mcpServer.tool(
  'getJournal',
  `Get habit journal for a specific date\n\nRetrieve a list of habits for a specific date with optional filtering and ordering`,
  {
    target_date: z
      .string()
      .optional()
      .describe(`The date to get the list of habits for (YYYY-MM-DD format). If not provided, returns current date`),
    order_by: z.string().optional().describe(`Order habits by specified field`),
    status: z.string().optional().describe(`Filter habits by status`),
    area_id: z.string().optional().describe(`Filter habits by area ID`),
    time_of_day: z.string().optional().describe(`Filter habits by time of day`),
  },
  async ({ target_date, order_by, status, area_id, time_of_day }) => {
    try {
      logger.log(
        'getJournal called with params:',
        JSON.stringify({ target_date, order_by, status, area_id, time_of_day })
      )

      const url: string = '/journal'

      const queryParams: Record<string, unknown> = {}
      if (target_date !== undefined) queryParams.target_date = target_date
      if (order_by !== undefined) queryParams.order_by = order_by
      if (status !== undefined) queryParams.status = status
      if (area_id !== undefined) queryParams.area_id = area_id
      if (time_of_day !== undefined) queryParams.time_of_day = time_of_day

      const response = await apiClient.get(url, { params: queryParams })

      return { content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }] }
    } catch (error) {
      return handleError(error)
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('Habitify MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
