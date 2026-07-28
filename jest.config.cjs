const config = {
   testEnvironment: 'jsdom',
  roots: ['<rootDir>/'], 
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(css|scss)$': '<rootDir>/jest-css-transform.js',
    '^.+\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/jest-file-transform.js'
  },
};

module.exports = config;