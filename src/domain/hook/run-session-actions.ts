import type { Hook } from "../types/hook-types.ts"
import type { ActionRunner } from "../types/ports.ts"

export function runSessionActions(hook: Hook, runner: ActionRunner) {
  for (const action of hook.actions) {
    try {
      runner.run(action.bash)
    } catch {
      // session hook errors are silently ignored
    }
  }
}
