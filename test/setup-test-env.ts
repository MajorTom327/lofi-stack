import { installGlobals } from "@remix-run/node";
import "@testing-library/jest-dom/extend-expect";
import dotenv from "dotenv";
import { vi } from "vitest";

dotenv.config({ path: "../test.env" });

installGlobals();

vi.mock("../app/db.server");
