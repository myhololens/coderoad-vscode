import * as React from 'react'
import DataContext from '../../utils/DataContext'
import Stage from '../../components/Stage'

interface PageProps {
  state: any
  send(action: string): void
}

const StagePage = (props: PageProps) => {
  const { position, data, progress } = React.useContext(DataContext)
  const { stageId } = position
  const stage = data.stages[stageId]

  if (!stage) {
    // may throw if no stage is supplied on restart
    return <div>No Stage!</div>
  }

  const stageComplete = progress.stages[stageId] || false

  const onNextStage = (): void => {
    props.send('STAGE_NEXT')
  }

  // create step subset
  const steps: { [stepId: string]: any } = {}
  for (const stepId of stage.stepList) {
    steps[stepId] = {
      ...data.steps[stepId],
      status: {
        // flag progressed steps as complete
        complete: progress.steps[stepId] || false,
        // set active step to active
        active: position.stepId === stepId,
      },
    }
  }
  return <Stage stage={stage} steps={steps} onNextStage={onNextStage} complete={stageComplete} />
}

export default StagePage
