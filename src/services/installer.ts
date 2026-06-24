import fs from "fs/promises";
import path from "path";

import { getFile }
  from "./github.js";

import type { ComponentManifest } from "../types/registry.js";

export async function installFiles(
  component: string,
  manifest: ComponentManifest,
  destination: string
) {
  const targetDir =
    path.join(destination, component);

  await fs.mkdir(
    targetDir,
    { recursive: true }
  );

  for (const file of manifest.files) {
    const normalizedFile = file.replace(/^\.\//, '');
    const fileDir = path.dirname(normalizedFile);

    if (fileDir) {
      await fs.mkdir(path.join(targetDir, fileDir), { recursive: true });
    }

    const content =
      await getFile(
        component,
        file
      );

    await fs.writeFile(
      path.join(targetDir, normalizedFile),
      content
    );
  }

  for (const [subName, files] of Object.entries(manifest.components || {})) {
    const subDir = path.join(targetDir, "components", subName);
    await fs.mkdir(subDir, { recursive: true });

    for (const file of files) {
      const normalizedFile = file.replace(/^\.\//, '');
      const content = await getFile(component, `components/${subName}/${file}`);

      await fs.writeFile(
        path.join(subDir, normalizedFile),
        content
      );
    }
  }
}