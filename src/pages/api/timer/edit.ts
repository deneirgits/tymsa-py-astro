
import type { APIContext, APIRoute } from "astro";
import { TimersApi } from "../../../client";
import { getConfig } from "../../../utils/config";

export const POST: APIRoute = async ({ request, cookies }: APIContext) => {
  const form = await request.formData();
  const id = form.get("id");
  const project = cleanProject(form.get("project"));
  const note = form.get("note");
  const data = {
    id: id as string,
    patchedTimerUpdate: {
      project: project,
      note: note as string
    }
  };

  const timersApi = new TimersApi(getConfig(cookies));
  const timer = await timersApi.timersEdit(data);

  return new Response(
    JSON.stringify({
      timer: timer
    }),
  );
};

function cleanProject(project: FormDataEntryValue | null) {
  switch (project) {
    case null:
    case "0":
      return null;
    default:
      return Number(project);
  }
}