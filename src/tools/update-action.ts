import { createTool } from '../types.js'
import { z } from 'zod'
import { habitifyClient } from '../client.js'
import { handleError } from '../utils/handle-error.js'

export const updateActionTool = createTool({
  name: 'update-action',
  description: `Update an action by id`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    action_id: z.string().describe('The ID of the action'),
    status: z.number().describe('The status (optional)').optional(),
    title: z.string().describe('The title (optional)').optional(),
    remind_at: z.string().describe('Reminder time (optional)').optional(),
  }),
  handle: async ({ habit_id, action_id, status, title, remind_at }) => {
    try {
      await habitifyClient.updateAction({
        habit_id,
        action_id,
        status,
        title,
        remind_at,
      })
      return { content: [{ type: 'text', text: 'Action updated successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
