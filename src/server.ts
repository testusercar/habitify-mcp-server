import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { createLogger } from './utils/create-logger.js'
import { isToolEnabled } from './utils/is-tool-enabled.js'
import * as tools from './tools/index.js'
import { ToolWithHandle } from './types.js'

// Create and configure MCP server
export const server = new McpServer(
  {
    name: 'Habitify MCP Server',
    version: '2.0.0',
  },
  {
    capabilities: {
      tools: {},
      logging: {},
    },
    instructions: `
      This is a MCP server for the Habitify API. 
      It provides tools to get and set data in the Habitify API, including:
      - Habit management and tracking
      - Mood logging and analysis  
      - Note creation and retrieval
      - Action items and task management
      - Calendar and schedule integration
      
      Use these tools to help users track their habits, log moods, manage notes, 
      and maintain their wellness routines through the Habitify platform.
    `,
  }
)

// Create logger
export const logger = createLogger(server)

// Register tools based on environment configuration
Object.values(tools).forEach((tool: ToolWithHandle) => {
  if (isToolEnabled(tool.name)) {
    server.tool(tool.name, tool.description, tool.inputSchema.shape, tool.handle)
    logger.debug(`✅ Registered tool: ${tool.name}`)
  } else {
    logger.debug(`⏭️ Skipped tool: ${tool.name}`)
  }
})

// Default export for Smithery AI integration
export default function createServer() {
  return server
}
