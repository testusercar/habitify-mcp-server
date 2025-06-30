# Habitify MCP Server 🔧

![npm version](https://img.shields.io/npm/v/@sargonpiraev/habitify-mcp-server)
![npm downloads](https://img.shields.io/npm/dw/@sargonpiraev/habitify-mcp-server)
![license](https://img.shields.io/github/license/sargonpiraev/habitify-mcp-server)
![smithery badge](https://smithery.ai/badge/@sargonpiraev/habitify-mcp-server)
![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)

[![Install in VS Code](https://img.shields.io/badge/VS_Code-Install_MCP-0098FF)](vscode:mcp/install?%7B%22name%22%3A%22habitify-mcp-server%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22@sargonpiraev/habitify-mcp-server%22%5D%7D)
[![Install in Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?config)

MCP server for seamless Habitify API integration with AI assistants. Track habits, manage mood logs, create notes, and automate habit tracking workflows directly from Claude, Cursor, and other MCP-compatible AI tools.

## ❌ Without Habitify MCP Server

Users face these challenges when working with habit tracking:

- ❌ Manual habit logging and data entry in Habitify app
- ❌ No direct integration with AI coding assistants for habit automation
- ❌ Time-consuming API research and implementation for Habitify integration
- ❌ Repetitive habit tracking tasks that could be automated
- ❌ Disconnected workflow between productivity tools and habit tracking

## ✅ With Habitify MCP Server

Habitify MCP server provides seamless integration and automation:

- ✅ Direct access to Habitify API from AI assistants like Claude and Cursor
- ✅ Automated habit tracking and mood logging workflows
- ✅ Up-to-date Habitify API integration with comprehensive tool coverage
- ✅ Save hours of manual habit tracking and data entry
- ✅ Integrate habit tracking into your daily coding and productivity workflows

Add `use habitify` to your prompt in Cursor or Claude.

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

### Local Development

```bash
git clone https://gitlab.com/sargonpiraev/habitify-mcp-server
cd habitify-mcp-server
npm install
cp .env.example .env
# Edit .env with your Habitify API key
npm run build
```

### Development Tools

```bash
# Run in development mode
npm run dev

# Debug with MCP Inspector
npm run inspect
```

## Available Tools

### Tool Selection

You can enable specific tools using the `--tools` parameter:

```bash
npx @sargonpiraev/habitify-mcp-server --tools=get_journal,add_log,create_mood
```

### Tools List

#### `get_journal`

- **Description**: Get list of habits for a specific date
- **Parameters**:
  - `target_date` (optional): Date in ISO format. Defaults to current date
  - `order_by` (optional): Order by priority, reminder_time, or status
  - `status` (optional): Filter by habit status
  - `area_id` (optional): Filter by area ID
  - `time_of_day` (optional): Filter by time of day
- **Example**: Get today's habits ordered by priority

#### `get_habit_status` / `update_habit_status`

- **Description**: Get or update habit completion status
- **Parameters**:
  - `habit_id` (required): The habit identifier
  - `target_date` (optional): Date for status check/update
  - `status` (required for update): completed, skipped, or none
- **Example**: Mark morning meditation as completed

#### `get_logs` / `add_log` / `delete_log` / `delete_logs`

- **Description**: Manage quantifiable habit logs (numbers, measurements)
- **Parameters**:
  - `habit_id` (required): The habit identifier
  - `unit_type` (required for add): Type of measurement
  - `value` (required for add): Numeric value to log
  - `target_date` (required for add): Date for the log entry
- **Example**: Log 30 minutes of exercise or 8 glasses of water

#### `get_moods` / `get_mood` / `create_mood` / `update_mood` / `delete_mood`

- **Description**: Track daily mood on a 1-5 scale
- **Parameters**:
  - `mood_id` (required for get/update/delete): Mood entry identifier
  - `value` (required for create/update): Mood rating 1-5
  - `created_at` (required for create/update): Timestamp
- **Example**: Log daily mood rating

#### `get_areas`

- **Description**: Get all habit areas/categories
- **Parameters**: None
- **Example**: List all habit categories like "Health", "Work", "Personal"

#### `get_notes` / `add_text_note` / `delete_note` / `delete_notes`

- **Description**: Manage text notes attached to habits
- **Parameters**:
  - `habit_id` (required): The habit identifier
  - `content` (required for add): Note text content
  - `created_at` (required for add): Timestamp
- **Example**: Add reflection notes to meditation habit

#### `get_actions` / `get_action` / `create_action` / `update_action` / `delete_action`

- **Description**: Manage habit-related action items and reminders
- **Parameters**:
  - `habit_id` (required): The habit identifier
  - `action_id` (required for get/update/delete): Action identifier
  - `title` (required for create): Action title
  - `remind_at` (required for create): Reminder time
- **Example**: Create reminder to prepare workout clothes

## Configuration

### Environment Variables

- `HABITIFY_API_KEY`: Your Habitify API key (required) - Get from [Habitify Settings](https://habitify.me)
- `HABITIFY_BASE_URL`: Custom base URL (optional, defaults to official API)
- `HABITIFY_TIMEOUT`: Request timeout in ms (optional, default: 30000)

### Getting Your Habitify API Key

1. Open [Habitify app](https://habitify.me) or web interface
2. Go to Settings → Account → API Access
3. Generate new API key or copy existing one
4. Add the key to your MCP server configuration

### Claude Desktop Setup

1. Open Claude Desktop configuration file
2. Add server configuration (see installation section above)
3. Restart Claude Desktop
4. Verify connection with 🔗 icon in Claude interface

## ❗ Troubleshooting

If you encounter integration issues, try these solutions in order:

### Installation Issues

#### Package Not Found

```bash
# Verify NPM installation
npm list -g @sargonpiraev/habitify-mcp-server
npm install -g @sargonpiraev/habitify-mcp-server --force

# Clear npm cache if needed
npm cache clean --force
```

#### Permission Issues

```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# Or use local installation
npx -y @sargonpiraev/habitify-mcp-server
```

### Configuration Issues

#### Claude Desktop Configuration

1. **File Location Issues**:

   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. **JSON Syntax Validation**:

   ```bash
   # Validate your config file
   python -m json.tool claude_desktop_config.json
   ```

3. **Common Configuration Mistakes**:
   - Missing commas between server entries
   - Incorrect environment variable names
   - Invalid Habitify API key format

#### Environment Variables

```bash
# Check if environment variables are set
echo $HABITIFY_API_KEY

# Test API key validity
curl -H "Authorization: Bearer $HABITIFY_API_KEY" https://api.habitify.me/journal
```

### Runtime Issues

#### Connection Problems

1. **Restart Steps**:

   - Close Claude Desktop completely
   - Wait 10 seconds
   - Restart Claude Desktop
   - Look for 🔗 MCP connection icon

2. **Check Logs**:

   - Claude Desktop → Settings → Feature Preview → View Logs
   - Look for MCP-related errors

3. **Test Connection**:
   ```bash
   # Test server directly
   npx @modelcontextprotocol/inspector npx -y @sargonpiraev/habitify-mcp-server
   ```

#### API Authentication Issues

```bash
# Verify API key is valid
npx @sargonpiraev/habitify-mcp-server --list-tools

# Check if API key has proper permissions
# Ensure API key is not expired or revoked
```

### Getting Additional Help

1. **Debug with Inspector**:

   ```bash
   npx @modelcontextprotocol/inspector npx -y @sargonpiraev/habitify-mcp-server
   ```

2. **Enable Verbose Logging**:

   ```bash
   DEBUG=mcp* npx @sargonpiraev/habitify-mcp-server
   ```

3. **Community Support**:

   - 🐛 Report bugs on [GitLab Issues](https://gitlab.com/sargonpiraev/habitify-mcp-server/-/issues)
   - 📧 Email support: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)

4. **Provide Debug Information**:
   When reporting issues, include:
   - Operating system and version
   - Node.js version (`node --version`)
   - NPM version (`npm --version`)
   - Your configuration file (redact API key)
   - Complete error messages and logs
   - Steps to reproduce the issue

## 🤝 Connect with Us

Stay updated and get support:

- 🌐 Visit [sargonpiraev.com](https://sargonpiraev.com)
- 📧 Email: [sargonpiraev@gmail.com](mailto:sargonpiraev@gmail.com)
- 🔗 GitLab: [sargonpiraev](https://gitlab.com/sargonpiraev)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
