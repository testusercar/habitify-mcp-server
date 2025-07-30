# Habitify API MCP Server 🔧

![npm version](https://img.shields.io/npm/v/@sargonpiraev/habitify-mcp-server)
![npm downloads](https://img.shields.io/npm/dw/@sargonpiraev/habitify-mcp-server)
![license](https://img.shields.io/github/license/sargonpiraev/habitify-mcp-server)
![pipeline status](https://gitlab.com/sargonpiraev/habitify-mcp-server/badges/main/pipeline.svg)
![smithery badge](https://smithery.ai/badge/@sargonpiraev/habitify-mcp-server)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)
[![Join Discord](https://img.shields.io/discord/1331631275464671347?color=7289da&label=Discord&logo=discord)](https://discord.gg/ZsWGxRGj)

## Features

- 🔌 **Seamless AI Integration**: Direct Habitify API API access from Claude, Cursor, and VS Code
- 🤖 **Automated Workflows**: Automate Habitify API operations and data access
- 📊 **Complete API Coverage**: 12+ tools covering all major Habitify API features
- ⚡ **Real-time Access**: Access Habitify API data instantly from AI assistants
- 🔧 **Professional Integration**: Error handling, validation, and comprehensive logging

## Get Your Credentials

Before installation, you'll need a Habitify API API key:

1. Open Habitify API app or web interface
2. Go to **Settings → Account → API Access**
3. Generate new API key or copy existing one
4. Save this key for the installation steps below

## Requirements

- Node.js >= v18.0.0
- Habitify API API key
- Cursor, VS Code, Claude Desktop or another MCP Client

## Installation

<details>
<summary><b>Installing via Smithery</b></summary>

To install Habitify API MCP Server for any client automatically via [Smithery](https://smithery.ai):

```bash
npx -y @smithery/cli@latest install @sargonpiraev/habitify-mcp-server --client <CLIENT_NAME>
```

</details>

<details>
<summary><b>Install in Cursor</b></summary>

#### Cursor One-Click Installation

[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=@sargonpiraev/habitify-mcp-server&config=)

#### Manual Configuration

Add to your Cursor `~/.cursor/mcp.json` file:

```json
{
  "mcpServers": {
    "habitify-mcp-server": {
      "command": "npx",
      "args": ["-y", "@sargonpiraev/habitify-mcp-server"],
      "env": {
        "HABITIFY_API_KEY": "your-habitify_api_key"
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
        "HABITIFY_API_KEY": "your-habitify_api_key"
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
        "HABITIFY_API_KEY": "your-habitify_api_key"
      }
    }
  }
}
```

</details>

## Available Tools

- **`get-journal`**: Get habit journal for a specific date
- **`add-habit-log`**: Add a habit log
- **`delete-habit-logs-range`**: Delete habit logs in date range
- **`delete-habit-log`**: Delete a specific habit log
- **`get-habits`**: Get all habits
- **`get-habit`**: Get habit details
- **`get-areas`**: Get all areas
- **`get-moods`**: Get mood entries
- **`add-mood`**: Add mood entry
- **`get-notes`**: Get notes
- **`add-note`**: Add note
- **`get-actions`**: Get available actions

**Total: 12 tools available** 🎯

## Support This Project

Hi! I'm Sargon, a software engineer passionate about AI tools and automation. I create open-source MCP servers to help developers integrate AI assistants with their favorite services.

Your support helps me continue developing and maintaining these tools, and motivates me to create new integrations that make AI assistants even more powerful! 🚀

[![Support on Boosty](https://img.shields.io/badge/Support-Boosty-orange?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)](https://boosty.to/sargonpiraev)

## Connect with Author

- 🌐 Visit [sargonpiraev.com](https://sargonpiraev.com)
- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)
- 💬 Join [Discord](https://discord.gg/ZsWGxRGj)
