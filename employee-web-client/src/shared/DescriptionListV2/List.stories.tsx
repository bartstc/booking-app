import React from 'react';
import { faker } from '@faker-js/faker';

import {
  Value,
  MultipleValue,
  ValueText,
  Label,
  List,
  ListItem,
  Divider,
  Spacer,
  Header,
  Heading,
  SubHeading,
  IndentationLabel,
  IndentationList,
  IndentValue,
  IndentLabel,
} from './index';

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
    <ListItem>
      <Header>
        <Heading>Header of facility data</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </ListItem>
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
    <ListItem>
      <Header>
        <Heading>Header of facility data 2</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </ListItem>
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

export const WithIndentation = () => (
  <List>
    <ListItem>
      <Header>
        <Heading>Header of facility data</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </ListItem>
    <Divider />
    <Label>Facility name</Label>
    <Value>HardCut</Value>
    <Divider />
    <Label>Facility slug</Label>
    <Value>hard-cut</Value>
    <Spacer />
    <ListItem>
      <Header>
        <Heading>Header of facility data 2</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </ListItem>
    <Divider />
    <Label>Facility name</Label>
    <Value>HardCut</Value>
    <Divider />
    <Label>Facility slug</Label>
    <Value>hard-cut</Value>
    <Divider />
    <Label>Facility description</Label>
    <Value>{faker.random.words(40)}</Value>
    <Divider />
    <IndentationLabel>
      <Header>
        <Heading>Header of subsection</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </IndentationLabel>
    <IndentationList>
      <IndentLabel>Facility currency</IndentLabel>
      <IndentValue>EUR</IndentValue>
      <IndentLabel>Facility currency</IndentLabel>
      <IndentValue>EUR</IndentValue>
      <IndentLabel>Facility business category</IndentLabel>
      <IndentValue>Barber shop</IndentValue>
    </IndentationList>
    <Divider />
    <IndentationLabel>
      <Header>
        <Heading>Header of subsection 2</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </IndentationLabel>
    <IndentationList>
      <IndentLabel>Facility currency</IndentLabel>
      <IndentValue>EUR</IndentValue>
      <IndentLabel>Facility currency</IndentLabel>
      <IndentValue>EUR</IndentValue>
      <IndentLabel>Facility business category</IndentLabel>
      <IndentValue>Barber shop</IndentValue>
    </IndentationList>
  </List>
);
