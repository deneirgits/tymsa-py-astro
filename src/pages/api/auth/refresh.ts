import type { APIRoute } from "astro";
import { Configuration, TokenApi, TokenRefreshFromJSON } from "../../../client";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const refreshToken = cookies.get("refreshToken");

  if (refreshToken == undefined) {
    return redirect("/login");
  }

  const tokenApi = new TokenApi(
    new Configuration({ basePath: "http://127.0.0.1:8000" })
  );
  const refresh = TokenRefreshFromJSON({ refresh: refreshToken.value });
  const tokens = await tokenApi.tokenRefreshCreate({ tokenRefresh: refresh });

  cookies.set("accessToken", tokens.access, { httpOnly: true, maxAge: 60 * 5, path: "/" });
  cookies.set("refreshToken", tokens.refresh, { httpOnly: true, maxAge: 60 * 60 * 24, path: "/" });

  return redirect("/");
};