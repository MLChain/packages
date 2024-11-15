import { Logger } from '@mlchain/log4bot'
import chalk from 'chalk'
import Redis from 'ioredis'
import { Client } from 'pg'
import fetch from 'node-fetch'
import * as dynamoDb from '@aws-sdk/client-dynamodb'
import type { Config, DynamoDbCheck, HttpCheck, PostgresCheck, RedisCheck } from './config'

export function checkAll(logger: Logger, configs: Config, setReadiness: (name: string, isReady: boolean) => void) {
  const promises = configs.map(async (config) => {
    while (true) {
      try {
        logger.debug(`${chalk.green(config.name)} check of type ${chalk.blue(config.type)} is being checked`)
        await check(config)
        logger.debug(`${chalk.green(config.name)} check of type ${chalk.blue(config.type)} is ready!`)
        setReadiness(config.name, true)
      } catch (err) {
        logger.error(
          `${chalk.yellow(config.name)} check of type ${chalk.blue(config.type)} not ready yet retrying in 1s... ${err}`
        )
        setReadiness(config.name, false)
      }
      await delay(1000)
    }
  })
  return Promise.all(promises)
}

async function check(config: Config[number]) {
  const type = config.type

  switch (type) {
    case 'postgres':
      return checkPostgres(config)
    case 'http':
      return checkHttp(config)
    case 'redis':
      return checkRedis(config)
    case 'dynamodb':
      return checkDynamoDb(config)
    default:
      throw new Error(`Unknown check type: ${type}`)
  }
}

async function checkPostgres(config: PostgresCheck) {
  const client = new Client({ connectionString: config.uri })
  await client.connect()
  await client.query('SELECT NOW()')
  await client.end()
}

async function checkHttp(config: HttpCheck) {
  const res = await fetch(config.url, { signal: AbortSignal.timeout(5000) })

  if (!res.ok) {
    throw new Error(`HTTP check returned status ${res.status}`)
  }
}

async function checkRedis(config: RedisCheck) {
  const client = new Redis(config.uri)
  await client.ping()
  await client.quit()
}

async function checkDynamoDb(config: DynamoDbCheck) {
  const client = new dynamoDb.DynamoDBClient({ endpoint: config.uri })
  await client.send(new dynamoDb.ListTablesCommand({}))
}

async function delay(delayInms: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInms))
}
