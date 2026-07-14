import { loadConfig } from "./src/infrastructure/config/load-config.ts"
import { createRunner } from "./src/infrastructure/executor.ts"
import { registerHooks } from "./src/application/register-hooks.ts"
import { adaptHandlers } from "./src/infrastructure/opencode/adapter.ts"

export function OpenhooksPlugin(ctx: { worktree?: string; directory?: string; project?: { root?: string } }) {
  const root = ctx.worktree || ctx.directory || ctx.project?.root || process.cwd()
  return adaptHandlers(registerHooks(loadConfig(root)), createRunner())
}

export default OpenhooksPlugin
