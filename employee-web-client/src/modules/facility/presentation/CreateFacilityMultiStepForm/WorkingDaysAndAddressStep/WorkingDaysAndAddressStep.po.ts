import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export class WorkingDaysAndAddressStepPo {
  private elements: {
    formStepHeader: HTMLElement;
    nextButton: HTMLElement;
    weekDayInputs: HTMLInputElement[];
    hourUntilInputs: HTMLInputElement[];
    hourToInputs: HTMLInputElement[];
    postCodeInput: HTMLInputElement;
    cityInput: HTMLInputElement;
    streetInput: HTMLInputElement;
  };

  protected constructor(protected canvasElement: HTMLElement) {
    within(canvasElement);

    this.elements = {
      get formStepHeader() {
        return screen.getByText('Step 2: Working hours and address');
      },
      get nextButton() {
        return screen.getByRole('button', { name: /Next/ });
      },
      get weekDayInputs() {
        return screen.getAllByLabelText(/Week day/) as HTMLInputElement[];
      },
      get hourUntilInputs() {
        return screen.getAllByLabelText(/Hour until/) as HTMLInputElement[];
      },
      get hourToInputs() {
        return screen.getAllByLabelText(/Hour to/) as HTMLInputElement[];
      },
      get postCodeInput() {
        return screen.getByLabelText(/Post code/) as HTMLInputElement;
      },
      get cityInput() {
        return screen.getByLabelText(/City/) as HTMLInputElement;
      },
      get streetInput() {
        return screen.getByLabelText(/Street/) as HTMLInputElement;
      },
    };
  }

  async expectStepTitle() {
    await waitFor(async () => {
      await expect(this.elements.formStepHeader).toBeInTheDocument();
    });
  }

  async setWeekDay(index: number, value: string) {
    await userEvent.type(this.elements.weekDayInputs[0], value);
  }

  async setHourUntil(index: number, value: string) {
    await userEvent.type(this.elements.hourUntilInputs[0], value);
  }

  async setHourTo(index: number, value: string) {
    await userEvent.type(this.elements.hourToInputs[0], value);
  }

  async setPostCode(value: string) {
    await userEvent.type(this.elements.postCodeInput, value);
  }

  async setCity(value: string) {
    await userEvent.type(this.elements.cityInput, value);
  }

  async setStreet(value: string) {
    await userEvent.type(this.elements.streetInput, value);
  }

  async goToNextStep() {
    await userEvent.click(this.elements.nextButton);
  }

  static render(canvasElement: HTMLElement) {
    return new WorkingDaysAndAddressStepPo(canvasElement);
  }
}
