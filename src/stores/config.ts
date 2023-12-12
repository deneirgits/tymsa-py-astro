import { readable } from "svelte/store";
import { Configuration } from "../client";

export const config = readable(new Configuration({
  basePath: "http://localhost:8000",
}));