import { AuthToken } from '@openlab/deconf-shared';

/** An AuthToken with it's raw `iat` (creation timestamp) and `iss` (issuer) */
export interface FullAuthToken extends AuthToken {
  iat: number;
  iss: string;
}
