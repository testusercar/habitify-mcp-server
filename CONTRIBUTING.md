# Contributing to Habitify MCP Server

Thank you for your interest in contributing to the Habitify MCP Server! This guide will help you get started with development.

## 🔧 Development Setup

### Prerequisites

- Node.js >= v18.0.0
- npm or yarn package manager
- Git

### Local Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sargonpiraev/habitify-mcp-server
   cd habitify-mcp-server
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment**:

   ```bash
   cp .env.example .env
   # Edit .env with your Habitify API key
   ```

4. **Build the project**:
   ```bash
   npm run build
   ```

### Development Commands

```bash
# Run in development mode with auto-reload
npm run dev

# Build the project
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Debug with MCP Inspector
npm run inspect

# Type checking
npm run typecheck
```

## 🧪 Testing

### Test with MCP Inspector

```bash
# Build and test the server
npm run build
npm run inspect
```

### Test with Claude Desktop

1. Add server to your Claude Desktop config:

   ```json
   {
     "mcpServers": {
       "habitify-mcp-server-dev": {
         "command": "node",
         "args": ["./build/main.js"],
         "cwd": "/path/to/habitify-mcp-server",
         "env": {
           "HABITIFY_API_KEY": "your-api-key"
         }
       }
     }
   }
   ```

2. Restart Claude Desktop and test tools

## 📁 Project Structure

```
habitify-mcp-server/
├── src/
│   ├── env.ts                # Environment variables parsing
│   ├── client.ts             # Habitify API client initialization
│   ├── server.ts             # MCP server configuration
│   ├── main.ts               # Entry point
│   ├── types.ts              # TypeScript type definitions
│   ├── tools/                # Individual tool implementations
│   │   ├── tool1.ts
│   │   ├── tool2.ts
│   │   └── index.ts          # Tool re-exports
│   └── utils/                # Shared utilities
│       ├── is-tool-enabled.ts
│       ├── create-logger.ts
│       └── index.ts
├── build/                    # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🔨 Adding New Tools

1. **Create tool file** in `src/tools/`:

   ```typescript
   import { createTool } from '../types.js'
   import { habitifyClient } from '../client.js'
   import { z } from 'zod'

   export const myNewTool = createTool({
     name: 'my-new-tool',
     description: 'Description of what this tool does',
     inputSchema: z.object({
       param1: z.string().describe('Required parameter'),
       param2: z.number().optional().describe('Optional parameter'),
     }),
     handle: async ({ param1, param2 }) => {
       try {
         const result = await habitifyClient.doSomething(param1, param2)
         return { content: [{ type: 'text', text: JSON.stringify(result) }] }
       } catch (error) {
         return {
           isError: true,
           content: [{ type: 'text', text: `Error: ${error}` }],
         }
       }
     },
   })
   ```

2. **Export in `src/tools/index.ts`**:

   ```typescript
   export { myNewTool } from './my-new-tool.js'
   ```

3. **Test the new tool**:
   ```bash
   npm run build
   npm run inspect
   ```

## 📝 Code Style

- Use TypeScript for all new code
- Follow existing naming conventions (kebab-case for tool names)
- Add JSDoc comments for complex functions
- Use Zod for input validation
- Handle errors gracefully with proper error messages

## 🐛 Reporting Issues

1. Check existing issues first
2. Provide clear reproduction steps
3. Include environment details (Node.js version, OS, etc.)
4. Add relevant logs and error messages

## 📋 Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and add tests
4. Run linting and tests: `npm run lint && npm run test`
5. Commit with conventional commit format: `feat: add new tool`
6. Push and create a Pull Request

## 📖 Commit Convention

We use [Conventional Commits](https://conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📧 Questions?

If you have questions about contributing:

- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)
- 🌐 Website: [sargonpiraev.com](https://sargonpiraev.com)

Thank you for contributing! 🙏
