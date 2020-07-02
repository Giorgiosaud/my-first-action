import * as core from '@actions/core'
import {wait} from './wait'
import * as artifact from '@actions/artifact'

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

    const artifactClient = artifact.create()
    const artifactName = 'my-artifact'
    const files = ['README.md']
    const rootDirectory = '.' // Also possible to use __dirname
    const options = {
      continueOnError: false,
    }

    const uploadResponse = await artifactClient.uploadArtifact(
      artifactName,
      files,
      rootDirectory,
      options,
    )
    core.setOutput('uploadResponse', uploadResponse)
    core.info(JSON.stringify(uploadResponse))
    core.debug(JSON.stringify(uploadResponse))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
