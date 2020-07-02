import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    core.debug(`Waiting ${ms} milliseconds ...`)

    core.debug(new Date().toTimeString())
    const result = await core.group(`Waiting ${ms} milliseconds`, async () => {
      const response = await wait(parseInt(ms, 10))
      return response
    })
    core.debug(new Date().toTimeString())
    core.debug(result)
    core.info('Output to the actions build log')
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
