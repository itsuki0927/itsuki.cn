/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useRef, useState } from 'react';
import s from './style.module.scss';

const duration = 1600;

interface SendButtonProps {
  onConfirm?: () => Promise<boolean>;
}

const SendButton = ({ onConfirm }: SendButtonProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [state, setState] = useState<'process' | 'success' | 'loading' | 'error' | ''>(
    ''
  );

  const runConfirm = () => {
    setState('loading');
    onConfirm?.().then(res => {
      const k = res ? 'success' : 'error';
      setState(k);
    });
  };

  const handleHold = (ev: any) => {
    if (
      ev.type !== 'keypress' ||
      (ev.type === 'keypress' && ev.which === 32 && state !== 'process')
    ) {
      setState('process');

      timerRef.current = setTimeout(runConfirm, duration);
    }
  };

  const removeHold = (ev: any) => {
    if (
      !['success', 'loading'].includes(state) &&
      (ev.type !== 'keyup' || (ev.type === 'keyup' && ev.which === 32))
    ) {
      setState('');
      if (timerRef.current) {
        clearTimeout(timerRef.current as unknown as number);
        timerRef.current = null;
      }
    }
  };

  return (
    <button
      type='button'
      onMouseDown={handleHold}
      onTouchStart={handleHold}
      onKeyPress={handleHold}
      onMouseUp={removeHold}
      onMouseOut={removeHold}
      onTouchEnd={removeHold}
      onKeyUp={removeHold}
      className={`${s.send} ${state ? s[state] : ''}`}
    >
      <div>
        <svg className={s.progress} viewBox='0 0 32 32'>
          <circle r='8' cx='16' cy='16' />
        </svg>

        <svg
          onTransitionEnd={e => {
            if (e.propertyName === 'stroke-dashoffset') {
              setTimeout(() => {
                setState('');
              }, 500);
            }
          }}
          className={s.tick}
          viewBox='0 0 24 24'
        >
          <polyline points='18,7 11,16 6,12' />
        </svg>
      </div>

      <ul>
        <li>发射</li>
        <li>确定?</li>
        <li>发射中</li>
        <li>成功</li>
        <li>失败</li>
      </ul>
    </button>
  );
};

export default SendButton;
