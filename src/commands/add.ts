import { getManifest } from "../services/github.js";
import { installFiles } from "../services/installer.js";
import { getConfig } from "../utils/config";
import { ComponentManifest } from "../types/registry.js";

export async function addCommand(component: string) {
  const config = getConfig();
  const installed = new Set<string>();
  await installComponent(component, config.componentsPath, installed);
  console.log(`✓ ${component} installed`);
}

async function installComponent(
  component: string,
  destination: string,
  installed: Set<string>
) {
  if (installed.has(component)) return;
  installed.add(component);

  const manifest: ComponentManifest = await getManifest(component);

  for (const dep of manifest.registryDependencies || []) {
    await installComponent(dep, destination, installed);
  }

  await installFiles(component, manifest.files, destination);
}