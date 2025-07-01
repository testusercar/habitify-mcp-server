import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const getHabitStatusTool = createTool({
  name: 'get-habit-status',
  description: `Get habit status by id and date`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    target_date: z.string().describe('The target date'),
  }),
  handle: async ({ habit_id, target_date }) => {
    try {
      const result = await habitifyClient.getHabitStatus({ habit_id, target_date })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
