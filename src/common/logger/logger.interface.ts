export interface LoggerInterface {
  info(mewssge: string, ...args: unknown[]): void
  warn(mewssge: string, ...args: unknown[]): void
  debug(mewssge: string, ...args: unknown[]): void
  error(mewssge: string, ...args: unknown[]): void
}
