# @nicerice/openhooks

Config-driven native hooks for OpenCode. Runs bash commands on tool and session lifecycle events. Reports failures via the native OpenCode plugin API (throws) instead of injected messages, so the model sees tool errors naturally without mode switching.

## Install

Add to `opencode.json`:

```json
{
  "plugin": ["@nicerice/openhooks"]
}
```

## Usage

Create `~/.config/opencode/hooks.yaml` (global) or `.opencode/hooks.yaml` (project):

```yaml
hooks:
  - event: tool.execute.after
    tools: [write, edit, patch, apply_patch]
    actions:
      - bash: "mx ci"
  - event: tool.execute.before
    tools: [bash]
    actions:
      - bash: "validate-command.sh"
  - event: session.idle
    actions:
      - bash: "notify.sh"
  - event: session.created
    actions:
      - bash: "echo started"
```

Global and project configs merge by hook id (project overrides global).

## Events

| Event | When | Failure behavior |
|---|---|---|
| `tool.execute.before` | Before a tool runs | Throws, blocks the tool |
| `tool.execute.after` | After a tool completes | Throws, model sees tool error |
| `session.created` | Session created | Logs, doesn't throw |
| `session.deleted` | Session deleted | Logs, doesn't throw |
| `session.idle` | Session idle | Logs, doesn't throw |
| `session.error` | Session error | Logs, doesn't throw |

## Config

| Field | Required | Description |
|-------|----------|-------------|
| `id` | no | Unique identifier for override merging |
| `event` | yes | Event type from the table above |
| `tools` | no | Array of tool names (e.g. `[write, edit]`). Only for tool events. Omit to match all. |
| `actions` | yes | Array of `{ bash: "cmd" }` entries. Run sequentially, stops on first failure. |
