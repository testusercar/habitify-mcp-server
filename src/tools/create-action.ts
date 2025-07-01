import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const createActionTool = createTool({
  name: 'create-action',
  description: 'Create a new action',
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    title: z.string().describe('The title of the action'),
    remind_at: z.string().describe('When to remind about this action'),
  }),
  handle: async ({ habit_id, title, remind_at }) => {
    try {
      await habitifyClient.createAction({ habit_id, title, remind_at })
      return { content: [{ type: 'text', text: 'Action created successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
