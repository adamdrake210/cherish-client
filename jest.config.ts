import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['**/src/**/**/*.js', '!**/src/config/**/*.js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};

export default config;
