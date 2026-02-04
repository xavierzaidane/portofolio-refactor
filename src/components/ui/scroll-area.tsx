import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  type?: 'auto' | 'scroll' | 'hover';
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, className, type = 'auto' }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const scrollElement = innerRef.current;
      if (!scrollElement) return;

      if (type === 'hover') {
        scrollElement.classList.add('scrollbar-hide');
        scrollElement.addEventListener('mouseenter', () => {
          scrollElement.classList.remove('scrollbar-hide');
        });
        scrollElement.addEventListener('mouseleave', () => {
          scrollElement.classList.add('scrollbar-hide');
        });
      }
    }, [type]);

    return (
      <div
        ref={ref}
        className={cn(
          'overflow-y-auto',
          type === 'scroll' && 'scrollbar-show',
          className
        )}
        style={{
          scrollbarWidth: type === 'hover' ? 'thin' : 'auto',
        }}
      >
        <div ref={innerRef}>{children}</div>
      </div>
    );
  }
);

ScrollArea.displayName = 'ScrollArea';
