import {readFileSync} from 'fs';
import {join, dirname} from 'path';
import {execSync} from 'child_process';
import {prerelease, inc} from 'semver';
import {fileURLToPath} from 'url';

// TODO: review this code :) Took it from SWR

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageJsonPath = join(__dirname, `../package.json`);
const packageJsonData = readFileSync(packageJsonPath, `utf8`);
const packageJson = JSON.parse(packageJsonData);

let version = packageJson.version;
const releaseType = process.env.RELEASE_TYPE || `beta`;
const semverType = process.env.SEMVER_TYPE;

function bumpVersion(version) {
  if (process.env.DRY_RUN) {
    console.log(`npm version ${version}`);
  } else {
    try {
      execSync(`npm version ${version}`, { stdio: `inherit` });
    } catch (error) {
      console.error(`Failed to execute npm version:`, error);
      process.exit(1);
    }
  }
}

if (releaseType === `beta`) {
  if (prerelease(version)) {
    version = inc(version, `prerelease`);
  } else {
    version = inc(version, `prepatch`, `beta`);
  }
} else if (releaseType === `stable`) {
  if (!semverType) {
    console.error(`Missing semver type. Expected "patch", "minor" or "major".`);
    process.exit(1);
  }
  version = inc(version, semverType);
} else {
  console.error(`Invalid release type. Expected "beta" or "stable".`);
  process.exit(1);
}

bumpVersion(version);
