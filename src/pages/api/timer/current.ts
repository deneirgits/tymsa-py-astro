import type { APIContext, APIRoute } from "astro";
import { TimersApi } from "../../../client";
import { getConfig } from "../../../utils/config";

export const GET: APIRoute = async ({ cookies }: APIContext) => {
  const timersApi = new TimersApi(getConfig(cookies));
  const timer = await timersApi.timersCurrentRetrieve();

  return new Response(
    JSON.stringify({
      timer: timer,
    }),
  );
};

export const POST: APIRoute = async ({ cookies }: APIContext) => {
  const timersApi = new TimersApi(getConfig(cookies));

  await timersApi.timersCurrentNew();

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
  );
};