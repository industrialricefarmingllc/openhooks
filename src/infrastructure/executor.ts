import { spawnSync } from "node:child_process"
import type { ExecResult } from "../domain/types.ts"

export const exec = (command: string, timeoutMs = 60_000): ExecResult => {
  const result = spawnSync(command, {
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf-8",
    shell: true,
    timeout: timeoutMs,
  })

  return {
    exitCode: result.status ?? 1,
    stdout: (result.stdout || "").trim(),
    stderr: (result.stderr || "").trim(),
  }
}
