import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Dayjs } from 'dayjs';
import { GridItem, HStack } from '@chakra-ui/react';
import { mdiArrowLeft } from '@mdi/js';
import { DateInput } from 'react-hook-form-chakra-fields';

import { buildUrl } from 'utils';
import { DEFAULT_PARAMS } from 'utils/constant';
import { dayjs } from 'utils/dayjs';

import { IconButton } from 'shared/Button';
import { Icon } from 'shared/Icon';

interface IProps {
  trackedDay: Dayjs;
  setWeek: (date: Dayjs) => void;
  startDate: string;
  endDate: string;
}

const ScheduleDatePicker = ({ setWeek, trackedDay, endDate, startDate }: IProps) => {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  return (
    <GridItem display={{ base: 'none', lg: 'block' }} colSpan={1} mt={2}>
      <HStack spacing={4} maxW='300px'>
        <IconButton
          onClick={() => navigate(buildUrl(`/schedules`, DEFAULT_PARAMS))}
          variant='ghost'
          title={formatMessage({ id: 'bask-to-list', defaultMessage: 'Back to list' })}
          icon={<Icon path={mdiArrowLeft} />}
        />
        <DateInput
          isClearable={false}
          value={trackedDay?.toDate().toString()}
          placeholderText={formatMessage({ id: 'select-week', defaultMessage: 'Select week' })}
          onChange={value => {
            if (Array.isArray(value) || !value) return;
            setWeek(dayjs(value));
          }}
          minDate={new Date(startDate)}
          maxDate={new Date(endDate)}
        />
      </HStack>
    </GridItem>
  );
};

export { ScheduleDatePicker };
