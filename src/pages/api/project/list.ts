import type { APIContext, APIRoute } from "astro";
import { ProjectsApi } from "../../../client";
import { getConfig } from "../../../utils/config";

export const GET: APIRoute = async ({ cookies }: APIContext) => {
  const projectsApi = new ProjectsApi(getConfig(cookies));
  const projects = await projectsApi.projectsList();

  return new Response(
    JSON.stringify({
      projects: projects,
    }),
  );
};
