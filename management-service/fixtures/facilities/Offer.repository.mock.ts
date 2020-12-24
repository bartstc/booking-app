export const OfferRepositoryMock = () => ({
  exists: jest.fn(),
  getOfferById: jest.fn(),
  getRawOfferById: jest.fn(),
  persist: jest.fn(),
});
