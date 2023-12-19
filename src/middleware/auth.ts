import { defineMiddleware } from "astro/middleware";
import { Configuration, TokenApi, TokenRefreshFromJSON } from "../client";
import { setTokens } from "../utils/setTokens";

export const PUBLIC_ROUTES = ["/api/auth/login", "/login"];

export const auth = defineMiddleware(async (ctx, next) => {
  const { cookies, url } = ctx;
  if (PUBLIC_ROUTES.includes(url.pathname)) {
    return next();
  }

  if (cookies.get("refreshToken") === undefined) {
    return ctx.redirect("/login");
  }

  if (cookies.get("accessToken") === undefined) {
    const refreshToken = cookies.get("refreshToken");
    const tokenApi = new TokenApi(
      new Configuration({ basePath: import.meta.env.BASE_PATH })
    );
    const refresh = TokenRefreshFromJSON({ refresh: refreshToken!.value });
    const tokens = await tokenApi.tokenRefreshCreate({ tokenRefresh: refresh });

    setTokens(cookies, tokens);
  }

  return next();
});
