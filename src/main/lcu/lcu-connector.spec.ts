import { mockCredentials, mockLockfile } from '@universe/mocks/lcu';
import LCUConnector from './lcu-connector';

describe('LCUConnector', () => {
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
