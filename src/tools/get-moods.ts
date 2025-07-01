import { createTool } from '../types.js'
import { z } from 'zod'
import { habitifyClient } from '../client.js'
import { handleError } from '../utils/handle-error.js'

export const getMoodsTool = createTool({
  name: 'get-moods',
  description: 'Get moods (optionally by date)',
  inputSchema: z.object({
    target_date: z.string().describe('The target date (optional)'),
  }),
  handle: async ({ target_date }) => {
    try {
      const result = await habitifyClient.getMoods({ target_date })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
