const { gitDescribeSync } = require('git-describe');
const { writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');

const gitInfo = gitDescribeSync();
const versionInfoJson = JSON.stringify(gitInfo, null, 2);

if (!existsSync(path.join(__dirname, '../intermediate'))) {
  mkdirSync(path.join(__dirname, '../intermediate'));
}

writeFileSync(
  path.join(__dirname, '../intermediate/git-version.json'),
  versionInfoJson
);
