import { createTool } from '../types.js'
import { habitifyClient } from '../client.js'
import { z } from 'zod'
import { TimeOfDay } from '@sargonpiraev/habitify-api-client/build/types.js'

export const getJournalTool = createTool({
  name: 'get-journal',
  description: `
    Get list of habits for a specific date.
    If specific date is not provided then get the journal for the current date by just omitting target_date parameter.
  `,
  inputSchema: z.object({
    target_date: z.string().describe('The date to get the list of habits for'),
    order_by: z.enum(['priority', 'reminder_time', 'status']).describe('Order habits by specified field'),
    status: z.enum(['in_progress', 'completed', 'failed', 'skipped']).describe('Filter habits by status'),
    area_id: z.string().describe('Filter habits by area ID'),
    time_of_day: z.nativeEnum(TimeOfDay).describe('Filter habits by time of day'),
  }),
  handle: async ({ target_date, order_by, status, area_id, time_of_day }) => {
    try {
      const result = await habitifyClient.getJournal({
        target_date,
        order_by,
        status,
        area_id,
        time_of_day,
      })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Error ${error}` }],
      }
    }
  },
})
