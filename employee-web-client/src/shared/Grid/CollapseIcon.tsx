import React from 'react';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';

import { Icon } from '../Icon';

interface IProps {
  isOpen: boolean;
}

const CollapseIcon = ({ isOpen }: IProps) => {
  return <Icon path={isOpen ? mdiChevronDown : mdiChevronRight} />;
};

export { CollapseIcon };
