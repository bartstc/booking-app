import React, { ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { Grid as ChakraGrid, GridProps } from '@chakra-ui/react';
import { ResponsiveObject } from '@chakra-ui/styled-system/dist/types/utils/types';

import { NoResultsState } from '../States';
import { ITableConfig } from './ITableConfig';
import { TableProvider } from './TableProvider';

interface IProps extends GridProps {
  count: number;
  children: ReactNode | string;
  config: ITableConfig;
}

const GridTable = ({ children, count, config, ...props }: IProps) => {
  if (count === 0) {
    return <NoResultsState />;
  }

  const templateColumns = Object.values(config).reduce((config, configItem) => {
    const concatTemplateColumns = (key: string): string => {
      const isHidden = configItem.display && configItem.display[key] === 'none';

      if (config[key]) {
        return isHidden ? config[key]! : config[key]!.concat(' ', configItem.gridValue);
      } else {
        return isHidden ? '' : `${configItem.gridValue}`;
      }
    };

    return {
      ...config,
      sm: isEmpty(concatTemplateColumns('sm')) ? undefined : concatTemplateColumns('sm'),
      base: isEmpty(concatTemplateColumns('base')) ? undefined : concatTemplateColumns('base'),
      md: isEmpty(concatTemplateColumns('md')) ? undefined : concatTemplateColumns('md'),
      lg: isEmpty(concatTemplateColumns('lg')) ? undefined : concatTemplateColumns('lg'),
      xl: isEmpty(concatTemplateColumns('xl')) ? undefined : concatTemplateColumns('xl'),
      '2xl': isEmpty(concatTemplateColumns('2xl')) ? undefined : concatTemplateColumns('2xl'),
    };
  }, {} as ResponsiveObject<string>);

  console.log(templateColumns);

  return (
    <ChakraGrid w='100%' position='relative' templateColumns={templateColumns} {...props}>
      <TableProvider value={{ config }}>{children}</TableProvider>
    </ChakraGrid>
  );
};

export { GridTable };
