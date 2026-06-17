#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init";
import { addCommand } from "./commands/add";

const program = new Command();

program
  .name("iuuai")
  .description("IuuaI CLI");

program
  .command("init")
  .description("Initialize project")
  .action(initCommand);

program
  .command("add")
  .description("Add component")
  .argument("<component>")
  .action(addCommand);

program.parse();