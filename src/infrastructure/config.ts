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

    const listMatch = line.match(/^  - event:\s*(.*)/)
    if (listMatch) {
      if (current) hooks.push(current as HookEntry | SessionHookEntry)
      current = { event: listMatch[1]!.trim() } as Record<string, unknown>
      continue
    }

    if (!current) continue

    const idMatch = line.match(/^\s+id:\s*(.*)/)
    if (idMatch) {
      current.id = idMatch[1]!.trim()
      continue
    }

    const toolsMatch = line.match(/^\s+tools:\s*\[(.*)\]/)
    if (toolsMatch) {
      current.tools = toolsMatch[1]!.split(",").map((s) => s.trim().replace(/['"]/g, ""))
      continue
    }

    const bashActionMatch = line.match(/^\s+- bash:\s*(.*)/)
    if (bashActionMatch) {
      if (!current.actions) current.actions = []
      ;(current.actions as { bash: string }[]).push({ bash: bashActionMatch[1]!.trim() })
      continue
    }
  }

  if (current) hooks.push(current as HookEntry | SessionHookEntry)

  return { hooks }
}

const GLOBAL_PATH = join(homedir(), ".config", "opencode", "openhooks.yaml")
const PROJECT_PATH = ".opencode/openhooks.yaml"

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
