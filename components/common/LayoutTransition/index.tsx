import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

interface LayoutTransitionProps {
  children?: ReactNode;
}

const LayoutTransition = ({ children }: LayoutTransitionProps) => {
  const router = useRouter();
  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={router.asPath}
        addEndListener={(node, done) =>
          node.addEventListener('transitionend', done, false)
        }
        classNames='move'
      >
        {children}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default LayoutTransition;
