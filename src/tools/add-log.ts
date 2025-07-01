import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const addLogTool = createTool({
  name: 'add-log',
  description: `
    Add a log for a habit.
    If habit ID is not provided then get Journal tool should be called first.
    Then try to find requested habit in the list of habits.
  `,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    unit_type: z.string().describe('The unit type for the log'),
    value: z.number().describe('The value to log'),
    target_date: z.string().describe('The target date'),
  }),
  handle: async ({ habit_id, unit_type, value, target_date }) => {
    try {
      await habitifyClient.addLog({ habit_id, unit_type, value, target_date })
      return { content: [{ type: 'text', text: 'Log added successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
