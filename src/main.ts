import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const myToken = core.getInput('myToken')
    // const octokit = github.getOctokit(myToken)
    const context = github.context
    core.info(myToken)
    core.info(JSON.stringify(context))
    core.setOutput('pr', JSON.stringify(context))
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
