import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

export const DatePickerStyles = styled(Box)<{
  isDarkMode: boolean;
  borderColor: string;
  focusColor: string;
  isInvalid: boolean;
  clearBtnColor: string;
  clearBtnBackground: string;
  calendarBackground: string;
  calendarColor: string;
  calendarSelectedBackground: string;
  calendarDayHover: string;
}>`
  .react-datepicker {
    background-color: ${props => props.calendarBackground};
  }
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
  }

  .react-datepicker__input-container {
    height: 2.5rem;
  }

  .react-datepicker__input-container > input {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    border: ${props => (props.isInvalid ? `2.5px solid ${props.borderColor} !important` : `1px solid ${props.borderColor} !important`)};
  }

  .react-datepicker__input-container > input:focus {
    border: ${props => `2px solid ${props.focusColor} !important`};
  }

  .react-datepicker__close-icon {
    right: 3px;
  }

  .react-datepicker__close-icon::after {
    width: 21px;
    height: 21px;
    background-color: ${props => props.clearBtnBackground};
    color: ${props => props.clearBtnColor};
    font-size: 1.1rem;
  }

  .react-datepicker__input-time-container {
    background-color: transparent;
    filter: ${props => (props.isDarkMode ? 'invert(1)' : 'invert(0)')};
  }

  .react-datepicker-time__input {
    background-color: transparent;
  }

  .react-datepicker__month-container,
  .react-datepicker__header {
    background: ${props => props.calendarBackground};
    * {
      color: ${props => props.calendarColor};
    }

    .react-datepicker__day:hover {
      background: ${props => props.calendarDayHover};
    }

    .react-datepicker__day--selected {
      color: white;
      background: ${props => props.calendarSelectedBackground};
      font-weight: bold;
    }
  }
`;
