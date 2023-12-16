import type { AstroCookies } from "astro";
import { Configuration } from "../client";

export const getConfig = (cookies: AstroCookies) => {
  return new Configuration({ basePath: import.meta.env.BASE_PATH, accessToken: cookies.get("accessToken")!.value });
};