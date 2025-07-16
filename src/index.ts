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
    version: '',
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

function handleResult(data: unknown): CallToolResult {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
  }
}

function handleError(error: unknown): CallToolResult {
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
  'get-journal',
  `Get habit journal for a specific date`,
  {
    target_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    order_by: z.any().optional(),
    status: z.any().optional(),
    area_id: z.string().optional(),
    time_of_day: z.any().optional(),
  },
  async (args) => {
    try {
      const response = await apiClient.get('/journal', {
        params: args,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'post-logs-by-id',
  `Add a habit log`,
  {
    habit_id: z.string().min(1),
  },
  async (args) => {
    try {
      // Extract path parameters and request data
      const { habit_id, ...requestData } = args
      const url = `/logs/${habit_id}`

      const response = await apiClient.post(url, requestData)
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-logs-by-id',
  `Delete habit logs in date range`,
  {
    habit_id: z.string().min(1),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  },
  async (args) => {
    try {
      // Extract path parameters and query parameters
      const { habit_id, ...queryParams } = args
      const url = `/logs/${habit_id}`

      const response = await apiClient.delete(url, {
        params: queryParams,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'delete-logs-by-id-by-id',
  `Delete a specific habit log`,
  {
    habit_id: z.string().min(1),
    log_id: z.string().min(1),
  },
  async (args) => {
    try {
      // Extract path parameters and query parameters
      const { habit_id, log_id, ...queryParams } = args
      const url = `/logs/${habit_id}/${log_id}`

      const response = await apiClient.delete(url, {
        params: queryParams,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-habits',
  `Get all habits`,
  {
    status: z.any().optional(),
    area_id: z.string().optional(),
  },
  async (args) => {
    try {
      const response = await apiClient.get('/habits', {
        params: args,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool(
  'get-habits-by-id',
  `Get habit details`,
  {
    habit_id: z.string().min(1),
  },
  async (args) => {
    try {
      // Extract path parameters and query parameters
      const { habit_id, ...queryParams } = args
      const url = `/habits/${habit_id}`

      const response = await apiClient.get(url, {
        params: queryParams,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool('get-areas', `Get all areas`, {}, async (args) => {
  try {
    const response = await apiClient.get('/areas', {
      params: args,
    })
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool(
  'get-moods',
  `Get mood entries`,
  {
    start_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    end_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  },
  async (args) => {
    try {
      const response = await apiClient.get('/moods', {
        params: args,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool('post-moods', `Add mood entry`, {}, async (args) => {
  try {
    const response = await apiClient.post('/moods', args)
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool(
  'get-notes',
  `Get notes`,
  {
    start_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    end_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
  },
  async (args) => {
    try {
      const response = await apiClient.get('/notes', {
        params: args,
      })
      return handleResult(response.data)
    } catch (error) {
      return handleError(error)
    }
  }
)

mcpServer.tool('post-notes', `Add note`, {}, async (args) => {
  try {
    const response = await apiClient.post('/notes', args)
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

mcpServer.tool('get-actions', `Get available actions`, {}, async (args) => {
  try {
    const response = await apiClient.get('/actions', {
      params: args,
    })
    return handleResult(response.data)
  } catch (error) {
    return handleError(error)
  }
})

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('Habitify MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
