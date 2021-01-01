import React from 'react';
import { IconProps } from '@mdi/react/dist/IconProps';
import { Icon as MdiIcon } from '@mdi/react';
import { useTheme } from '@chakra-ui/react';

const splitAt = (index: number) => (str: string) => [str.slice(0, index), str.slice(index + 1)];

const split = (value: string) => splitAt(value.lastIndexOf('.'))(value);

const Icon = ({ size = '20px', ...props }: IconProps) => {
  const { colors } = useTheme();

  if (!props.color) {
    return <MdiIcon {...props} size={size} />;
  }

  if (props.color.includes('.')) {
    const [color, shade] = split(props.color);

    return <MdiIcon {...props} color={colors[color][shade]} size={size} />;
  }

  return <MdiIcon {...props} size={size} />;
};

export { Icon };
