import type { ExecResult } from "../../domain/types/exec-result.ts"
import { exec } from "../../infrastructure/executor.ts"

export function runActions(actions: { bash: string }[], label: string) {
  for (const action of actions) {
    const result: ExecResult = exec(action.bash)

    if (result.exitCode === 0) continue

    throw new Error(`openhooks: ${label} failed (exit ${result.exitCode})\n${result.stderr || result.stdout}`)
  }
}
