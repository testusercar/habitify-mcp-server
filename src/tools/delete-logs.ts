import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'

export const deleteLogsTool = createTool({
  name: 'delete-logs',
  description: `Delete logs for a habit in a date range`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    from: z.string().describe('Start date (optional)'),
    to: z.string().describe('End date (optional)'),
  }),
  handle: async ({ habit_id, from, to }) => {
    try {
      await habitifyClient.deleteLogs({ habit_id, from, to })
      return { content: [{ type: 'text', text: 'Logs deleted successfully' }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
