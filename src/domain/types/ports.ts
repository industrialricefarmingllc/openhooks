export type ExecResult = {
  exitCode: number
  stdout: string
  stderr: string
}

export interface ActionRunner {
  run(command: string): ExecResult
}
