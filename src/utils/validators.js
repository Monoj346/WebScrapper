// src/utils/validators.js
export function isValidUrl(input) {
  try {
    const u = new URL(input);
    if (!/^https?:$/.test(u.protocol)) return false;
    if (!u.hostname || u.hostname.includes(" ")) return false;
    return true;
  } catch {
    return false;
  }
}


export function normalizeUrl(input) {
  try {

    new URL(input);
    return input;
  } catch {
    return `https://${input}`;
  }
}
