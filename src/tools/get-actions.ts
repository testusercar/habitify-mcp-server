import { z } from 'zod'
import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'

export const getActionsTool = createTool({
  name: 'get-actions',
  description: `Get all actions for a habit`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
  }),
  handle: async ({ habit_id }) => {
    try {
      const result = await habitifyClient.getActions({ habit_id })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
