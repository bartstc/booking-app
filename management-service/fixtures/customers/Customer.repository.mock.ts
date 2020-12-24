export const CustomerRepositoryMock = () => ({
  persist: () => ({
    save: jest.fn(),
  }),
  getCustomerById: jest.fn(),
  exists: jest.fn(),
  removeCustomer: jest.fn(),
  getRawCustomerById: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});
