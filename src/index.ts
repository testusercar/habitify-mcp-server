#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { HabitifyApiClient } from '@sargonpiraev/habitify-api-client'
import { TimeOfDay } from '@sargonpiraev/habitify-api-client/build/types.js'
import dotenv from 'dotenv'
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js'

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
    instructions: `
      This is a MCP server for the Habitify API. 
      It is used to get and set data in the Habitify API.
    `,
  }
)

const envSchema = z.object({
  HABITIFY_API_KEY: z.string().min(1),
})

const env = envSchema.parse(process.env)

const logger = {
  log: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'info', data: message.join(' ') }),
  error: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'error', data: message.join(' ') }),
  debug: (...message: (string | object)[]) =>
    mcpServer.server.sendLoggingMessage({ level: 'debug', data: message.join(' ') }),
}

const habitifyApiClient = new HabitifyApiClient(env.HABITIFY_API_KEY, logger)

function handleError(error: unknown) {
  console.error(error)
  return { isError: true, content: [{ type: 'text', text: `Error ${error}` }] } as CallToolResult
}

// Get journal
mcpServer.tool(
  'get-journal',
  `
    Get list of habits for a specific date.
    If specific date is not provided then get the journal for the current date by just omitting target_date parameter.
  `,
  {
    target_date: z.string().optional().describe(`
      The date to get the list of habits for.
      Format: yyyy-MM-dd'T'HH:mm:ss±hh:mm.
      Optional because by default it will get the list of habits for the current date.
      If specific date is not provided then get the journal for the current date by just omitting target_date parameter.
    `),
    order_by: z.enum(['priority', 'reminder_time', 'status']).optional(),
    status: z.enum(['in_progress', 'completed', 'failed', 'skipped']).optional(),
    area_id: z.string().optional(),
    time_of_day: z.union([z.nativeEnum(TimeOfDay), z.array(z.nativeEnum(TimeOfDay))]).optional(),
  },
  async ({ target_date, order_by, status, area_id, time_of_day }) => {
    console.error(777, 'target_date', target_date)
    console.log(777, 'target_date', target_date)
    try {
      const result = await habitifyApiClient.getJournal({
        target_date,
        order_by,
        status,
        area_id,
        time_of_day,
      })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      const result = await habitifyApiClient.getHabitStatus({ habit_id, target_date })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
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
      await habitifyApiClient.updateHabitStatus({ habit_id, status, target_date })
      return { content: [{ type: 'text', text: 'Status updated successfully' }] }
    } catch (error) {
      return handleError(error)
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
    try {
      const result = await habitifyApiClient.getLogs({ habit_id, from, to })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
  }
)

// Add log
mcpServer.tool(
  'add-log',
  `
    Add a log for a habit.
    If habit ID is not provided then get Journal tool should be called first.
    Then try to find requested habit in the list of habits.
  `,
  {
    habit_id: z.string(),
    unit_type: z.string(),
    value: z.number(),
    target_date: z.string(),
  },
  async ({ habit_id, unit_type, value, target_date }) => {
    try {
      await habitifyApiClient.addLog({ habit_id, unit_type, value, target_date })
      return { content: [{ type: 'text', text: 'Log added successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.deleteLog({ habit_id, log_id })
      return { content: [{ type: 'text', text: 'Log deleted successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.deleteLogs({ habit_id, from, to })
      return { content: [{ type: 'text', text: 'Logs deleted successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      const result = await habitifyApiClient.getMoods({ target_date })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      const result = await habitifyApiClient.getMood({ mood_id })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.createMood({ value, created_at })
      return { content: [{ type: 'text', text: 'Mood created successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.updateMood({ mood_id, value, created_at })
      return { content: [{ type: 'text', text: 'Mood updated successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.deleteMood({ mood_id })
      return { content: [{ type: 'text', text: 'Mood deleted successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  }
)

// Get areas
mcpServer.tool('get-areas', 'Get all areas', {}, async () => {
  try {
    const result = await habitifyApiClient.getAreas()
    return { content: [{ type: 'text', text: JSON.stringify(result) }] }
  } catch (error) {
    return handleError(error)
  }
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
    try {
      const result = await habitifyApiClient.getNotes({ habit_id, from, to })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
  }
)

// Add text note
mcpServer.tool(
  'add-text-note',
  'Add a text note to a habit',
  {
    habit_id: z.string(),
    content: z.string(),
    created_at: z.string(),
  },
  async ({ habit_id, content, created_at }) => {
    try {
      await habitifyApiClient.addTextNote({ habit_id, content, created_at })
      return { content: [{ type: 'text', text: 'Text note added successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.deleteNote({ habit_id, note_id })
      return { content: [{ type: 'text', text: 'Note deleted successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.deleteNotes({ habit_id, from, to })
      return { content: [{ type: 'text', text: 'Notes deleted successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      const result = await habitifyApiClient.getActions({ habit_id })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      const result = await habitifyApiClient.getAction({ habit_id, action_id })
      return { content: [{ type: 'text', text: JSON.stringify(result) }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.createAction({ habit_id, title, remind_at })
      return { content: [{ type: 'text', text: 'Action created successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.updateAction({
        habit_id,
        action_id,
        status,
        title,
        remind_at,
      })
      return { content: [{ type: 'text', text: 'Action updated successfully' }] }
    } catch (error) {
      return handleError(error)
    }
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
    try {
      await habitifyApiClient.deleteAction({ habit_id, action_id })
      return { content: [{ type: 'text', text: 'Action deleted successfully' }] }
    } catch (error) {
      return handleError(error)
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await mcpServer.connect(transport)
  mcpServer.server.sendLoggingMessage({ level: 'info', data: 'Habitify MCP Server running on stdio' })
}

main().catch((error) => {
  console.error('Fatal error in main():', error)
  process.exit(1)
})
