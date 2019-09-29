import * as vscode from 'vscode'
import node from '../services/node'

// ensure only latest run_test action is taken
let currentId = 0

// quick solution to prevent processing multiple results
// NOTE: may be possible to kill child process early
const shouldExitEarly = (processId: number): boolean => {
	return currentId !== processId
}

let channel: vscode.OutputChannel

const getOutputChannel = (name: string): vscode.OutputChannel => {
	if (!channel) {
		channel = vscode.window.createOutputChannel(name)
	}
	return channel
}

interface Props {
	onSuccess(): void
	onFail(): void
	onRun(): void
	onError(): void
}

async function runTest({onSuccess, onFail, onRun, onError}: Props): Promise<void> {
	console.log('------------------- run test ------------------')
	// increment process id
	const processId = ++currentId

	onRun()

	const outputChannelName = 'Test Output'

	// TODO: validate test directory from package.json exists
	// let testFile = path.join('test');
	// if (!await exists(testFile)) {
	// 	return emptyTasks;
	// }

	// TODO: verify test runner for args
	// jest CLI docs https://jestjs.io/docs/en/cli
	const testArgs = [
		'--json',
		'--onlyChanged',
		'--env=node',
		'--maxConcurrency=4',
		'--maxWorkers=4'
	]

	// if .git repo, use --onlyChanged
	// const hasGit = path.join('.git');
	// if (await exists(hasGit)) {
	// 	testArgs.push('--onlyChanged')
	// }

	const commandLine = `npm test -- ${testArgs.join(' ')}`

	try {
		// capture position early on test start
		// in case position changes
		const {stdout} = await node.exec(commandLine)
		if (shouldExitEarly(processId)) {
			// exit early
			return
		}

		if (stdout) {
			const lines = stdout.split(/\r{0,1}\n/)
			console.log('SUCCESS LINES', lines)
			for (const line of lines) {
				if (line.length === 0) {
					continue
				}

				const regExp = /^{\"numFailedTestSuites/
				const matches = regExp.exec(line)
				if (matches && matches.length) {
					console.log('MATCHES SUCCESS')
					const result = JSON.parse(line)

					if (result.success) {
						console.log('SUCCESS')
						if (shouldExitEarly(processId)) {
							// exit early
							return
						}
						console.log('call onSuccess')
						onSuccess()
					} else {
						console.log('NOT SUCCESS?')
					}
				}
			}
		}
	} catch (err) {
		if (shouldExitEarly(processId)) {
			// exit early
			return
		}
		// error contains output & error message
		// output can be parsed as json
		const {stdout, stderr} = err
		console.log('TEST FAILED', stdout)

		if (!stdout) {
			console.error('SOMETHING WENT WRONG WITH A PASSING TEST')
			onError()
		}
		// test runner failed
		channel = getOutputChannel(outputChannelName)

		if (stdout) {
			const lines = stdout.split(/\r{0,1}\n/)

			for (const line of lines) {
				if (line.length === 0) {
					continue
				}

				const dataRegExp = /^{\"numFailedTestSuites"/
				const matches = dataRegExp.exec(line)

				if (matches && matches.length) {
					const result = JSON.parse(line)
					const firstError = result.testResults.find((t: any) => t.status === 'failed')

					if (firstError) {
						if (shouldExitEarly(processId)) {
							// exit early
							return
						}
						console.log('ERROR', firstError.message)
						console.log('call onFail')
						onFail()
					} else {
						console.error('NOTE: PARSER DID NOT WORK FOR ', line)
					}
				}
			}
		}

		if (stderr) {
			channel.show(false)
			channel.appendLine(stderr)
		}
	}
}

export default runTest