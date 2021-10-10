const path = require("path");
const fsPromises = require("fs/promises");

/** 运行在 build 之前 */

const dirname = path.dirname;
const resolve = path.resolve;
const readFile = fsPromises.readFile;
const writeFile = fsPromises.writeFile;

async function getVersionInfo() {
  const content = await readFile("package.json", {
    encoding: "utf8",
  });

  const packageMetadata = JSON.parse(content);

  const packageName = packageMetadata.name ?? "unknownPackageName";
  const packageDescription = packageMetadata.description?.trim() ?? "";
  const version = packageMetadata.version ?? "unknownVersion";
  const now = new Date();
  const builtTimestamp = now.valueOf();
  const builtAt = now.toLocaleDateString() + " " + now.toLocaleTimeString();
  const gitHEAD = await readFile(".git/HEAD", {
    encoding: "utf-8",
  }).then(s => s.trim());
  const refsPath = gitHEAD.split(" ")[1].split("/");
  const commitSha1 = await readFile(resolve(dirname("."), ".git", ...refsPath), {
    encoding: "utf-8",
  }).then(s => s.trim());

  const versionInfo = {
    packageName,
    packageDescription,
    version,
    builtTimestamp,
    builtAt,
    gitHEAD,
    commitSha1,
  };

  return versionInfo;
}

/** 获取 versionInfo 导出路径，如果没有，则返回 undefined */
function retriveDumpPath() {
  const argv = process.argv;
  const expects = [ "--dump" ];
  for (let i = 0; i < argv.length; i++) {
    for (const expect of expects) {
      if (argv[i] === expect && (i+1) < argv.length) {
        return argv[i+1];
      }
    }
  }

  return undefined;
}

async function main() {
  const versionInfo = await getVersionInfo();

  const dumpPath = retriveDumpPath();
  if (!!dumpPath) {
    await writeFile(dumpPath, JSON.stringify(versionInfo));
  }
}

main();
