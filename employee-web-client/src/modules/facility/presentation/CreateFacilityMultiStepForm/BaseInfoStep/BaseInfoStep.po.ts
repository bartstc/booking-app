import { screen, userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import selectEvent from 'react-select-event';

export class BaseInfoStepPo {
  private elements: {
    formStepHeader: HTMLElement;
    nextButton: HTMLElement;
    nameInput: HTMLInputElement;
    slugInput: HTMLInputElement;
    descriptionInput: HTMLInputElement;
    currencyInput: HTMLInputElement;
    mainBusinessCategorySelect: HTMLInputElement;
    subordinateBusinessCategorySelect: HTMLInputElement;
  };

  protected constructor(protected canvasElement: HTMLElement) {
    within(canvasElement);

    this.elements = {
      get formStepHeader() {
        return screen.getByText("Step 1: Basic facility's data");
      },
      get nextButton() {
        return screen.getByRole('button', { name: /Next/ });
      },
      get nameInput() {
        return screen.getByLabelText(/Facility name/) as HTMLInputElement;
      },
      get slugInput() {
        return screen.getByLabelText(/Slug/) as HTMLInputElement;
      },
      get descriptionInput() {
        return screen.getByLabelText(/Description/) as HTMLInputElement;
      },
      get currencyInput() {
        return screen.getByLabelText(/Currency/) as HTMLInputElement;
      },
      get mainBusinessCategorySelect() {
        return screen.getByLabelText(/Main business category/) as HTMLInputElement;
      },
      get subordinateBusinessCategorySelect() {
        return screen.getByLabelText(/Subordinate business category/) as HTMLInputElement;
      },
    };
  }

  async expectStepTitle() {
    await expect(this.elements.formStepHeader).toBeInTheDocument();
  }

  async setName(value: string) {
    await userEvent.type(this.elements.nameInput, value);
  }

  async setSlug(value: string) {
    await userEvent.type(this.elements.slugInput, value);
  }

  async setDescription(value: string) {
    await userEvent.type(this.elements.descriptionInput, value);
  }

  async setCurrency(value: string) {
    await selectEvent.select(this.elements.currencyInput, value);
  }

  async setMainBusinessCategory(value: string) {
    await selectEvent.select(this.elements.mainBusinessCategorySelect, value);
  }

  async setSubordinateBusinessCategory(options: string[]) {
    await selectEvent.select(this.elements.subordinateBusinessCategorySelect, options);
  }

  async goToNextStep() {
    await userEvent.click(this.elements.nextButton);
  }

  static render(canvasElement: HTMLElement) {
    return new BaseInfoStepPo(canvasElement);
  }
}
