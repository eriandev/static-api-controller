import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods';

declare namespace NodeJS {
  export interface ProcessEnv {
    [key: string]: string;
  }
}

export declare type Repo = RestEndpointMethodTypes['repos']['listForUser']['response']['data'][0];
