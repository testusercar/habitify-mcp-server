import { createTool } from '../types.js'
import { z } from 'zod'
import { habitifyClient } from '../client.js'
import { handleError } from '../utils/handle-error.js'

export const updateMoodTool = createTool({
  name: 'update-mood',
  description: `Update mood by id`,
  inputSchema: z.object({
    mood_id: z.string().describe('The ID of the mood'),
    value: z.number().describe('Mood value (1-5)').min(1).max(5),
    created_at: z.string().describe('When the mood was created'),
  }),
  handle: async ({ mood_id, value, created_at }) => {
    try {
      await habitifyClient.updateMood({ mood_id, value, created_at })
      return { content: [{ type: 'text', text: 'Mood updated successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
