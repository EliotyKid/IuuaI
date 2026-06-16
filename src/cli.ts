#!/usr/bin/env node

import { Command } from "commander";
import { addCommand } from "./commands/add.js";

const program = new Command();

program.name("eliot-ui");

program
  .command("add")
  .argument("<components...>")
  .action(addCommand);

program.parse();