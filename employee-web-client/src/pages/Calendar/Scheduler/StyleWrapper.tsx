import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useColorModeValue, useTheme } from '@chakra-ui/react';

interface IProps {
  children: ReactNode;
}

const StyleWrapper = ({ children }: IProps) => {
  const { colors } = useTheme();
  const btnColor = useColorModeValue(colors.gray[700], colors.gray[100]);
  const activeBtnBgColor = useColorModeValue(colors.gray[200], colors.gray[600]);
  const eventBgColor = useColorModeValue(colors.primary[500], colors.primary[300]);
  const outDayBgColor = useColorModeValue(colors.gray[100], colors.gray[600]);
  const todayDayBgColor = useColorModeValue(colors.blue[100], colors.blue[500]);
  const todayDayColor = useColorModeValue(colors.gray[900], colors.gray[700]);

  return (
    <Styles
      eventBgColor={eventBgColor}
      btnColor={btnColor}
      activeBtnBgColor={activeBtnBgColor}
      outDayBgColor={outDayBgColor}
      todayDayBgColor={todayDayBgColor}
      todayDayColor={todayDayColor}
    >
      {children}
    </Styles>
  );
};

const Styles = styled.div<{
  eventBgColor: string;
  btnColor: string;
  activeBtnBgColor: string;
  outDayBgColor: string;
  todayDayBgColor: string;
  todayDayColor: string;
}>`
  .rbc-event {
    background-color: ${props => props.eventBgColor};
  }

  .rbc-event.rbc-selected {
    background-color: ${props => props.eventBgColor};
  }

  .rbc-btn-group {
    button {
      color: ${props => props.btnColor};
    }

    .rbc-active {
      background-color: ${props => props.activeBtnBgColor};
      box-shadow: none;
      border-color: unset;
    }
  }

  .rbc-day-bg.rbc-off-range-bg {
    background: ${props => props.outDayBgColor};
  }

  .rbc-day-bg.rbc-today {
    background: ${props => props.todayDayBgColor};
  }

  .rbc-today span {
    color: ${props => props.todayDayColor};
  }

  .rbc-time-slot {
    background: transparent;
  }

  .rbc-time-gutter.rbc-time-column,
  .rbc-time-header-gutter,
  .rbc-time-view-resources {
    background-color: transparent !important;
  }

  .rbc-time-header-gutter,
  .rbc-time-view-resources,
  .rbc-time-gutter,
  .rbc-time-column {
    background-color: transparent;
  }

  & > div[title] {
    display: none;
  }
`;

export { StyleWrapper };
