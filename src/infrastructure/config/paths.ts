import { homedir } from "node:os"
import { join } from "node:path"

export function getGlobalPath() {
  return join(homedir(), ".config", "opencode", "hooks.yaml")
}
