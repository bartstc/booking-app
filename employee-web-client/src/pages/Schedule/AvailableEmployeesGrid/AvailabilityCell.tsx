import React from 'react';
import { GridItem, StackProps, useColorModeValue, useTheme, VStack } from '@chakra-ui/react';

interface IProps extends StackProps {
  isBlocked?: boolean;
}

const AvailabilityCell = ({ children, isBlocked = false, ...props }: IProps) => {
  const { colors } = useTheme();
  const borderColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const blockedBackgroundColor = useColorModeValue(colors.gray[100], colors.gray[700]);
  const dayOffBorder = useColorModeValue(colors.gray[300], colors.gray[600]);
  const blockedBackground = `repeating-linear-gradient(-45deg, ${dayOffBorder}, ${dayOffBorder} 1px, ${blockedBackgroundColor} 2px, ${blockedBackgroundColor} 9px)`;

  return (
    <GridItem
      as={VStack}
      colSpan={1}
      justify='flex-start'
      minH='65px'
      p={2}
      border={`1px solid ${borderColor}`}
      borderLeft='none'
      borderTop='none'
      textTransform='capitalize'
      spacing={1}
      background={isBlocked ? blockedBackground : 'inherit'}
      {...props}
    >
      {children}
    </GridItem>
  );
};

export { AvailabilityCell };
