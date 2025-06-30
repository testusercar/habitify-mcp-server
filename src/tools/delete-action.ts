import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'

export const deleteActionTool = createTool({
  name: 'delete-action',
  description: `Delete an action by id`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    action_id: z.string().describe('The ID of the action'),
  }),
  handle: async ({ habit_id, action_id }) => {
    try {
      await habitifyClient.deleteAction({ habit_id, action_id })
      return { content: [{ type: 'text', text: 'Action deleted successfully' }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
