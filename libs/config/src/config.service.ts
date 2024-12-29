import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as process from 'node:process'

type Paths<T> = T extends object
  ? {
      [K in keyof T]-?: T[K] extends object
        ? `${K & (string | number)}` | `${K & (string | number)}.${Paths<T[K]>}`
        : `${K & (string | number)}`
    }[keyof T]
  : never

type TypeAtPath<T, P extends Paths<T>> = P extends `${infer Head}.${infer Tail}`
  ? Head extends keyof T
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      TypeAtPath<T[Head], Tail>
    : never
  : P extends keyof T
    ? T[P]
    : never

export class ConfigService<T> {
  protected logger: Logger
  private config: T

  constructor(initialConfig: T = undefined, envPrefix: string = undefined) {
    this.logger = new Logger(this.constructor.name)
    if (initialConfig) {
      this.loadConfig(initialConfig, envPrefix)
    }
  }

  getObject(): T {
    return this.config
  }

  // Function to get the value at a specific path
  get<P extends Paths<T>>(path: P): TypeAtPath<T, P> {
    const keys = path.split('.') as (keyof T)[]
    let result: any = this.config

    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key]
      } else {
        throw new Error(`ConfigPath '${path}' is invalid.`)
      }
    }

    return result as TypeAtPath<T, P>
  }

  protected loadConfig(initialConfig: T, envPrefix = undefined) {
    dotenv.config()
    this.config = envPrefix
      ? this.overrideWithEnv(initialConfig, [envPrefix])
      : this.overrideWithEnv(initialConfig)
    this.logger.log('Configuration loaded successfully')
  }

  private generateEnvVarName(path: string[]): string {
    return path
      .map((part) =>
        part
          // Füge Unterstriche vor Großbuchstaben im CamelCase ein
          .replace(/([a-z])([A-Z])/g, '$1_$2')
          // Konvertiere alles in Großbuchstaben
          .toUpperCase()
      )
      .join('_')
  }

  private convertValueBasedOnType(value: string, defaultValue: any): any {
    if (typeof value !== 'string') {
      return value
    }
    if (typeof defaultValue === 'boolean') {
      return value.toLowerCase() === 'true'
    }
    if (typeof defaultValue === 'number') {
      return !isNaN(Number(value)) ? Number(value) : defaultValue
    }
    return value
  }

  private overrideWithEnv(config: T, path: string[] = []): any {
    return Object.keys(config).reduce((acc, key) => {
      const envVarName = this.generateEnvVarName([...path, key])

      if (typeof config[key] === 'object' && config[key] !== null) {
        acc[key] = this.overrideWithEnv(config[key], [...path, key])
      } else {
        const defaultValue = config[key]
        const value = process.env[envVarName] || config[key]
        this.logger.debug(
          `${envVarName}=${value} (Is Default: ${!process.env[envVarName]})`
        )
        acc[key] = this.convertValueBasedOnType(value, defaultValue)
      }

      return acc
    }, {})
  }
}
