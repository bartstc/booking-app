import React from 'react';
import { useIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { Menu, MenuButton, MenuItem, MenuList, MenuGroup, Button as ChButton, IconButton as ChIconButton, chakra } from '@chakra-ui/react';
import { mdiOfficeBuilding } from '@mdi/js';

import { useEmployeeContextSelector } from 'modules/context/application';
import { useFacilityByIdQuery } from 'modules/facility/infrastructure/query';
import { useChangeActiveFacility } from 'modules/employees/infrastructure/command';
import { useChangeActiveFacilityNotifications } from 'modules/employees/presentation';

import { Icon } from '../Icon';

interface IProps {
  extended: boolean;
}

const ScopeMenu = ({ extended }: IProps) => {
  const { formatMessage } = useIntl();
  const facilityIds = useEmployeeContextSelector(state => state.scope.facilityIds);

  return (
    <Menu>
      {isMobile ? <Button /> : extended ? <Button /> : <IconButton />}
      <MenuList>
        <MenuGroup title={formatMessage({ id: 'select-facility', defaultMessage: 'Select facility' })}>
          {facilityIds.map(facilityId => (
            <FacilityMenuItem facilityId={facilityId} key={facilityId} />
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

const FacilityMenuItem = ({ facilityId }: { facilityId: string }) => {
  const facility = useFacilityByIdQuery(facilityId);
  const activeFacilityId = useEmployeeContextSelector(state => state.scope.activeFacilityId);

  const [change] = useChangeActiveFacility();
  const { showFailureNotification, showSuccessNotification } = useChangeActiveFacilityNotifications();

  return (
    <MenuItem
      fontWeight={facilityId === activeFacilityId ? '700' : 'inherit'}
      onClick={async () => {
        if (activeFacilityId === facilityId) return;

        try {
          await change(facilityId);
          showSuccessNotification();
        } catch {
          showFailureNotification();
        }
      }}
    >
      {facility.name}
    </MenuItem>
  );
};

const Button = () => {
  const activeFacilityId = useEmployeeContextSelector(state => state.scope.activeFacilityId);
  const facility = useFacilityByIdQuery(activeFacilityId);

  return (
    <MenuButton as={ChButton} variant='ghost' w='100%' leftIcon={<Icon path={mdiOfficeBuilding} size='24px' />}>
      <chakra.div isTruncated pl={1} textAlign='start'>
        {facility.name}
      </chakra.div>
    </MenuButton>
  );
};

const IconButton = () => <MenuButton as={ChIconButton} variant='ghost' icon={<Icon path={mdiOfficeBuilding} size='24px' />} />;

export { ScopeMenu };
