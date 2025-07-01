import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const createMoodTool = createTool({
  name: 'create-mood',
  description: 'Create a new mood',
  inputSchema: z.object({
    value: z.number().describe('Mood value (1-5)').min(1).max(5),
    created_at: z.string().describe('When the mood was created'),
  }),
  handle: async ({ value, created_at }) => {
    try {
      await habitifyClient.createMood({ value, created_at })
      return { content: [{ type: 'text', text: 'Mood created successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
