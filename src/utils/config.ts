import fs from "fs";
import path from "path";

export const CONFIG_FILE =
  "iuuai.config.json";

export function createConfig() {
  const config = {
    componentsPath:
      "src/components/ui"
  };

  fs.writeFileSync(
    CONFIG_FILE,
    JSON.stringify(config, null, 2)
  );
}

export function getConfig() {
  const configPath = path.join(
    process.cwd(),
    CONFIG_FILE
  );

  if (!fs.existsSync(configPath)) {
    throw new Error(
      "Run iuuai init first."
    );
  }

  return JSON.parse(
    fs.readFileSync(configPath, "utf-8")
  );
}