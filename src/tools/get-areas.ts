import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'

export const getAreasTool = createTool({
  name: 'get-areas',
  description: `Get areas`,
  inputSchema: z.object({}),
  handle: async () => {
    try {
      const result = await habitifyClient.getAreas()
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
