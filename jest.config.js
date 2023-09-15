import {execSync} from "child_process";
import packageJson from "./package.json" assert {type: "json"};

let moduleNameMapper;

if (process.env.TEST_AGAINST_ARTIFACTS) {
  execSync(`npm run clean`);
  execSync(`npm run build`);
} else {
  moduleNameMapper = Object.fromEntries(
    Object
      .entries(packageJson.exports)
      .map(([name, entry]) => [
        `^` + name.replace(/^./, `@21gram-consulting/invertible`) + `$`,
        entry
          .import
          .replace(/^.\/lib\//, `<rootDir>`)
          .replace(/\.js$/, `.ts`)
      ])
  )
}

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: `node`,
  setupFilesAfterEnv: [`<rootDir>/test/expect.ts`],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  moduleNameMapper
};
