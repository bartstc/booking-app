import { faker } from '@faker-js/faker';

import { Value, MultipleValue, ValueText, Label, List, ListStack, Divider, Spacer, Header, Heading, SubHeading } from './index';

export default {
  title: 'components/DescriptionList',
};

export const Default = () => (
  <List>
    <Label>Facility name</Label>
    <Value>HardCut</Value>
    <Divider />
    <Label>Facility slug</Label>
    <Value>hard-cut</Value>
    <Divider />
    <Label>Facility currency</Label>
    <Value>EUR</Value>
    <Divider />
    <Label>Facility business category</Label>
    <Value>Barber shop</Value>
    <Divider />
    <Label>Facility description</Label>
    <Value>{faker.random.words(40)}</Value>
  </List>
);

export const WithEmptyValues = () => (
  <List>
    <Label>Facility name</Label>
    <Value>HardCut</Value>
    <Divider />
    <Label>Facility slug</Label>
    <Value>hard-cut</Value>
    <Divider />
    <Label>Empty value - empty string</Label>
    <Value>{''}</Value>
    <Divider />
    <Label>Empty value - null</Label>
    <Value>{null}</Value>
    <Divider />
    <Label>Empty value - undefined</Label>
    <Value>{undefined}</Value>
  </List>
);

export const WithStacks = () => (
  <List>
    <ListStack>
      <Header>
        <Heading>Header of facility data</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </ListStack>
    <Divider />
    <Label>Facility name</Label>
    <Value>HardCut</Value>
    <Divider />
    <Label>Facility slug</Label>
    <Value>hard-cut</Value>
    <Divider />
    <Label>Facility currency</Label>
    <Value>EUR</Value>
    <Divider />
    <Label>Facility business category</Label>
    <Value>Barber shop</Value>
    <Divider />
    <Label>Facility description</Label>
    <Value>{faker.random.words(40)}</Value>
    <Spacer />
    <ListStack>
      <Header>
        <Heading>Header of facility data 2</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </ListStack>
    <Divider />
    <Label>Facility name</Label>
    <Value>HardCut</Value>
    <Divider />
    <Label>Additional business categories</Label>
    <MultipleValue>
      <ValueText>Barber shop 1</ValueText>
      <ValueText>Barber shop 2</ValueText>
      <ValueText>Barber shop 3</ValueText>
    </MultipleValue>
  </List>
);
