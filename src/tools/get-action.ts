import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'

export const getActionTool = createTool({
  name: 'get-action',
  description: `Get a single action by id`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    action_id: z.string().describe('The ID of the action'),
  }),
  handle: async ({ habit_id, action_id }) => {
    try {
      const result = await habitifyClient.getAction({ habit_id, action_id })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
