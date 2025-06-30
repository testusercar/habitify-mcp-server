# Habitify MCP Server 🔧

![npm version](https://img.shields.io/npm/v/@sargonpiraev/habitify-mcp-server)
![npm downloads](https://img.shields.io/npm/dw/@sargonpiraev/habitify-mcp-server)
![license](https://img.shields.io/github/license/sargonpiraev/habitify-mcp-server)
![smithery badge](https://smithery.ai/badge/@sargonpiraev/habitify-mcp-server)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF)](vscode:mcp/install?%7B%22name%22%3A%22habitify-mcp-server%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@sargonpiraev/habitify-mcp-server%22%5D%7D)
[![Install in Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?config)

MCP server for seamless Habitify API integration with AI assistants. Track habits, manage mood logs, create notes, and automate habit tracking workflows directly from Claude, Cursor, and other MCP-compatible AI tools.

## 🚀 Features

- 🔌 **Seamless AI Integration**: Direct Habitify API access from Claude, Cursor, and VS Code
- 🤖 **Automated Workflows**: Automate habit tracking, mood logging, and note creation
- 📊 **Complete API Coverage**: 23+ tools covering habits, moods, logs, notes, and actions
- 🎯 **Selective Tool Loading**: Enable specific tools with glob patterns
- ⚡ **Real-time Tracking**: Log habits, moods, and create notes instantly from AI assistants
- 🔧 **Professional Integration**: Error handling, validation, and comprehensive logging
- 📝 **Rich Documentation**: Detailed tool descriptions and troubleshooting guides

Add `use habitify` to your prompt in Cursor or Claude.

## 🔑 Getting Your Habitify API Key

Before installation, you'll need a Habitify API key:

1. Open [Habitify app](https://habitify.me) or web interface
2. Go to **Settings → Account → API Access**
3. Generate new API key or copy existing one
4. Save this key for the installation steps below

## 🛠️ Installation

### Requirements

- Node.js >= v18.0.0
- Habitify API key (get from [Habitify Settings](https://habitify.me))
- Cursor, VS Code, Claude Desktop or another MCP Client

<details>
<summary><b>Installing via Smithery</b></summary>

To install Habitify MCP Server for any client automatically via [Smithery](https://smithery.ai):

```bash
npx -y @smithery/cli@latest install @sargonpiraev/habitify-mcp-server --client <CLIENT_NAME>
```

</details>

<details>
<summary><b>Install in Cursor</b></summary>

#### Cursor One-Click Installation

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=habitify-mcp-server&config=eyJjb21tYW5kIjoibnB4IC15IEBzYXJnb25waXJhZXYvaGFiaXRpZnktbWNwLXNlcnZlciJ9)

#### Manual Configuration

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

</details>

<details>
<summary><b>Install in VS Code</b></summary>

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF)](vscode:mcp/install?%7B%22name%22%3A%22habitify-mcp-server%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@sargonpiraev/habitify-mcp-server%22%5D%7D)

Or add manually to your VS Code settings:

```json
"mcp": {
  "servers": {
    "habitify-mcp-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@sargonpiraev/habitify-mcp-server"],
      "env": {
        "HABITIFY_API_KEY": "your-habitify-api-key"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Claude Desktop</b></summary>

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

</details>

<details>
<summary><b>Install in Zed</b></summary>

Add to your Zed `settings.json`:

```json
{
  "context_servers": {
    "habitify-mcp-server": {
      "command": {
        "path": "npx",
        "args": ["-y", "@sargonpiraev/habitify-mcp-server"]
      },
      "settings": {
        "HABITIFY_API_KEY": "your-habitify-api-key"
      }
    }
  }
}
```

</details>

<details>
<summary><b>Install in Windsurf</b></summary>

Add to your Windsurf MCP config:

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

</details>

<details>
<summary><b>Install in Cline</b></summary>

Install through the Cline MCP Server Marketplace:

1. Open Cline
2. Click the hamburger menu (☰) → MCP Servers
3. Search for "habitify-mcp-server" in the Marketplace
4. Click Install

</details>

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup, guidelines, and how to contribute to this project.

### Development Tools

```bash
# Debug with MCP Inspector
npm run inspect
```

## Available Tools

### Tool Selection

You can enable specific tools using glob patterns via environment variables:

```bash
# Enable only 'get' tools
TOOL_GLOB_PATTERNS="get-*" npx @sargonpiraev/habitify-mcp-server

# Enable all except delete operations
TOOL_GLOB_PATTERNS="*,!delete-*" npx @sargonpiraev/habitify-mcp-server

# Enable specific tools
TOOL_GLOB_PATTERNS="get-journal,add-log,create-mood" npx @sargonpiraev/habitify-mcp-server
```

### Tools List

#### Journal Tools

- **`get-journal`**: Get list of habits for a specific date with filtering options

#### Log Tools

- **`add-log`**: Add quantifiable habit log (numbers, measurements)
- **`get-logs`**: Retrieve habit logs with filtering
- **`delete-log`**: Delete a specific habit log entry
- **`delete-logs`**: Delete multiple habit log entries

#### Mood Tools

- **`create-mood`**: Create new mood entry (1-5 scale)
- **`get-mood`**: Get specific mood entry by ID
- **`get-moods`**: Get multiple mood entries with filtering
- **`update-mood`**: Update existing mood entry
- **`delete-mood`**: Delete mood entry

#### Action Tools

- **`create-action`**: Create habit-related action items and reminders
- **`get-action`**: Get specific action by ID
- **`get-actions`**: Get multiple actions with filtering
- **`update-action`**: Update existing action
- **`delete-action`**: Delete action item

#### Note Tools

- **`add-text-note`**: Add text notes to habits
- **`get-notes`**: Retrieve notes with filtering
- **`delete-note`**: Delete specific note
- **`delete-notes`**: Delete multiple notes

#### Habit Tools

- **`get-habit-status`**: Get habit completion status
- **`update-habit-status`**: Update habit status (completed, skipped, none)

#### Area Tools

- **`get-areas`**: Get all habit categories/areas

**Total: 23 tools available** 🎯

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Required: Your Habitify API key (get from Habitify Settings)
HABITIFY_API_KEY=your_habitify_api_key_here

# Optional: Tool filtering using glob patterns
# Examples:
# - 'get-*' - enable all 'get' tools
# - 'get-*,!get-habit-*' - enable all 'get' tools except habit ones
# - 'create-*,update-*' - enable only create and update tools
# - '!delete-*' - enable all tools except delete operations
# Leave empty or unset to enable all tools
TOOL_GLOB_PATTERNS=

# Optional: Logging level (debug, info, notice, warning, error)
LOG_LEVEL=info
```

### Claude Desktop Setup

1. Open Claude Desktop configuration file
2. Add server configuration (see installation section above)
3. Restart Claude Desktop
4. Verify connection with 🔗 icon in Claude interface

## ❗ Troubleshooting

### Quick Fixes

1. **Connection Issues**: Restart Claude Desktop and look for 🔗 MCP connection icon
2. **Invalid API Key**: Verify your `HABITIFY_API_KEY` in environment configuration
3. **Tool Issues**: Test with MCP Inspector: `npx @modelcontextprotocol/inspector npx -y @sargonpiraev/habitify-mcp-server`

### Common Issues

**📦 Package Not Found**

```bash
npm cache clean --force
npx -y @sargonpiraev/habitify-mcp-server
```

**🔧 Configuration Problems**

- Check JSON syntax in your MCP config file
- Verify environment variables are set correctly
- Ensure Habitify API key is valid

**🔗 Connection Problems**

- Close and restart your MCP client completely
- Check MCP logs for error messages
- Test API key: Visit [Habitify Settings](https://habitify.me) and verify key

### Get Help

- 🐛 [Report Issues](https://github.com/sargonpiraev/habitify-mcp-server/issues)
- 📧 [Email Support](mailto:sargonpiraev@gmail.com)

## 🤝 Connect with Author

Stay updated and get support:

- 🌐 Visit [sargonpiraev.com](https://sargonpiraev.com)
- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
