import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'

export const deleteMoodTool = createTool({
  name: 'delete-mood',
  description: `Delete mood by id`,
  inputSchema: z.object({
    mood_id: z.string().describe('The ID of the mood'),
  }),
  handle: async ({ mood_id }) => {
    try {
      await habitifyClient.deleteMood({ mood_id })
      return { content: [{ type: 'text', text: 'Mood deleted successfully' }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
