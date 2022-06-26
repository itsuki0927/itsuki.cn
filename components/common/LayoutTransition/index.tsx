import { ComponentType, Key } from 'react';
import { animated, Transition } from '@react-spring/web';

export interface TransitionItem {
  id: Key;
  Component: ComponentType<any>;
  pageProps: Record<string, any>;
}

interface LayoutTransitionProps {
  items: TransitionItem;
}

const LayoutTransition = ({ items }: LayoutTransitionProps) => (
  <Transition
    items={items}
    keys={(item: TransitionItem) => item.id}
    from={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0, position: 'absolute' }}
  >
    {(styles, { pageProps, Component }) => (
      <animated.div style={{ ...styles, width: '100%' }}>
        <Component {...pageProps} />
      </animated.div>
    )}
  </Transition>
);

export default LayoutTransition;
