import multimatch from 'multimatch'
import { env } from '../env.js'

// Parse tool glob patterns from environment variable
export const toolGlobPatterns = env.TOOL_GLOB_PATTERNS
  ? env.TOOL_GLOB_PATTERNS.split(',')
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
  : []

/**
 * Check if a tool should be enabled based on glob patterns
 * Supports glob patterns for tool names:
 * - 'get-moods' - enable specific tool
 * - '!get-moods' - disable specific tool
 * - 'get-*' - enable all tools starting with 'get-'
 * - '!create-*' - disable all tools starting with 'create-'
 * - 'get-*,!get-habit-*' - combinations
 */
export function isToolEnabled(toolName: string): boolean {
  if (!toolGlobPatterns || toolGlobPatterns.length === 0) {
    return true // Enable all by default
  }

  // Use multimatch to check if tool name matches any of the patterns
  const result = multimatch([toolName], toolGlobPatterns)
  return result.length > 0
}
