const config = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  testMatch: ["**/__tests__/**/*.test.js?(x)"],

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"
  },

  moduleNameMapper: {
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.css$": "<rootDir>/__mocks__/styleMock.js"
  }
};

module.exports = config;
