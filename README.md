# Habitify MCP Server

MCP server for Habitify API integration - track habits, manage mood logs, and automate habit tracking workflows directly from AI assistants like Claude and Cursor

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Set up environment:

```bash
cp .env.example .env
# Edit .env with your API credentials
```

3. Start the server:

```bash
npm start
```

## Configuration

Add to your MCP client config:

```json
{
  "mcpServers": {
    "habitify-mcp-server": {
      "command": "node",
      "args": ["/dist/index.js"],
      "env": {
        "HABITIFY_API_KEY": "your_habitify_api_key"
      }
    }
  }
}
```

## Available Tools

- **get-journal**: Get habit journal for a specific date
- **post-logs-by-id**: Add a habit log
- **delete-logs-by-id**: Delete habit logs in date range
- **delete-logs-by-id-by-id**: Delete a specific habit log
- **get-habits**: Get all habits
- **get-habits-by-id**: Get habit details
- **get-areas**: Get all areas
- **get-moods**: Get mood entries
- **post-moods**: Add mood entry
- **get-notes**: Get notes
- **post-notes**: Add note
- **get-actions**: Get available actions

## Development

```bash
npm run build    # Build TypeScript
npm run test     # Run tests
npm run lint     # Check code style
```

## License

MIT
