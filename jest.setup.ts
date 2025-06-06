import '@testing-library/jest-dom';

// No need to declare MockedFunction as it's already defined in @types/jest

// Mock fetch globally
global.fetch = jest.fn();
