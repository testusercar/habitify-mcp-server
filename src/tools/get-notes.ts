import { createTool } from '../types.js'
import { z } from 'zod'
import { habitifyClient } from '../client.js'
import { handleError } from '../utils/handle-error.js'

export const getNotesTool = createTool({
  name: 'get-notes',
  description: `Get all notes for a habit`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    from: z.string().describe('Start date (optional)'),
    to: z.string().describe('End date (optional)'),
  }),
  handle: async ({ habit_id, from, to }) => {
    try {
      const result = await habitifyClient.getNotes({ habit_id, from, to })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
