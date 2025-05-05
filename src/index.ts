#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { HabitifyApiClient } from '@sargonpiraev/habitify-api-client'
import { TimeOfDay } from '@sargonpiraev/habitify-api-client/build/types.js'
import dotenv from 'dotenv'

dotenv.config()

const mcpServer = new McpServer(
  {
    name: 'Habitify MCP Server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      logging: {},
    },
    instructions:
      'This is a MCP server for the Habitify API. It is used to get and set data in the Habitify API.',
  }
)

const envSchema = z.object({
  HABITIFY_API_KEY: z.string().min(1),
})

const env = envSchema.parse(process.env)

const {
  server: { sendLoggingMessage },
} = mcpServer

const logger = {
  log: (...message: (string | object)[]) =>
    sendLoggingMessage({ level: 'info', data: message.join(' ') }),
  error: (...message: (string | object)[]) =>
    sendLoggingMessage({ level: 'error', data: message.join(' ') }),
  debug: (...message: (string | object)[]) =>
    sendLoggingMessage({ level: 'debug', data: message.join(' ') }),
}

const habitifyApiClient = new HabitifyApiClient(env.HABITIFY_API_KEY, logger)

// Get journal
mcpServer.tool(
  'get-journal',
  'Get journal',
  {
    target_date: z
      .string()
      .describe("The date to get the journal for. Format: yyyy-MM-dd'T'HH:mm:ss±hh:mm")
      .optional(),
    order_by: z.enum(['priority', 'reminder_time', 'status']).optional(),
    status: z.enum(['in_progress', 'completed', 'failed', 'skipped']).optional(),
    area_id: z.string().optional(),
    time_of_day: z.union([z.nativeEnum(TimeOfDay), z.array(z.nativeEnum(TimeOfDay))]).optional(),
  },
  async ({ target_date, order_by, status, area_id, time_of_day }) => {
    const result = await habitifyApiClient.getJournal({
      target_date,
      order_by,
      status,
      area_id,
      time_of_day,
    })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Get habit status
mcpServer.tool(
  'get-habit-status',
  'Get habit status for a specific date',
  {
    habit_id: z.string(),
    target_date: z.string().optional(),
  },
  async ({ habit_id, target_date }) => {
    const result = await habitifyApiClient.getHabitStatus({
      habitId: habit_id,
      target_date: target_date,
    })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Update habit status
mcpServer.tool(
  'update-habit-status',
  'Update habit status for a specific date',
  {
    habit_id: z.string(),
    status: z.enum(['completed', 'skipped', 'none']),
    target_date: z.string(),
  },
  async ({ habit_id, status, target_date }) => {
    try {
      await habitifyApiClient.updateHabitStatus({ habitId: habit_id, status, target_date })
      return { content: [{ type: 'text', text: 'Status updated successfully' }] }
    } catch (error) {
      console.error(error)
      return { is_error: true, content: [{ type: 'text', text: `Error ${error}` }] }
    }
  }
)

// Get logs
mcpServer.tool(
  'get-logs',
  'Get logs for a habit',
  {
    habit_id: z.string(),
    from: z.string().optional(),
    to: z.string().optional(),
  },
  async ({ habit_id, from, to }) => {
    const result = await habitifyApiClient.getLogs({ habitId: habit_id, from, to })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Add log
mcpServer.tool(
  'add-log',
  'Add a log for a habit',
  {
    habit_id: z.string(),
    unit_type: z.string(),
    value: z.number(),
    target_date: z.string(),
  },
  async ({ habit_id, unit_type, value, target_date }) => {
    await habitifyApiClient.addLog({ habitId: habit_id, unit_type, value, target_date })
    return { content: [{ type: 'text', text: 'Log added successfully' }] }
  }
)

// Delete log
mcpServer.tool(
  'delete-log',
  'Delete a single log by id',
  {
    habit_id: z.string(),
    log_id: z.string(),
  },
  async ({ habit_id, log_id }) => {
    await habitifyApiClient.deleteLog({ habitId: habit_id, logId: log_id })
    return { content: [{ type: 'text', text: 'Log deleted successfully' }] }
  }
)

// Delete logs
mcpServer.tool(
  'delete-logs',
  'Delete logs for a habit in a date range',
  {
    habit_id: z.string(),
    from: z.string().optional(),
    to: z.string().optional(),
  },
  async ({ habit_id, from, to }) => {
    await habitifyApiClient.deleteLogs({ habitId: habit_id, from, to })
    return { content: [{ type: 'text', text: 'Logs deleted successfully' }] }
  }
)

// Get moods
mcpServer.tool(
  'get-moods',
  'Get moods (optionally by date)',
  {
    target_date: z.string().optional(),
  },
  async ({ target_date }) => {
    const result = await habitifyApiClient.getMoods({ target_date })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Get mood
mcpServer.tool(
  'get-mood',
  'Get mood by id',
  {
    mood_id: z.string(),
  },
  async ({ mood_id }) => {
    const result = await habitifyApiClient.getMood({ moodId: mood_id })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Create mood
mcpServer.tool(
  'create-mood',
  'Create a new mood',
  {
    value: z.number().min(1).max(5),
    created_at: z.string(),
  },
  async ({ value, created_at }) => {
    await habitifyApiClient.createMood({ value, created_at })
    return { content: [{ type: 'text', text: 'Mood created successfully' }] }
  }
)

// Update mood
mcpServer.tool(
  'update-mood',
  'Update mood by id',
  {
    mood_id: z.string(),
    value: z.number().min(1).max(5),
    created_at: z.string(),
  },
  async ({ mood_id, value, created_at }) => {
    await habitifyApiClient.updateMood({ moodId: mood_id, value, created_at })
    return { content: [{ type: 'text', text: 'Mood updated successfully' }] }
  }
)

// Delete mood
mcpServer.tool(
  'delete-mood',
  'Delete mood by id',
  {
    mood_id: z.string(),
  },
  async ({ mood_id }) => {
    await habitifyApiClient.deleteMood({ moodId: mood_id })
    return { content: [{ type: 'text', text: 'Mood deleted successfully' }] }
  }
)

// Get areas
mcpServer.tool('get-areas', 'Get all areas', {}, async () => {
  const result = await habitifyApiClient.getAreas()
  return { content: [{ type: 'text', text: JSON.stringify(result) }] }
})

// Get notes
mcpServer.tool(
  'get-notes',
  'Get all notes for a habit',
  {
    habit_id: z.string(),
    from: z.string().optional(),
    to: z.string().optional(),
  },
  async ({ habit_id, from, to }) => {
    const result = await habitifyApiClient.getNotes({ habitId: habit_id, from, to })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Add text note
mcpServer.tool(
  'add-text-note',
  'Add a text note to a habit',
  {
    habit_id: z.string(),
    content: z.string(),
    created: z.string(),
  },
  async ({ habit_id, content, created }) => {
    await habitifyApiClient.addTextNote({ habitId: habit_id, content, created })
    return { content: [{ type: 'text', text: 'Text note added successfully' }] }
  }
)

// Delete note
mcpServer.tool(
  'delete-note',
  'Delete a single note by id',
  {
    habit_id: z.string(),
    note_id: z.string(),
  },
  async ({ habit_id, note_id }) => {
    await habitifyApiClient.deleteNote({ habitId: habit_id, noteId: note_id })
    return { content: [{ type: 'text', text: 'Note deleted successfully' }] }
  }
)

// Delete notes
mcpServer.tool(
  'delete-notes',
  'Delete notes for a habit in a date range',
  {
    habit_id: z.string(),
    from: z.string().optional(),
    to: z.string().optional(),
  },
  async ({ habit_id, from, to }) => {
    await habitifyApiClient.deleteNotes({ habitId: habit_id, from, to })
    return { content: [{ type: 'text', text: 'Notes deleted successfully' }] }
  }
)

// Get actions
mcpServer.tool(
  'get-actions',
  'Get all actions for a habit',
  {
    habit_id: z.string(),
  },
  async ({ habit_id }) => {
    const result = await habitifyApiClient.getActions({ habitId: habit_id })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Get action
mcpServer.tool(
  'get-action',
  'Get a single action by id',
  {
    habit_id: z.string(),
    action_id: z.string(),
  },
  async ({ habit_id, action_id }) => {
    const result = await habitifyApiClient.getAction({ habitId: habit_id, actionId: action_id })
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  }
)

// Create action
mcpServer.tool(
  'create-action',
  'Create a new action for a habit',
  {
    habit_id: z.string(),
    title: z.string(),
    remind_at: z.string(),
  },
  async ({ habit_id, title, remind_at }) => {
    await habitifyApiClient.createAction({ habitId: habit_id, title, remind_at })
    return { content: [{ type: 'text', text: 'Action created successfully' }] }
  }
)

// Update action
mcpServer.tool(
  'update-action',
  'Update an action by id',
  {
    habit_id: z.string(),
    action_id: z.string(),
    status: z.number().optional(),
    title: z.string().optional(),
    remind_at: z.string().optional(),
  },
  async ({ habit_id, action_id, status, title, remind_at }) => {
    await habitifyApiClient.updateAction({
      habitId: habit_id,
      actionId: action_id,
      status,
      title,
      remind_at,
    })
    return { content: [{ type: 'text', text: 'Action updated successfully' }] }
  }
)

// Delete action
mcpServer.tool(
  'delete-action',
  'Delete an action by id',
  {
    habit_id: z.string(),
    action_id: z.string(),
  },
  async ({ habit_id, action_id }) => {
    await habitifyApiClient.deleteAction({ habitId: habit_id, actionId: action_id })
    return { content: [{ type: 'text', text: 'Action deleted successfully' }] }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.connect(transport)
  console.error('Habitify MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
