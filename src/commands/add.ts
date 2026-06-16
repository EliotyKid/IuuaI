import fs from "fs-extra";
import path from "path";
import { execa } from "execa";

const OWNER = "eliot";
const REPO = "IuuaI-Components";
const BRANCH = "main";

export async function addCommand(components: string[]) {
  for (const component of components) {
    await installComponent(component);
  }
}

async function installComponent(component: string) {
  console.log(`Instalando ${component}`);

  const registryUrl =
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/registry/${component}.json`;

  const registry = await fetch(registryUrl)
    .then(r => r.json());

  const targetDir =
    path.join(process.cwd(), "src/components/ui");

  await fs.ensureDir(targetDir);

  for (const file of registry.files) {
    const fileUrl =
      `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/components/${component}/${file}`;

    const content =
      await fetch(fileUrl).then(r => r.text());

    await fs.writeFile(
      path.join(targetDir, file),
      content
    );
  }

  await installDependencies(
    registry.dependencies
  );
}



async function installDependencies(
  deps: string[]
) {
  if (!deps?.length) return;

  await execa(
    "npm",
    ["install", ...deps],
    {
      stdio: "inherit"
    }
  );
}