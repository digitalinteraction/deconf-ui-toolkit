/** Decode a base64 JWT */
export function decodeJwt(token: string) {
  return JSON.parse(window.atob(token.split('.')[1]));
}
