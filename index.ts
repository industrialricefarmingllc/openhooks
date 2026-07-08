import { loadConfig } from "./src/infrastructure/config.ts"
import { registerHooks } from "./src/application/hooks.ts"

export const OpenhooksPlugin = async (ctx: { worktree: string }) => {
  const config = loadConfig(ctx.worktree)
  return registerHooks(config)
}

export default OpenhooksPlugin
