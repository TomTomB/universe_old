import { LCU } from '../../types';
import LCUConnector from './lcu-connector';

describe('LCUConnector', () => {
  const mockLockfile = 'LeagueClient:20604:53760:WfnHDZbypfJtopD6NA9vUw:https';
  const mockCredentials: LCU.Credentials = {
    username: 'riot',
    process: 'LeagueClient',
    address: '127.0.0.1',
    PID: 20604,
    port: 53760,
    password: 'WfnHDZbypfJtopD6NA9vUw',
    protocol: 'https',
  };

  it('should get created', () => {
    expect(new LCUConnector()).toBeTruthy();
  });

  describe('decryptLockfile', () => {
    it('should return a valid LCU credentials object if the input is valid', () => {
      expect(new LCUConnector().decryptLockfile(mockLockfile)).toMatchObject(
        mockCredentials
      );
    });

    it('should return null if the input is invalid', () => {
      expect(new LCUConnector().decryptLockfile('abc:test')).toBe(null);
    });
  });
});
