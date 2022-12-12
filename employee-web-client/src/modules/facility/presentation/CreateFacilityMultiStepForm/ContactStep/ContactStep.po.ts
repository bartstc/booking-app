import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export class ContactStepPo {
  private elements: {
    formStepHeader: HTMLElement;
    nextButton: HTMLElement;
    contactTypeInputs: HTMLInputElement[];
    contactPhoneInputs: HTMLInputElement[];
    contactEmailInputs: HTMLInputElement[];
    contactPersonNameInput: HTMLInputElement;
    contactPersonPhoneNumberInput: HTMLInputElement;
    contactPersonFaxNumberInput: HTMLInputElement;
    contactPersonEmailInput: HTMLInputElement;
  };

  protected constructor(protected canvasElement: HTMLElement) {
    within(canvasElement);

    this.elements = {
      get formStepHeader() {
        return screen.getByText('Step 3: Contact and administration info');
      },
      get nextButton() {
        return screen.getByRole('button', { name: /Next/ });
      },
      get contactTypeInputs() {
        return screen.getAllByLabelText(/Type/) as HTMLInputElement[];
      },
      get contactPhoneInputs() {
        return screen.getAllByLabelText(/Phone/) as HTMLInputElement[];
      },
      get contactEmailInputs() {
        return screen.getAllByLabelText(/Email/) as HTMLInputElement[];
      },
      get contactPersonNameInput() {
        return screen.getByLabelText(/Name/) as HTMLInputElement;
      },
      get contactPersonPhoneNumberInput() {
        return screen.getByLabelText(/Phone number/) as HTMLInputElement;
      },
      get contactPersonFaxNumberInput() {
        return screen.getByLabelText(/Fax number/) as HTMLInputElement;
      },
      get contactPersonEmailInput() {
        return screen.getByLabelText(/Contact email/) as HTMLInputElement;
      },
    };
  }

  async expectStepTitle() {
    await waitFor(async () => {
      await expect(this.elements.formStepHeader).toBeInTheDocument();
    });
  }

  async setContactType(index: number, value: string) {
    await userEvent.type(this.elements.contactTypeInputs[0], value);
  }

  async setContactEmail(index: number, value: string) {
    await userEvent.type(this.elements.contactEmailInputs[0], value);
  }

  async setContactPhone(index: number, value: string) {
    await userEvent.type(this.elements.contactPhoneInputs[0], value);
  }

  async setContactPersonName(value: string) {
    await userEvent.type(this.elements.contactPersonNameInput, value);
  }

  async setContactPersonPhoneNumber(value: string) {
    await userEvent.type(this.elements.contactPersonPhoneNumberInput, value);
  }

  async setContactPersonFaxNumber(value: string) {
    await userEvent.type(this.elements.contactPersonFaxNumberInput, value);
  }

  async setContactPersonEmail(value: string) {
    await userEvent.type(this.elements.contactPersonEmailInput, value);
  }

  async goToNextStep() {
    await userEvent.click(this.elements.nextButton);
  }

  static render(canvasElement: HTMLElement) {
    return new ContactStepPo(canvasElement);
  }
}
