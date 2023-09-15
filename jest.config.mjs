import {execSync} from "child_process";
import packageJson from "./package.json" assert {type: "json"};

let moduleNameMapper;

if (process.env.TEST_AGAINST_ARTIFACTS) {
  execSync(`npm run clean`);
  execSync(`npm run build`);
} else {
  // Yes, I know there is ts-jest and its brilliant pathsToModuleNameMapper, but package.json based assures more
  moduleNameMapper = Object.fromEntries(
    Object
      .entries(packageJson.exports)
      .filter(([name, entry]) => typeof entry.import === 'string')
      .map(([name, entry]) => [
        `^` + name.replace(/^./, `@21gram-consulting/invertible`) + `$`,
        entry
          .import
          .replace(/^.\/lib\//, `<rootDir>/src/`)
          .replace(/\.[mc]{0,1}js$/, `.ts`)
      ])
      .map(([from, to]) => [
        [from, to],
        [
          '^#' + from.split('/').pop().replace('$', '/(.*)$'),
          to.replace('index.ts', '$1')
        ]
      ])
      .reduce((a,b) => a.concat(b))
      .sort()
  )
}

export default {
  testEnvironment: `node`,
  setupFilesAfterEnv: [`<rootDir>/test/expect.ts`],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  moduleNameMapper
};
