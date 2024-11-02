import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
      '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/?(*.)+(spec|test).ts'],
  globals: {
      'ts-jest': {
          useESM: true,
      },
  },
}

export default config