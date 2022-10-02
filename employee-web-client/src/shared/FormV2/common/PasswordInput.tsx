import React from 'react';
import { useIntl } from 'react-intl';

import { HStack } from '@chakra-ui/react';
import { mdiEye, mdiEyeOff } from '@mdi/js';

import { useToggle } from '../../../hooks';
import { IconButton } from '../../Button';
import { ITextProps, TextInput } from '../fields';

interface IProps extends ITextProps {}

const PasswordInput = ({ maxW, children, ...props }: IProps) => {
  const { formatMessage } = useIntl();

  const [visible, toggleVisible] = useToggle(false);

  return (
    <HStack w='100%' maxW={maxW}>
      <TextInput w='100%' type={visible ? 'text' : 'password'} {...props}>
        {!children
          ? formatMessage({
              id: 'password-text-input-label',
              defaultMessage: 'Password',
            })
          : children}
      </TextInput>
      <IconButton
        id='unselect-icon-button'
        path={visible ? mdiEyeOff : mdiEye}
        title={formatMessage({
          id: 'password-text-switch-input',
          defaultMessage: 'Switch visibility',
        })}
        onClick={toggleVisible}
        mt='28px'
      />
    </HStack>
  );
};

export { PasswordInput };
