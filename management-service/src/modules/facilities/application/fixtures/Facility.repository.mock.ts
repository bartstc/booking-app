export const FacilityRepositoryMock = () => ({
  exists: jest.fn(),
  slugExists: jest.fn(),
  getFacilityById: jest.fn(),
  persist: jest.fn(),
  deleteFacility: jest.fn(),
  getRawFacilityById: jest.fn(),
  getRawFacilityBySlug: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
});
