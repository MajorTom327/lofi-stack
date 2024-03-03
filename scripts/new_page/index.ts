#!/usr/bin/env bun
import { generate_page } from "./generate_page";
import { get_config } from "./get_config";

const config = get_config();

// @ts-expect-error This is a bun script this work fine
await generate_page(config);
