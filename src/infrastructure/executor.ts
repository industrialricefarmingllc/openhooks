import { spawnSync } from "node:child_process"
import type { ExecResult } from "../domain/types/exec-result.ts"

export function exec(command: string, timeoutMs = 60_000) {
  const result = spawnSync(command, {
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf-8",
    shell: true,
    timeout: timeoutMs,
  })

  const exitCode = result.status ?? 1
  const stdout = (result.stdout || "").trim()
  const stderr = (result.stderr || "").trim()

  return { exitCode, stdout, stderr }
}
