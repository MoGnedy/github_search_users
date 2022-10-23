module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/test/**/*.(test).(js|ts)"],
  testEnvironmentOptions: {
    url:"http://localhost/"
  },
  verbose: true,
};
