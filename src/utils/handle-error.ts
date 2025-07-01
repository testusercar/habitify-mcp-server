import { FailureResult } from '../types.js'

export function handleError(error: unknown): FailureResult {
  console.error(error)
  return {
    isError: true,
    content: [{ type: 'text', text: `Error ${error}` }],
  }
}
