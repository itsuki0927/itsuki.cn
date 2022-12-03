'use client';

import React, { useState } from 'react';
import { githubLight } from '@codesandbox/sandpack-themes';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpackConsole,
} from '@codesandbox/sandpack-react';
import classNames from 'classnames';
import { SandpackConsoleData } from '@codesandbox/sandpack-react/dist/types/components/Console/utils/getType';
import { Slash } from 'react-feather';
import styles from './style.module.scss';
import GridBackground from '@/components/ui/GridBackground';

interface SandboxProps {
  files?: any;
}

interface ConsoleProps {
  className?: string;
  logs?: SandpackConsoleData;
}

const Console = ({ className = '', logs }: ConsoleProps) => {
  return (
    <ul className={classNames(className, 'h-[400px] overflow-auto bg-gray-50 px-4')}>
      {logs?.map(log => (
        <li
          key={log.id}
          className='border-b border-dashed border-gray-300 py-4 last:border-none'
        >
          {JSON.stringify(log.data)}
        </li>
      ))}
    </ul>
  );
};

const CodeBottomTabs = () => {
  const [showConsole, setShowConsole] = useState(false);
  const { logs, reset } = useSandpackConsole();

  return (
    <>
      <div className='flex border-t border-b border-gray-300 bg-gray-50 px-2'>
        <button
          type='button'
          data-active={!showConsole}
          className={styles.tabButton}
          onClick={() => setShowConsole(false)}
        >
          预览
        </button>
        <button
          type='button'
          data-active={showConsole}
          className={styles.tabButton}
          onClick={() => setShowConsole(true)}
        >
          日志
        </button>
        {showConsole && (
          <button
            className='ml-auto text-gray-400 hover:text-gray-600'
            type='button'
            onClick={() => reset()}
          >
            <Slash size={16} className='rotate-90' />
          </button>
        )}
      </div>
      <div className={classNames('mt-0 h-[400px]', showConsole ? 'hidden' : 'block')}>
        <GridBackground
          border={false}
          className='flex h-full min-w-[350px] max-w-full resize-x rounded-none p-4'
        >
          <SandpackPreview />
        </GridBackground>
      </div>
      <Console className={showConsole ? 'block' : 'hidden'} logs={logs} />
    </>
  );
};

const Sandbox = ({ files }: SandboxProps) => {
  return (
    <SandpackProvider
      template='react'
      options={{
        autorun: true,
        classes: {
          'sp-overlay': styles.removeBackground,
          'sp-loading': styles.removeBackground,
          'sp-tabs': styles.tabs,
          'sp-stack': styles.removeBackground,
          'sp-preview-container': styles.removeBackground,
        },
      }}
      files={files}
      customSetup={{
        dependencies: {
          popmotion: '11.0.5',
        },
      }}
      className={styles.sandbox}
      theme={githubLight}
    >
      <SandpackLayout className={styles.layout}>
        <SandpackCodeEditor showTabs showLineNumbers showInlineErrors key='code-editor' />
        <CodeBottomTabs />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default Sandbox;
