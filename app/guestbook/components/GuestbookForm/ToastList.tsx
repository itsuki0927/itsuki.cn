'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const sleep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111);
    }, 3000);
  });
};

const ToastList = () => {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => {
          toast.info('test');
        }}
      >
        info
      </Button>
      <Button
        onClick={() => {
          toast.error('error');
        }}
      >
        error
      </Button>
      <Button
        onClick={() => {
          toast.success('success');
        }}
      >
        success
      </Button>
      <Button
        onClick={() => {
          toast.promise(
            async () => {
              return sleep();
            },
            {
              loading: 'promise',
              success: (data) => {
                return data + '--- success';
              },
              error: 'Error',
            },
          );
        }}
      >
        promise
      </Button>

      <Button
        onClick={() => {
          toast.loading('Loading');
        }}
      >
        loading
      </Button>
    </div>
  );
};

export default ToastList;
