import fs from "fs/promises";
import path from "path";

import { getFile }
  from "./github.js";

export async function installFiles(
  component: string,
  files: string[],
  destination: string
) {
  const targetDir =
    path.join(destination, component);

  await fs.mkdir(
    targetDir,
    { recursive: true }
  );

  for (const file of files) {
    const content =
      await getFile(
        component,
        file
      );

    await fs.writeFile(
      path.join(targetDir, file),
      content
    );
  }
}