import type { APIContext, APIRoute } from "astro";
import { TimersApi } from "../../../client";
import { getConfig } from "../../../utils/config";

export const GET: APIRoute = async ({ cookies }: APIContext) => {
  const timersApi = new TimersApi(getConfig(cookies));

  const timers = await timersApi.timersList({ endDatetimeDate: new Date() });

  return new Response(
    JSON.stringify({
      timers: timers,
    }),
  );
};
