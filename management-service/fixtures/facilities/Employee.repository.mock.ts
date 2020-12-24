export const EmployeeRepositoryMock = () => ({
  exists: jest.fn(),
  getEmployeeById: jest.fn(),
  getRawEmployeeById: jest.fn(),
  persist: jest.fn(),
});
