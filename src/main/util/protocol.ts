import * as path from 'path';
import { Logger } from '.';

export const scheme = 'universe';

export const requestHandler = (
  request: Electron.ProtocolRequest,
  callback: (response: string | Electron.ProtocolResponse) => void
): void => {
  const url = request.url.substr(scheme.length + 3);

  Logger.verbose('Loading file', `${__dirname}/${url}`);

  callback({ path: path.normalize(`${__dirname}/${url}`) });
};
