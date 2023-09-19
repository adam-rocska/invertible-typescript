import {execSync} from "child_process";
import packageJson from "./package.json" assert {type: "json"};
import tsConfigJson from './tsconfig.json' assert {type: "json"};
import {pathsToModuleNameMapper} from "ts-jest";

let moduleNameMapper;
let modulePathIgnorePatterns;

// TODO: bring back the "TEST_AGAINST_ARTIFACTS" feature
moduleNameMapper = Object.fromEntries(
  Object.entries(pathsToModuleNameMapper(tsConfigJson.compilerOptions.paths))
    .map(([from, to]) => [
      [from, to],
      [
        '^#' + from.split('/').pop().replace('$', '/(.*)$'),
        to.replace('index.ts', '$1')
      ]
    ])
    .reduce((a,b) => a.concat(b))
    .map(([from, to]) => [from, `<rootDir>/${to}`])
    .sort()
);
modulePathIgnorePatterns = [
  "dist"
];

export default {
  testEnvironment: `node`,
  setupFilesAfterEnv: [`<rootDir>/test/expect.ts`],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/test/'],
  coverageReporters: ['text', 'html'],
  moduleNameMapper,
  modulePathIgnorePatterns,
};
