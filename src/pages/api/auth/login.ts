import type { APIRoute } from "astro";
import { Configuration, TokenApi, TokenObtainPairFromJSON } from "../../../client";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (!username || !password) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  const tokenApi = new TokenApi(
    new Configuration({ basePath: import.meta.env.BASE_PATH })
  );
  const creds = TokenObtainPairFromJSON({ "username": username, "password": password });
  const tokens = await tokenApi.tokenCreate({ tokenObtainPair: creds });

  cookies.set("accessToken", tokens.access, { httpOnly: true, maxAge: 60 * 5, path: "/" });
  cookies.set("refreshToken", tokens.refresh, { httpOnly: true, maxAge: 60 * 60 * 24, path: "/" });

  return redirect("/");
};