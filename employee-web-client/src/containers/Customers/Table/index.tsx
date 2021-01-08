import React from 'react';

import { Grid } from 'shared/Grid';

import { Header } from './Header';
import { Row } from './Row';

const Table = () => {
  return (
    <>
      <Grid itemsCount={10} rowGap={1} templateColumns='80px repeat(5, 1fr)'>
        <Header />
        {Array.from(Array(10).keys()).map((item, index) => (
          <Row index={index + 1} key={index} />
        ))}
      </Grid>
    </>
  );
};

export { Table };
