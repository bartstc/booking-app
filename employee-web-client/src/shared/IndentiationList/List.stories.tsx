import React from 'react';
import { faker } from '@faker-js/faker';

import { List, IndentList, Label, Value, IndentLabel } from './index';
import { Divider, Header, Heading, SubHeading } from 'shared/DescriptionListV2';

export default {
  title: 'components/IndentationList',
};

export const Default = () => (
  <List>
    <IndentLabel>
      <Header>
        <Heading>Header of subsection</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </IndentLabel>
    <IndentList>
      <Label>Facility currency</Label>
      <Value>EUR</Value>
      <Label>Facility currency</Label>
      <Value>EUR</Value>
      <Label>Facility business category</Label>
      <Value>Barber shop</Value>
    </IndentList>
    <Divider />
    <IndentLabel>
      <Header>
        <Heading>Header of subsection 2</Heading>
        <SubHeading>{faker.random.words(6)}</SubHeading>
      </Header>
    </IndentLabel>
    <IndentList>
      <Label>Facility currency</Label>
      <Value>EUR</Value>
      <Label>Facility currency</Label>
      <Value>EUR</Value>
      <Label>Facility business category</Label>
      <Value>Barber shop</Value>
    </IndentList>
  </List>
);
