import { screen, userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export class SummaryStepPo {
  private elements: {
    formStepHeader: HTMLElement;
    submitButton: HTMLElement;
    createFacilityNotification: HTMLElement;
  };

  protected constructor(protected canvasElement: HTMLElement) {
    within(canvasElement);

    this.elements = {
      get formStepHeader() {
        return screen.getByText('Step 4: Summary');
      },
      get submitButton() {
        return screen.getByRole('button', { name: /Submit/ });
      },
      get createFacilityNotification() {
        return screen.getByText('New facility created successfully');
      },
    };
  }

  async expectStepTitle() {
    await waitFor(async () => {
      await expect(this.elements.formStepHeader).toBeInTheDocument();
    });
  }

  async submitForm() {
    await userEvent.click(this.elements.submitButton);
  }

  async expectFacilityNotificationAppeared() {
    await waitFor(async () => {
      await expect(this.elements.createFacilityNotification).toBeInTheDocument();
    });
  }

  static render(canvasElement: HTMLElement) {
    return new SummaryStepPo(canvasElement);
  }
}
