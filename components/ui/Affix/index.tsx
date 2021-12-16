import { CSSProperties, forwardRef, ReactNode, useRef } from 'react';
import { mergeRefs } from '@/utils';
import useContainerOffset from './useContainerOffset';
import useFixed from './useFixed';
import useOffset from './useOffset';

export interface AffixProps {
  top?: number;

  onChange?: (fixed?: boolean) => void;
  container?: HTMLElement | (() => HTMLElement);
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const Affix = forwardRef((props: AffixProps, ref: any) => {
  const { className, children, container, top, onChange, ...rest } = props;

  const mountRef = useRef(null);
  const offset = useOffset(mountRef);
  const containerOffset = useContainerOffset(container);
  const fixed = useFixed(offset, containerOffset, { top, onChange });

  const placeholderStyles = fixed
    ? { width: offset?.width, height: offset?.height }
    : undefined;

  const fixedStyles: React.CSSProperties = {
    position: 'fixed',
    top,
    left: offset?.left,
    width: offset?.width,
    zIndex: 10,
  };

  const affixStyles = fixed ? fixedStyles : undefined;

  return (
    <div {...rest} ref={mergeRefs(mountRef, ref)}>
      <div className={className} style={affixStyles}>
        {children}
      </div>
      {fixed && <div aria-hidden style={placeholderStyles} />}
    </div>
  );
});

export default Affix;
