#!/usr/bin/env node

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { server, logger } from './server.js'

/**
 * Start the MCP server
 */
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)

  logger.info('✅ Habitify MCP Server started successfully')

  const { toolGlobPatterns } = await import('./utils/is-tool-enabled.js')
  const { env } = await import('./env.js')
  if (toolGlobPatterns.length > 0) {
    logger.info(`🎯 Tool glob patterns: ${env.TOOL_GLOB_PATTERNS}`)
  } else {
    logger.info('📚 All tools enabled (no patterns specified)')
  }
}

// Start the server
main().catch((error) => {
  logger.error('❌ Failed to start server:', error)
  process.exit(1)
})
