import { z } from 'zod'

// Re-export types from habitify-api-client
export * from '@sargonpiraev/habitify-api-client/build/types.js'

export type SuccessResult = {
  content: { type: 'text'; text: string }[]
}

export type FailureResult = {
  isError: true
  content: { type: 'text'; text: string }[]
}

export type Result = SuccessResult | FailureResult

export type ToolWithHandle = {
  name: string
  description: string
  inputSchema: z.ZodObject<z.ZodRawShape>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle: (params: any) => Promise<Result>
}

export function createTool<TSchema extends z.ZodObject<z.ZodRawShape>>(
  config: Omit<ToolWithHandle, 'inputSchema' | 'handle'> & {
    inputSchema: TSchema
    handle: (params: z.infer<TSchema>) => Promise<Result>
  }
): ToolWithHandle {
  return config as ToolWithHandle
}
