import { getManifest }
  from "../services/github.js";

import { installFiles }
  from "../services/installer.js";

import { getConfig }
  from "../utils/config";

export async function addCommand(
  component: string
) {
  const config =
    getConfig();

  const manifest =
    await getManifest(component);

  await installFiles(
    component,
    manifest.files,
    config.componentsPath
  );

  console.log(
    `✓ ${component} installed`
  );
}