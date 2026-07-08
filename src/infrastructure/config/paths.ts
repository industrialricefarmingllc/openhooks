import { homedir } from "node:os"
import { join } from "node:path"

export const GLOBAL_PATH = join(homedir(), ".config", "opencode", "hooks.yaml")

export const PROJECT_PATH = ".opencode/hooks.yaml"
