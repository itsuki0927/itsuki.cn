import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ReactNode } from 'react';

interface ToggleSectionButtonProps {
  children: ReactNode;
  tooltipContent: ReactNode;
  disabled: boolean;
  onClick: () => void;
}

const ToggleSectionButton = ({
  children,
  tooltipContent,
  disabled,
  onClick,
}: ToggleSectionButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            className="p-2"
            disabled={disabled}
            size="sm"
            variant="ghost"
            onClick={onClick}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToggleSectionButton;
