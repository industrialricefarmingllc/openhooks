import { readFileSync, existsSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import type { HooksConfig, HookEntry, SessionHookEntry } from "../domain/types.ts"

const parseYaml = (text: string): HooksConfig => {
  const hooks: (HookEntry | SessionHookEntry)[] = []
  let current: Record<string, unknown> | null = null
  const lines = text.split("\n")

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (line.trim() === "" || line.trimStart().startsWith("#")) continue

    const listStart = line.match(/^  - (\w+):\s*(.*)/)
    if (listStart) {
      if (current) hooks.push(current as HookEntry | SessionHookEntry)
      current = { [listStart[1]!]: listStart[2]!.trim() } as Record<string, unknown>
      continue
    }

    if (!current) continue

    const propMatch = line.match(/^\s+(\w+):\s*(.*)/)
    const bashMatch = line.match(/^\s+- bash:\s*(.*)/)

    if (!propMatch && !bashMatch) continue

    if (bashMatch) {
      if (!current.actions || !Array.isArray(current.actions)) current.actions = []
      ;(current.actions as { bash: string }[]).push({ bash: bashMatch[1]!.trim().replace(/^["']|["']$/g, "") })
      continue
    }

    const key = propMatch![1]!
    const val = propMatch![2]!.trim()

    if (key === "tools" && val.startsWith("[")) {
      current.tools = val.slice(1, -1).split(",").map((s) => s.trim().replace(/['"]/g, ""))
    } else if (key === "actions") {
      if (!current.actions) current.actions = []
    } else {
      current[key] = val
    }
  }

  if (current) hooks.push(current as HookEntry | SessionHookEntry)

  return { hooks }
}

const GLOBAL_PATH = join(homedir(), ".config", "opencode", "hooks.yaml")
const PROJECT_PATH = ".opencode/hooks.yaml"

export const loadConfig = (worktree: string): HooksConfig => {
  const allHooks: (HookEntry | SessionHookEntry)[] = []

  if (existsSync(GLOBAL_PATH)) {
    const global = parseYaml(readFileSync(GLOBAL_PATH, "utf-8"))
    allHooks.push(...global.hooks)
  }

  const projectPath = join(worktree, PROJECT_PATH)
  if (existsSync(projectPath)) {
    const project = parseYaml(readFileSync(projectPath, "utf-8"))
    const ids = new Set(project.hooks.map((h) => h.id).filter(Boolean))
    const filtered = allHooks.filter((h) => !ids.has(h.id))
    allHooks.length = 0
    allHooks.push(...filtered, ...project.hooks)
  }

  return { hooks: allHooks }
}
