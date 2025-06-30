import dotenv from 'dotenv'
import { z } from 'zod'

// Load environment variables
dotenv.config()

// Environment configuration schema
export const envSchema = z.object({
  HABITIFY_API_KEY: z.string().min(1),
  TOOL_GLOB_PATTERNS: z.string().optional(),
  LOG_LEVEL: z.enum(['debug', 'info', 'notice', 'warning', 'error']).default('info').optional(),
})

export type EnvConfig = z.infer<typeof envSchema>

// Parse and validate environment variables
export const env = envSchema.parse(process.env)
