
import type { APIContext, APIRoute } from "astro";
import { TimersApi } from "../../../client";
import { getConfig } from "../../../utils/config";

export const POST: APIRoute = async ({ request, cookies }: APIContext) => {
  const data = await request.formData();
  const id = data.get("id");
  const note = data.get("note");

  const timersApi = new TimersApi(getConfig(cookies));
  const timer = await timersApi.timersEdit({ id: id as string, patchedTimerUpdate: { note: note as string } });

  return new Response(
    JSON.stringify({
      timer: timer
    }),
  );
};