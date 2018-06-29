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
