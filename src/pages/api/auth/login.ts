import type { APIRoute } from "astro";
import { Configuration, TokenApi, TokenObtainPairFromJSON } from "../../../client";
import { setTokens } from "../../../utils/setTokens";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const data = await request.formData();
  const username = data.get("username");
  const password = data.get("password");

  if (!username || !password) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  const tokenApi = new TokenApi(
    new Configuration({ basePath: import.meta.env.BASE_PATH })
  );
  const creds = TokenObtainPairFromJSON({ "username": username, "password": password });

  try {
    const tokens = await tokenApi.tokenCreate({ tokenObtainPair: creds });
    setTokens(cookies, tokens);
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Invalid username/password" }),
      { status: 400 }
    );
  }

  return redirect("/");
};