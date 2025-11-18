// components/ui/badge.tsx
import React, { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export const Badge: FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full',
        className
      )}
    >
      {children}
    </span>
  );
};
