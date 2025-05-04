#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { HabitifyApiClient } from '@sargonpiraev/habitify-api-client'
import dotenv from 'dotenv'

dotenv.config()

const server = new McpServer({
  name: 'Habitify MCP Server',
  version: '1.0.0',
  capabilities: {
    tools: {},
  },
})

const envSchema = z.object({
  HABITIFY_API_KEY: z.string().min(1),
})

const env = envSchema.parse(process.env)

const habitifyApiClient = new HabitifyApiClient(env.HABITIFY_API_KEY)

server.tool(
  'get-journal',
  'Get journal',
  {
    target_date: z
      .string()
      .describe("The date to get the journal for. Format: yyyy-MM-dd'T'HH:mm:ss±hh:mm"),
  },
  async ({ target_date }) => {
    const result = await habitifyApiClient.getJournal({ target_date })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Habitify MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
