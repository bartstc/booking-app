import { within, userEvent, waitForElementToBeRemoved, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import selectEvent from 'react-select-event';

export class OfferFormPO {
  private elements: {
    addOfferForm: HTMLElement;
    addOfferButton: HTMLElement;
    offerNameInput: HTMLInputElement;
    durationInput: HTMLInputElement;
    priceValueInput: HTMLInputElement;
    priceCurrencyInput: HTMLInputElement;
    priceTypeInput: HTMLInputElement;
    addOfferSubmitButton: HTMLElement;
    addOfferNotification: HTMLElement;
    tableLoader: HTMLElement | null;
  };

  protected constructor(protected canvasElement: HTMLElement) {
    within(canvasElement);

    this.elements = {
      get addOfferForm() {
        return screen.getByTestId('add-offer-form');
      },
      get addOfferButton() {
        return screen.getByText('Add offer');
      },
      get offerNameInput() {
        return screen.getByLabelText(/Offer name/) as HTMLInputElement;
      },
      get durationInput() {
        return screen.getByLabelText(/Duration of the service/) as HTMLInputElement;
      },
      get priceValueInput() {
        return screen.getByLabelText(/Service's value/) as HTMLInputElement;
      },
      get priceCurrencyInput() {
        return screen.getByLabelText(/Currency/) as HTMLInputElement;
      },
      get priceTypeInput() {
        return screen.getByLabelText(/Price type/) as HTMLInputElement;
      },
      get addOfferSubmitButton() {
        return screen.getByText('Submit');
      },
      get addOfferNotification() {
        return screen.getByText('New offer added successfully');
      },
      get tableLoader() {
        return screen.queryByTestId('table-loader');
      },
    };
  }

  async setOfferName(value: string) {
    await userEvent.type(this.elements.offerNameInput, value);
  }

  async setDuration(value: number) {
    await userEvent.type(this.elements.durationInput, value.toString());
  }

  async setPriceValue(value: string) {
    await userEvent.type(this.elements.priceValueInput, value);
  }

  async setPriceType(value: string) {
    await selectEvent.select(this.elements.priceTypeInput, value);
  }

  async setPriceCurrency(value: string) {
    await selectEvent.select(this.elements.priceCurrencyInput, value);
  }

  async openNewOfferForm() {
    await userEvent.click(this.elements.addOfferButton);
  }

  async submitNewOffer() {
    await userEvent.click(this.elements.addOfferSubmitButton);
  }

  async expectLoaderDisappeared() {
    await waitForElementToBeRemoved(this.elements.tableLoader);
  }

  async expectAddOfferFormAppeared() {
    await expect(this.elements.addOfferForm).toBeInTheDocument();
  }

  async expectAddOfferFormDisappeared() {
    await waitForElementToBeRemoved(this.elements.addOfferForm);
  }

  async expectNewOfferAdded(offerName: string) {
    await expect(screen.getAllByText(offerName).length).toBeGreaterThan(0);
  }

  async expectOfferNotificationAppeared() {
    await expect(this.elements.addOfferNotification).toBeInTheDocument();
  }

  static render(canvasElement: HTMLElement) {
    return new OfferFormPO(canvasElement);
  }
}
