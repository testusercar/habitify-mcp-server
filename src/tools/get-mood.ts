import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const getMoodTool = createTool({
  name: 'get-mood',
  description: `Get mood by id`,
  inputSchema: z.object({
    mood_id: z.string().describe('The ID of the mood'),
  }),
  handle: async ({ mood_id }) => {
    try {
      const result = await habitifyClient.getMood({ mood_id })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
