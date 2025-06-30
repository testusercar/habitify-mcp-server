import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'

export const deleteLogTool = createTool({
  name: 'delete-log',
  description: `Delete a single log by id`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    log_id: z.string().describe('The ID of the log to delete'),
  }),
  handle: async ({ habit_id, log_id }) => {
    try {
      await habitifyClient.deleteLog({ habit_id, log_id })
      return { content: [{ type: 'text', text: 'Log deleted successfully' }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
