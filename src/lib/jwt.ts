/** Decode a base64 JWT */
export function decodeJwt(token: string): unknown {
  return JSON.parse(window.atob(token.split('.')[1]));
}
