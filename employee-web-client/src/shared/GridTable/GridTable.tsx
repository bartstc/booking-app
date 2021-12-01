import React, { ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { Grid as ChakraGrid, GridProps } from '@chakra-ui/react';
import { ResponsiveObject } from '@chakra-ui/styled-system/dist/types/utils/types';

import { NoResultsState } from '../States';
import { ITableConfig } from './ITableConfig';
import { TableProvider } from './TableProvider';

interface IProps extends GridProps {
  count: number;
  id: string;
  children: ReactNode | string;
  config: ITableConfig;
}

const GridTable = ({ children, count, config, id, ...props }: IProps) => {
  if (count === 0) {
    return <NoResultsState />;
  }

  // use config initially when config is not yet inside store
  const templateColumns = Object.values(config).reduce((config, configItem) => {
    const scopes = ['sm', 'base', 'md', 'lg', 'xl', '2xl'];

    const getHiddenScopes = () => {
      if (!configItem.display) return [];

      const hiddenScope = Object.entries(configItem.display).find(([, value]) => value === 'none');
      const showingScope = Object.entries(configItem.display).find(([, value]) => value === 'flex');

      if (!hiddenScope && !showingScope) return [];

      const hiddenScopeIndex = scopes.indexOf(hiddenScope![0]);
      const showingScopeIndex = scopes.indexOf(showingScope![0]);

      return scopes.slice(hiddenScopeIndex, showingScopeIndex).concat(scopes.filter((scope, index) => index < hiddenScopeIndex));
    };

    const concatTemplateColumns = (key: string): string => {
      const isHidden = getHiddenScopes().includes(key);

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

  return (
    <ChakraGrid id={id} w='100%' position='relative' templateColumns={templateColumns} {...props}>
      <TableProvider value={{ config }}>{children}</TableProvider>
    </ChakraGrid>
  );
};

export { GridTable };
