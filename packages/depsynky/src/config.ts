import { YargsSchema } from '@mlchain/yargs-extra'

const defaultOptions = {
  rootDir: {
    type: 'string',
    default: process.cwd()
  }
} satisfies YargsSchema

export const bumpSchema = {
  ...defaultOptions,
  sync: {
    type: 'boolean',
    default: true
  }
} satisfies YargsSchema

export const syncSchema = defaultOptions satisfies YargsSchema

export const checkSchema = {
  ...defaultOptions,
  ignoreDev: {
    type: 'boolean',
    description: 'Ignore dev dependencies',
    default: false
  }
} satisfies YargsSchema

export const listSchema = defaultOptions satisfies YargsSchema
