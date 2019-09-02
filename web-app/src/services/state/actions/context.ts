import {assign} from 'xstate'
import * as G from 'typings/graphql'
import * as CR from 'typings'

export default {
	setTutorial: assign({
		tutorial: (context: CR.MachineContext, event: CR.MachineEvent): any => {
			return event.payload.tutorial
		},
	}),
	// @ts-ignore
	initPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			if (!event.payload.tutorial) {
				throw new Error('Invalid tutorial')
			}

			const version: G.TutorialVersion = event.payload.tutorial.version

			const position: CR.Position = {
				levelId: version.levels[0].id,
				stageId: version.levels[0].stages[0].id,
				stepId: version.levels[0].stages[0].steps[0].id,
			}

			return position
		},
	}),
	// @ts-ignore
	updateStepPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			const steps: G.Step[] = context.tutorial.version
				.levels.find((l: G.Level) => l.id === position.levelId)
				.stages.find((s: G.Stage) => s.id === position.stageId)
				.steps

			const stepIndex = steps.findIndex((s: G.Step) => s.id === position.stepId)
			const step: G.Step = steps[stepIndex + 1]

			console.log('step load next', step.id, position.stepId)

			return {
				...position,
				stepId: step.id
			}
		},
	}),
	// @ts-ignore
	updateStagePosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			const stages: G.Stage[] = context.tutorial.version
				.levels.find((l: G.Level) => l.id === position.levelId)
				.stages

			const stageIndex = stages.findIndex((s: G.Stage) => s.id === position.stageId)
			const stage: G.Stage = stages[stageIndex + 1]

			console.log('stage load next', stage.id, position.stageId)

			return {
				...position,
				stageId: stage.id,
				stepId: stage.steps[0].id,
			}
		},
	}),
	// @ts-ignore
	updateLevelPosition: assign({
		position: (context: CR.MachineContext, event: CR.MachineEvent): CR.Position => {
			const position: CR.Position = context.position
			// merge in the updated position
			// sent with the test to ensure consistency
			const levels: G.Level[] = context.tutorial.version.levels

			const levelIndex = levels.findIndex((l: G.Level) => l.id === position.levelId)
			const level: G.Level = levels[levelIndex + 1]

			console.log('level load next', level.id, position.levelId)

			return {
				levelId: level.id,
				stageId: level.stages[0].id,
				stepId: level.stages[0].steps[0].id,
			}
		},
	}),
	// @ts-ignore
	updateStepProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const currentProgress: CR.Progress = context.progress
			const stepId = event.payload.stepId
			console.log('step progress update', stepId)

			currentProgress.steps[stepId] = true

			return currentProgress
		},
	}),
	// @ts-ignore
	updateStageProgress: assign({
		progress: (context: CR.MachineContext, event: CR.MachineEvent): CR.Progress => {
			// update progress by tracking completed
			const {progress, position} = context

			const stageId: string = position.stageId
			console.log('stage progress update', stageId)

			progress.stages[stageId] = true

			return progress
		},
	}),
}