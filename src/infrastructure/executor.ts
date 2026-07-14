import { spawnSync } from "node:child_process"

export function createRunner() {
  return {
    run(command: string, timeoutMs = 60_000) {
      const result = spawnSync(command, { stdio: ["ignore", "pipe", "pipe"], encoding: "utf-8", shell: true, timeout: timeoutMs })
      return { exitCode: result.status ?? 1, stdout: (result.stdout || "").trim(), stderr: (result.stderr || "").trim() }
    },
  }
}
