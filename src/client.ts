import { HabitifyApiClient } from '@sargonpiraev/habitify-api-client'
import { env } from './env.js'

// Create Habitify API client
export const habitifyClient = new HabitifyApiClient(env.HABITIFY_API_KEY)
