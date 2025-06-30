import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'

export const addTextNoteTool = createTool({
  name: 'add-text-note',
  description: `Add a text note to a habit`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    content: z.string().describe('The content of the note'),
    created_at: z.string().describe('When the note was created'),
  }),
  handle: async ({ habit_id, content, created_at }) => {
    try {
      await habitifyClient.addTextNote({ habit_id, content, created_at })
      return { content: [{ type: 'text', text: 'Text note added successfully' }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
