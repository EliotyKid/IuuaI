import { createConfig }
  from "../utils/config";

export function initCommand() {
  createConfig();

  console.log(
    "✓ IuuaI initialized"
  );
}