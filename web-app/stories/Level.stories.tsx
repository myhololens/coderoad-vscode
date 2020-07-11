import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import * as T from '../../typings'
import * as TT from '../../typings/tutorial'
import Level from '../src/containers/Tutorial/components/Level'
import SideBarDecorator from './utils/SideBarDecorator'

type ModifiedLevel = TT.Level & {
  status: T.ProgressStatus
  index: number
  steps: Array<TT.Step & { status: T.ProgressStatus }>
}

const level = {
  id: '1',
  title: 'A Title',
  summary: 'A summary of the level',
  content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
  setup: null,
  status: 'ACTIVE' as 'ACTIVE',
  steps: [
    {
      id: '1.1',
      content: 'Should support markdown test\n ```shell\nnpn install some-package\n```\nwhew it works!',
      setup: {
        commits: ['abcdefg'],
      },
      solution: {
        commits: ['hijklmn'],
      },
      status: 'COMPLETE',
    },
    {
      id: '1.2',
      content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
      setup: {
        commits: ['abcdefg'],
      },
      solution: {
        commits: ['hijklmn'],
      },
      status: 'ACTIVE',
    },
    {
      id: '1.3',
      content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
      setup: {
        commits: ['abcdefg'],
      },
      solution: {
        commits: ['hijklmn'],
      },
      status: 'INCOMPLETE',
    },
  ],
}

storiesOf('Level', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Level', () => (
    <Level
      level={level}
      currentStep={0}
      status="ACTIVE"
      position={{ levelId: '1', stepId: '1.1', complete: false }}
      progress={{ levels: {}, steps: {} }}
      processes={[]}
      testStatus={null}
      onRunTest={action('onRunTest')}
      onOpenLogs={action('onOpenLogs')}
      onContinue={action('onContinue')}
      onLoadSolution={action('onLoadSolution')}
    />
  ))
  .add('Level 2', () => (
    <Level
      level={level}
      currentStep={0}
      status="ACTIVE"
      position={{ levelId: '1', stepId: '1.2', complete: false }}
      progress={{ levels: {}, steps: { '1.1': true } }}
      processes={[]}
      testStatus={null}
      onRunTest={action('onRunTest')}
      onOpenLogs={action('onOpenLogs')}
      onContinue={action('onContinue')}
      onLoadSolution={action('onLoadSolution')}
    />
  ))
  .add('No steps', () => (
    <Level
      level={{ id: '1', title: 'No Step Level', content: 'No steps in this one', steps: [] }}
      currentStep={0}
      status="ACTIVE"
      position={{ levelId: '1', stepId: null, complete: false }}
      progress={{ levels: {}, steps: {} }}
      processes={[]}
      testStatus={null}
      onRunTest={action('onRunTest')}
      onOpenLogs={action('onOpenLogs')}
      onContinue={action('onContinue')}
      onLoadSolution={action('onLoadSolution')}
    />
  ))
  .add('No lesson', () => (
    <Level
      level={{ id: '1', title: 'No Step Level', content: '', steps: level.steps }}
      currentStep={0}
      status="ACTIVE"
      position={{ levelId: '1', stepId: '1.1', complete: false }}
      progress={{ levels: {}, steps: {} }}
      processes={[]}
      testStatus={null}
      onRunTest={action('onRunTest')}
      onOpenLogs={action('onOpenLogs')}
      onContinue={action('onContinue')}
      onLoadSolution={action('onLoadSolution')}
    />
  ))
