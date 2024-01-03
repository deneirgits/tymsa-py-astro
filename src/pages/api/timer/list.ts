import type { APIContext, APIRoute } from "astro";
import { TimersApi } from "../../../client";
import { getConfig } from "../../../utils/config";

export const GET: APIRoute = async ({ request, cookies }: APIContext) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const endDate = params.get("end_datetime__gte");
  console.log(endDate, new Date(endDate!), new Date());

  const timersApi = new TimersApi(getConfig(cookies));

  const timers = await timersApi.timersList({ endDatetimeGte: new Date(endDate!) });

  return new Response(
    JSON.stringify({
      timers: timers,
    }),
  );
};
