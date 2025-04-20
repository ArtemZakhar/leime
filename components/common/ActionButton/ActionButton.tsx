'use client';

import { Button } from '@heroui/button';
import { button as buttonStyles } from '@heroui/theme';

import { ReactNode } from 'react';

const ActionButton = ({
  children,
  handleClick = () => {},
}: {
  children: ReactNode;
  handleClick?: (data?: any) => void;
}) => {
  return (
    <Button
      radius="full"
      className={buttonStyles({
        variant: 'bordered',
        fullWidth: true,
        radius: 'md',
      })}
      onPress={handleClick}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
