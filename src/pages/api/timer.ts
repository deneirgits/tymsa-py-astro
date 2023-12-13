import type { APIContext, APIRoute } from "astro";
import { Configuration, TimersApi } from "../../client";

export const GET: APIRoute = async ({ cookies }: APIContext) => {
  const timersApi = new TimersApi(
    new Configuration({ basePath: import.meta.env.BASE_PATH, accessToken: cookies.get("accessToken")!.value })
  );

  const timer = await timersApi.timersCurrentRetrieve();

  return new Response(
    JSON.stringify({
      timer: timer,
    }),
  );
};

export const POST: APIRoute = async ({ cookies }: APIContext) => {
  const timersApi = new TimersApi(
    new Configuration({ basePath: import.meta.env.BASE_PATH, accessToken: cookies.get("accessToken")!.value })
  );
  await timersApi.timersCurrentStop();

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
  );
};