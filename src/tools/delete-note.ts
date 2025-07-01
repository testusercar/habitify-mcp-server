import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { handleError } from '../utils/handle-error.js'

export const deleteNoteTool = createTool({
  name: 'delete-note',
  description: `Delete a single note by id`,
  inputSchema: z.object({
    habit_id: z.string().describe('The ID of the habit'),
    note_id: z.string().describe('The ID of the note to delete'),
  }),
  handle: async ({ habit_id, note_id }) => {
    try {
      await habitifyClient.deleteNote({ habit_id, note_id })
      return { content: [{ type: 'text', text: 'Note deleted successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  },
})
