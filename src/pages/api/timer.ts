import type { APIContext, APIRoute } from "astro";
import { Configuration, TimersApi } from "../../client";

export const GET: APIRoute = async ({ cookies }: APIContext) => {
  const timersApi = new TimersApi(
    new Configuration({ basePath: "http://127.0.0.1:8000", accessToken: cookies.get("accessToken")!.value })
  );

  const timer = await timersApi.timersRetrieve({ id: 2 });

  return new Response(
    JSON.stringify({
      timer: timer,
    }),
  );
};