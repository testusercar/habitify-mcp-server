#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import axios, { AxiosInstance } from 'axios'
import dotenv from 'dotenv'

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
  baseURL: '',
  headers: {
    Accept: 'application/json',
  },
  timeout: 30000,
})

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

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.server.connect(transport)
  logger.log('Habitify API MCP Server started')
}

main().catch((error) => {
  console.error('Server error:', error)
  process.exit(1)
})
