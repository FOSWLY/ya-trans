import { $ } from "bun";

import { name } from "../package.json";
import { generateTypebox } from "./typebox-gen";

async function build() {
  console.log(`Building ${name}...`);
  $.cwd("./");
  await $`rm -rf dist`;
  await $`tsc --project tsconfig.build.json --outdir ./dist && tsc-alias -p tsconfig.build.json && tsc-esm-fix --tsconfig tsconfig.build.json`;
  await generateTypebox("./");
  $.cwd("./");
}

await build();
