import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const updateHabitStatusTool = createTool({
  name: 'update-habit-status',
  description: `Update habit status for a specific date`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    status: z.enum(['completed', 'skipped', 'none']).describe('The new status'),
    target_date: z.string().describe('The target date'),
  }),
  handle: async ({ habit_id, status, target_date }) => {
    try {
      await habitifyClient.updateHabitStatus({ habit_id, status, target_date })
      return { content: [{ type: 'text', text: 'Status updated successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
