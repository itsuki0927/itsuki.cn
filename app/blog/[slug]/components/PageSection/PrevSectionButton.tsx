import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowLeft } from 'lucide-react';

interface PrevSectionButtonProps {
  index: number;
  onClick: () => void;
}

const PrevSectionButton = ({ index, onClick }: PrevSectionButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            disabled={index === 0}
            size="sm"
            variant="ghost"
            onClick={onClick}
          >
            <ArrowLeft size={14} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>上一个评论块</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PrevSectionButton;
