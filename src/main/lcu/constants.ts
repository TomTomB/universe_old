const IS_WIN = process.platform === 'win32';

export const INSTALL_REGEX_WIN = /"--install-directory=(.*?)"/;
export const INSTALL_REGEX_MAC = /--install-directory=(.*?)( --|\n|$)/;
export const INSTALL_REGEX = IS_WIN ? INSTALL_REGEX_WIN : INSTALL_REGEX_MAC;

export const COMMAND =
  process.platform === 'win32'
    ? "WMIC PROCESS WHERE name='LeagueClientUx.exe' GET CommandLine"
    : "ps x -o args | grep 'LeagueClientUx'";
