import React, { ReactNode } from 'react';
import { Divider, Heading, HeadingProps, useColorModeValue, Text } from '@chakra-ui/react';

interface IProps extends HeadingProps {
  children: ReactNode | string;
  description?: ReactNode | string;
}

const SectionTitle = ({ children, description, ...props }: IProps) => {
  const headingColor = useColorModeValue('primary.500', 'primary.300');
  const descriptionColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <>
      <Heading color={headingColor} as='h3' fontSize='xl' {...props}>
        {children}
      </Heading>
      {description && (
        <Text pt={1} color={descriptionColor} fontSize='sm'>
          {description}
        </Text>
      )}
      <Divider mt={2} mb={{ base: 3, md: 4 }} />
    </>
  );
};

export { SectionTitle };
