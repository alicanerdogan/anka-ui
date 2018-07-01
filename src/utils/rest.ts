import { getQueryString } from "./url";

export async function getRequestToken() {
  const resp = await fetch("/api/request_token");
  const text = await resp.text();
  return text;
}

export async function getAccessToken(
  oauth_token: string,
  oauth_verifier: string
) {
  const resp = await fetch("/api/access_token", {
    method: "POST",
    body: JSON.stringify({
      oauth_token,
      oauth_verifier
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const text = await resp.text();
  return text;
}

export async function getTimeline(query: {
  accessToken: string;
  since_id?: string;
  max_id?: string;
}) {
  const resp = await fetch(`/api/timeline?${getQueryString(query)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const payload = await resp.json();
  return payload;
}
