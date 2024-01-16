
import type { APIContext, APIRoute } from "astro";
import { TimersApi, type TimerUpdate } from "../../../client";
import { getConfig } from "../../../utils/config";

export const POST: APIRoute = async ({ request, cookies }: APIContext) => {
  const form = await request.formData(),
    timerId = form.get("timerId"),
    datetime = new Date(form.get("datetime") as string),
    data = {
      id: timerId as string,
      patchedTimerUpdate: {
        startDatetime: datetime
      }
    };

  const timersApi = new TimersApi(getConfig(cookies));

  try {
    const timer = await timersApi.timersEdit(data);

    return new Response(
      JSON.stringify({
        timer: timer,
      }),
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: "Invalid value"
      }),
    );

  }
}

