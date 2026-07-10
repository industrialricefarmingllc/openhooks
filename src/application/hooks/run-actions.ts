import { exec } from "../../infrastructure/executor.ts"

export function runActions(actions: { bash: string }[], label?: { output?: string }) {
  for (const action of actions) {
    const result = exec(action.bash)
    const msg = result.stderr || result.stdout || ""
    if (label) label.output = msg
    if (result.exitCode !== 0) throw new Error(msg)
  }
}
