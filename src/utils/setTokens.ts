import type { AstroCookies } from "astro";
import type { TokenObtainPair, TokenRefresh } from "../client";

export function setTokens(cookies: AstroCookies, tokens: TokenObtainPair | TokenRefresh) {
  cookies.set("accessToken", tokens.access, { httpOnly: true, maxAge: 60 * 5, path: "/" });
  cookies.set("refreshToken", tokens.refresh, { httpOnly: true, maxAge: 60 * 60 * 24, path: "/" });
}