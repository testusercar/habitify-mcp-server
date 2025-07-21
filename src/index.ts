#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

dotenv.config()

const envSchema = z.object({
  HABITIFY_API_KEY: z.string(),
})

const env = envSchema.parse(process.env)

const mcpServer = new McpServer(
  {
    name: '@sargonpiraev/habitify-mcp-server',
    version: '',
  },
  {
    instructions: `API for Habitify habit tracking service`,
    capabilities: {
      tools: {},
      logging: {},
    },
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

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://api.habitify.me',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

apiClient.interceptors.request.use(
  (config) => {
    if (env.HABITIFY_API_KEY) {
      config.headers['Authorization'] = env.HABITIFY_API_KEY
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
    const message = error.response?.data?.message || error.message
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

mcpServer.tool(
  'get-journal',
  `Get habit journal for a specific date`,
  {
    target_date: z.string().optional(),
    order_by: z.string().optional(),
    status: z.string().optional(),
    area_id: z.string().optional(),
    time_of_day: z.string().optional(),
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
  'add-habit-log',
  `Add a habit log`,
  {
    habit_id: z.string(),
  },
  async (args) => {
    try {
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
  'delete-habit-logs-range',
  `Delete habit logs in date range`,
  {
    habit_id: z.string(),
    start_date: z.string(),
    end_date: z.string(),
  },
  async (args) => {
    try {
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
  'delete-habit-log',
  `Delete a specific habit log`,
  {
    habit_id: z.string(),
    log_id: z.string(),
  },
  async (args) => {
    try {
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
    status: z.string().optional(),
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
  'get-habit',
  `Get habit details`,
  {
    habit_id: z.string(),
  },
  async (args) => {
    try {
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
    start_date: z.string().optional(),
    end_date: z.string().optional(),
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

mcpServer.tool('add-mood', `Add mood entry`, {}, async (args) => {
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
    start_date: z.string().optional(),
    end_date: z.string().optional(),
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

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('Habitify API MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
