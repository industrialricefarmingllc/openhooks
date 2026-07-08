import { loadConfig } from "./src/infrastructure/config/load-config.ts"
import { registerHooks } from "./src/application/hooks/register-hooks.ts"

export function OpenhooksPlugin(ctx: { worktree?: string; directory?: string; project?: { root?: string } }) {
  const root = ctx.worktree || ctx.directory || ctx.project?.root || process.cwd()
  const config = loadConfig(root)

  return registerHooks(config)
}

