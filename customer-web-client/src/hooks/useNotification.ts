import { AlertStatus, useToast } from '@chakra-ui/react';

export interface INotification {
  title: string;
  description: string;
  type: AlertStatus;
}

export const useNotification = () => {
  const toast = useToast();

  const addNotification = ({ title, description, type }: INotification) => {
    toast({
      position: 'bottom',
      title,
      description,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  return { addNotification };
};
