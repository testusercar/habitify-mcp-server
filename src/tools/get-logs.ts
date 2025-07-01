import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const getLogsTool = createTool({
  name: 'get-logs',
  description: `Get logs for a habit`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    from: z.string().describe('Start date (optional)'),
    to: z.string().describe('End date (optional)'),
  }),
  handle: async ({ habit_id, from, to }) => {
    try {
      const result = await habitifyClient.getLogs({ habit_id, from, to })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
