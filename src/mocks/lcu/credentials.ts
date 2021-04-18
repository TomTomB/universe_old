import { Credentials } from '@universe/types/lcu';

export const mockLockfile =
  'LeagueClient:20604:53760:WfnHDZbypfJtopD6NA9vUw:https';

export const mockCredentials: Credentials = {
  username: 'riot',
  process: 'LeagueClient',
  address: '127.0.0.1',
  PID: 20604,
  port: 53760,
  password: 'WfnHDZbypfJtopD6NA9vUw',
  protocol: 'https',
};
