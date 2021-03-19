import { useCallback, useMemo, useState } from 'react';

export const useModal = <T>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  const onOpen = useCallback((additionalData?: T) => {
    setData(additionalData);
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
    setData(undefined);
  }, []);

  const onToggle = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  return useMemo(() => ({ isOpen, onOpen, onClose, onToggle, data }), [isOpen, isOpen, onClose, onToggle, data]);
};
