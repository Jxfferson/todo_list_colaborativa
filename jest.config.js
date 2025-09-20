// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',   // para JSX
    '^.+\\.tsx?$': 'ts-jest'       // si usas TS
  },
  moduleNameMapper: {
    '^react-router-dom$': '<rootDir>/node_modules/react-router-dom'
  }
};
