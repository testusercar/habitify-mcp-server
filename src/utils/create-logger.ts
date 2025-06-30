import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

export interface Logger {
  log: (...message: (string | object)[]) => void
  error: (...message: (string | object)[]) => void
  debug: (...message: (string | object)[]) => void
  info: (...message: (string | object)[]) => void
  warn: (...message: (string | object)[]) => void
}

/**
 * Create logger that sends messages to MCP client
 */
export function createLogger(mcpServer: McpServer): Logger {
  return {
    log: (...message: (string | object)[]) =>
      mcpServer.server.sendLoggingMessage({
        level: 'info',
        data: message.join(' '),
      }),
    error: (...message: (string | object)[]) =>
      mcpServer.server.sendLoggingMessage({
        level: 'error',
        data: message.join(' '),
      }),
    debug: (...message: (string | object)[]) =>
      mcpServer.server.sendLoggingMessage({
        level: 'debug',
        data: message.join(' '),
      }),
    info: (...message: (string | object)[]) =>
      mcpServer.server.sendLoggingMessage({
        level: 'info',
        data: message.join(' '),
      }),
    warn: (...message: (string | object)[]) =>
      mcpServer.server.sendLoggingMessage({
        level: 'warning',
        data: message.join(' '),
      }),
  }
}
