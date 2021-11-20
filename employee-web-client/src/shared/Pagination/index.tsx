import React, { ReactElement, useEffect, useState } from 'react';
import { Flex, HStack, Input, useColorModeValue, useTheme } from '@chakra-ui/react';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import { useIntl } from 'react-intl';
import { isMobile } from 'react-device-detect';
import { range } from 'lodash';

import { useDebounce } from 'hooks';
import { Icon } from '../Icon';
import { useQueryParams } from '../Params';
import { IconButton, IconButtonProps } from '../Button';

interface IProps {
  limit: number;
  total: number;
  margin?: number;
  isLoading?: boolean;
}

const Pagination = ({ limit, total, margin = 3, isLoading = false }: IProps) => {
  const { params, pages: pagesHelper } = useQueryParams<{ offset: number }>();
  const { total: totalPages, change, current } = pagesHelper({
    limit: limit,
    offset: params.offset,
    total,
  });

  return <PaginationComponent current={current} onChange={change} totalPages={totalPages} isLoading={isLoading} margin={margin} />;
};

interface IPaginationComponentProps {
  onChange(page: number): void;
  current: number;
  totalPages: number;
  margin?: number;
  isLoading?: boolean;
}

export const PaginationComponent = ({ current, onChange, totalPages, margin = 3, isLoading = false }: IPaginationComponentProps) => {
  const { colors } = useTheme();
  const { formatMessage } = useIntl();

  const isFirstPage = current === 1;
  const isLastPage = current === totalPages;

  const pages = range(1, totalPages + 1);
  const lastPage = pages[pages.length - 1];
  const index = pages.findIndex(page => current === page);
  const leftPages = pages.length > 7 ? pages.slice(index, margin + index).filter(page => page !== lastPage) : pages;

  const buttonBg = useColorModeValue('primary.600', 'primary.500');
  const buttonColor = useColorModeValue(colors.primary['200'], colors.whiteAlpha['600']);
  const selectedButtonCss = `
    &[disabled] {
      color: ${buttonColor};
      background-color: ${buttonBg};
      opacity: 1;
  }
 `;

  if (isMobile) return null;

  if (totalPages <= 1) return null;

  return (
    <HStack width='100%' justify='center' mt={8}>
      <PaginationButton
        title={formatMessage({
          id: 'pagination-back-button',
          defaultMessage: 'Previous page',
        })}
        onClick={() => onChange(current - 1)}
        isDisabled={isFirstPage}
        isLoading={false}
      >
        <Icon path={mdiArrowLeft} />
      </PaginationButton>
      <>
        {leftPages.map(page => {
          return (
            <PaginationButton
              key={page}
              title={formatMessage(
                {
                  id: 'pagination-page-button',
                  defaultMessage: 'Page number {page}',
                },
                { page },
              )}
              isDisabled={page === current}
              onClick={() => onChange(page)}
              isLoading={isLoading}
              css={selectedButtonCss}
            >
              <span>{page}</span>
            </PaginationButton>
          );
        })}
        {pages.length > 7 ? (
          <>
            <PaginationInput
              onChange={newPage => {
                if (newPage > pages.length) {
                  return;
                }
                onChange(newPage);
              }}
            />
            <PaginationButton
              key={lastPage}
              title={formatMessage(
                {
                  id: 'pagination-page-button',
                  defaultMessage: 'Page number {page}',
                },
                { page: lastPage },
              )}
              isDisabled={lastPage === current}
              onClick={() => onChange(lastPage)}
              isLoading={isLoading}
              css={selectedButtonCss}
            >
              <span>{lastPage}</span>
            </PaginationButton>
          </>
        ) : null}
      </>
      <PaginationButton
        title={formatMessage({
          id: 'pagination-next-button',
          defaultMessage: 'Next page',
        })}
        onClick={() => {
          onChange(current + 1);
        }}
        isDisabled={isLastPage}
        isLoading={false}
      >
        <Icon path={mdiArrowRight} />
      </PaginationButton>
    </HStack>
  );
};

const PaginationInput = ({ onChange }: { onChange(page: number): void }) => {
  const [page, setPage] = useState<number | undefined>();

  useDebounce(
    () => {
      if (page !== undefined) {
        onChange(page);
      }
    },
    300,
    [page],
  );

  return (
    <Flex w='64px' h='30px'>
      <Input
        size='xs'
        textAlign='center'
        placeholder='...'
        fontWeight='bold'
        aria-label='Numer strony'
        onChange={e => {
          if (!e.target.value) {
            return setPage(1);
          }
          const newPage = Number(e.target.value);

          if (isNaN(newPage) || newPage < 1) {
            return;
          }
          setPage(newPage);
        }}
        type='number'
      />
    </Flex>
  );
};

interface IPaginationButtonProps extends IconButtonProps {
  isLoading?: boolean;
  children?: ReactElement;
  isDisabled?: boolean;
  onClick(): void;
}

const PaginationButton = ({ children, isLoading, onClick, isDisabled, ...props }: IPaginationButtonProps) => {
  const [state, toggle] = useState(false);

  useEffect(() => {
    if (!isLoading) toggle(false);
  }, [isLoading]);

  return (
    <IconButton
      withoutTooltip
      icon={children}
      size='sm'
      colorScheme='primary'
      onClick={() => {
        onClick();
        toggle(true);
      }}
      isDisabled={isDisabled}
      isLoading={isLoading && state}
      {...props}
    />
  );
};

export { Pagination };
