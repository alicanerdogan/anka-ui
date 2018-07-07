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

export async function getTimeline(query: ITimelineExtendedQueryParams) {
  const resp = await fetch(
    `/api/timeline?${getQueryString({
      accessToken: query.accessToken,
      since_id: query.sinceId,
      max_id: query.maxId
    })}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const payload = await resp.json();
  return payload;
}

export async function getLikes(query: ITimelineExtendedQueryParams) {
  const resp = await fetch(
    `/api/likes?${getQueryString({
      accessToken: query.accessToken,
      since_id: query.sinceId,
      max_id: query.maxId
    })}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const payload = await resp.json();
  return payload;
}

export async function getLists(accessToken: string) {
  const resp = await fetch(
    `/api/lists?${getQueryString({
      accessToken
    })}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const payload = await resp.json();
  return payload;
}

export async function getList(listId: string, query: ITimelineExtendedQueryParams) {
  const resp = await fetch(
    `/api/lists/${listId}/?${getQueryString({
      accessToken: query.accessToken,
      since_id: query.sinceId,
      max_id: query.maxId
    })}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  const payload = await resp.json();
  return payload;
}
