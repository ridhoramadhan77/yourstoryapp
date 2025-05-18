import CONFIG from '../config';
import { getAccessToken } from '../utils/auth';

const ENDPOINTS = {
  // DIBAWAH INI ADALAH ENDPOINT YANG HARUS DIIKUTI\

  // ENDPOINT: `${CONFIG.BASE_URL}/your/endpoint/here`,

  // DIATAS INI ADALAH ENDPOINT YANG HARUS DIIKUTI

  // Auth
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  MY_USER_INFO: `${CONFIG.BASE_URL}/users/me`,

  //Story
  STORY_LIST: `${CONFIG.BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  STORE_NEW_STORY: `${CONFIG.BASE_URL}/stories`,

  // Subscribe
  SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
  UNSUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`
};

export async function getRegistered({ name, email, password }) {
  const data = JSON.stringify({ name, email, password });

  const fetchResponse = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getLogin({ email, password }) {
  const data = JSON.stringify({ email, password });

  const fetchResponse = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getMyUserInfo() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.MY_USER_INFO, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getAllReports() {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORY_LIST, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function getReportById(id) {
  const accessToken = getAccessToken();

  const fetchResponse = await fetch(ENDPOINTS.STORY_DETAIL(id), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function storeNewReport({
  description,
  photo,
  lat,
  lon,
}) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.set('description', description);
  formData.set('photo', photo);
  if (lat !== undefined) formData.set('lat', lat);
  if (lon !== undefined) formData.set('lon', lon);

  const fetchResponse = await fetch(ENDPOINTS.STORE_NEW_STORY, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  const json = await fetchResponse.json();

  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

export async function subscribePushNotification({ endpoint, keys: { p256dh, auth } }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({
    endpoint,
    keys: { p256dh, auth },
  });
 
  const fetchResponse = await fetch(ENDPOINTS.SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();
 
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}
 
export async function unsubscribePushNotification({ endpoint }) {
  const accessToken = getAccessToken();
  const data = JSON.stringify({ endpoint });
 
  const fetchResponse = await fetch(ENDPOINTS.UNSUBSCRIBE, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });
  const json = await fetchResponse.json();
 
  return {
    ...json,
    ok: fetchResponse.ok,
  };
}

// export async function getData() {
//   const fetchResponse = await fetch(ENDPOINTS.ENDPOINT);
//   return await fetchResponse.json();
// }