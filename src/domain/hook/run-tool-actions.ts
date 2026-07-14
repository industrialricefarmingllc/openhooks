import type { Hook } from "../types/hook-types.ts"
import type { ActionRunner, ExecResult } from "../types/ports.ts"

export function runToolActions(hook: Hook, runner: ActionRunner, label?: { output?: string }) {
  let lastResult: ExecResult = { exitCode: 0, stdout: "", stderr: "" }
  for (const action of hook.actions) {
    lastResult = runner.run(action.bash)
    const msg = [lastResult.stderr, lastResult.stdout].filter(Boolean).join("\n")
    if (label) label.output = msg
    if (lastResult.exitCode !== 0) throw new Error(msg || "exit code: " + lastResult.exitCode)
  }
  return [lastResult.stderr, lastResult.stdout].filter(Boolean).join("\n")
}
