# Habitify MCP Server 🔧

![npm version](https://img.shields.io/npm/v/@sargonpiraev/habitify-mcp-server)
![npm downloads](https://img.shields.io/npm/dw/@sargonpiraev/habitify-mcp-server)
![license](https://img.shields.io/github/license/sargonpiraev/habitify-mcp-server)
![smithery badge](https://smithery.ai/badge/@sargonpiraev/habitify-mcp-server)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)
[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF)](vscode:mcp/install?%7B%22name%22%3A%22habitify-mcp-server%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@sargonpiraev/habitify-mcp-server%22%5D%7D)
[![Install in Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=habitify-mcp-server&config=eyJjb21tYW5kIjoibnB4IC15IEBzYXJnb25waXJhZXYvaGFiaXRpZnktbWNwLXNlcnZlciJ9)
[![Join Discord](https://img.shields.io/discord/1331631275464671347?color=7289da&label=Discord&logo=discord)](https://discord.gg/ZsWGxRGj)

MCP server for seamless Habitify API integration with AI assistants. Track habits, manage mood logs, create notes, and automate habit tracking workflows directly from Claude, Cursor, and other MCP-compatible AI tools.

## Features

- 🔌 **Seamless AI Integration**: Direct Habitify API access from Claude, Cursor, and VS Code
- 🤖 **Automated Workflows**: Automate habit tracking, mood logging, and note creation
- 📊 **Complete API Coverage**: 23+ tools covering habits, moods, logs, notes, and actions
- 🎯 **Selective Tool Loading**: Enable specific tools with glob patterns
- ⚡ **Real-time Tracking**: Log habits, moods, and create notes instantly from AI assistants
- 🔧 **Professional Integration**: Error handling, validation, and comprehensive logging

Add `use habitify` to your prompt in Cursor or Claude.

## Get Your Credentials

Before installation, you'll need a Habitify API key:

1. Open [Habitify app](https://habitify.me) or web interface
2. Go to **Settings → Account → API Access**
3. Generate new API key or copy existing one
4. Save this key for the installation steps below

## Requirements

- Node.js >= v18.0.0
- Habitify API key (get from [Habitify Settings](https://habitify.me))
- Cursor, VS Code, Claude Desktop or another MCP Client

## Installation

**Installing via Smithery**

```bash
npx -y @smithery/cli@latest install @sargonpiraev/habitify-mcp-server --client <CLIENT_NAME>
```

**Install in Cursor**

Add to your Cursor `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "habitify-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/habitify-mcp-server"],
      "env": {
        "HABITIFY_API_KEY": "your-habitify-api-key"
      }
    }
  }
}
```

**Install in Claude Desktop**

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "habitify-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/habitify-mcp-server"],
      "env": {
        "HABITIFY_API_KEY": "your-habitify-api-key"
      }
    }
  }
}
```

## Available Tools

**Tool Selection**

Enable specific tools using glob patterns:

```bash
# Enable only 'get' tools
TOOL_GLOB_PATTERNS="get-*" npx @sargonpiraev/habitify-mcp-server

# Enable all except delete operations
TOOL_GLOB_PATTERNS="*,!delete-*" npx @sargonpiraev/habitify-mcp-server

# Enable specific tools
TOOL_GLOB_PATTERNS="get-journal,add-log,create-mood" npx @sargonpiraev/habitify-mcp-server
```

**Tools List**

- **`get-journal`**: Get list of habits for a specific date with filtering options
- **`add-log`**: Add quantifiable habit log (numbers, measurements)
- **`get-logs`**: Retrieve habit logs with filtering
- **`delete-log`**: Delete a specific habit log entry
- **`delete-logs`**: Delete multiple habit log entries
- **`create-mood`**: Create new mood entry (1-5 scale)
- **`get-mood`**: Get specific mood entry by ID
- **`get-moods`**: Get multiple mood entries with filtering
- **`update-mood`**: Update existing mood entry
- **`delete-mood`**: Delete mood entry
- **`create-action`**: Create habit-related action items and reminders
- **`get-action`**: Get specific action by ID
- **`get-actions`**: Get multiple actions with filtering
- **`update-action`**: Update existing action
- **`delete-action`**: Delete action item
- **`add-text-note`**: Add text notes to habits
- **`get-notes`**: Retrieve notes with filtering
- **`delete-note`**: Delete specific note
- **`delete-notes`**: Delete multiple notes
- **`get-habit-status`**: Get habit completion status
- **`update-habit-status`**: Update habit status (completed, skipped, none)
- **`get-areas`**: Get all habit categories/areas

**Total: 23 tools available** 🎯

## Support This Project

**About the Author**  
Hi! I'm Sargon, a software engineer passionate about AI tools and automation. I create open-source MCP servers to help developers integrate AI assistants with their favorite services.

Your support helps me continue developing and maintaining these tools, and motivates me to create new integrations that make AI assistants even more powerful! ☕

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/sargonpiraev)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-F16061?logo=ko-fi&logoColor=white)](https://ko-fi.com/sargonpiraev)
[![Patreon](https://img.shields.io/badge/Patreon-F96854?logo=patreon&logoColor=white)](https://patreon.com/sargonpiraev)

**Connect with me:**

- 🌐 Visit [sargonpiraev.com](https://sargonpiraev.com)
- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)
- 💬 Join our [Discord Community](https://discord.gg/ZsWGxRGj)
