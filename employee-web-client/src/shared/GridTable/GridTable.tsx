import React, { ReactNode } from 'react';
import { isEmpty } from 'lodash';
import { Grid as ChakraGrid, GridProps, ResponsiveObject } from '@chakra-ui/react';

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

  const templateColumns = Object.values(config).reduce((config, configItem) => {
    const scopes = ['sm', 'base', 'md', 'lg', 'xl', '2xl'];

    const getHiddenScopes = () => {
      if (!configItem.isVisible) return scopes;

      if (!configItem.display) return [];

      const hiddenScope = Object.entries(configItem.display).find(([, value]) => value === 'none');
      const showingScope = Object.entries(configItem.display).find(([, value]) => value === 'flex');

      if (!hiddenScope && !showingScope) return [];

      const hiddenScopeIndex = scopes.indexOf(hiddenScope![0]);
      const showingScopeIndex = scopes.indexOf(showingScope![0]);

      return scopes.slice(hiddenScopeIndex, showingScopeIndex).concat(scopes.filter((scope, index) => index < hiddenScopeIndex));
    };

    const genTemplateColumns = (key: string): string => {
      const isHidden = getHiddenScopes().includes(key);

      if (config[key]) {
        return isHidden ? config[key]! : config[key]!.concat(' ', configItem.gridValue);
      } else {
        return isHidden ? '' : `${configItem.gridValue}`;
      }
    };

    return {
      ...config,
      sm: isEmpty(genTemplateColumns('sm')) ? undefined : genTemplateColumns('sm'),
      base: isEmpty(genTemplateColumns('base')) ? undefined : genTemplateColumns('base'),
      md: isEmpty(genTemplateColumns('md')) ? undefined : genTemplateColumns('md'),
      lg: isEmpty(genTemplateColumns('lg')) ? undefined : genTemplateColumns('lg'),
      xl: isEmpty(genTemplateColumns('xl')) ? undefined : genTemplateColumns('xl'),
      '2xl': isEmpty(genTemplateColumns('2xl')) ? undefined : genTemplateColumns('2xl'),
    };
  }, {} as ResponsiveObject<string>);

  return (
    <ChakraGrid id={id} w='100%' position='relative' templateColumns={templateColumns} {...props}>
      <TableProvider value={{ config }}>{children}</TableProvider>
    </ChakraGrid>
  );
};

export { GridTable };
