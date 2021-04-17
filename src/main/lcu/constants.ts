export const isWindows = process?.platform === 'win32';

export const INSTALL_REGEX_WIN = /"--install-directory=(.*?)"/;
export const INSTALL_REGEX_MAC = /--install-directory=(.*?)( --|\n|$)/;
export const INSTALL_REGEX = isWindows ? INSTALL_REGEX_WIN : INSTALL_REGEX_MAC;

export const COMMAND = isWindows
  ? "WMIC PROCESS WHERE name='LeagueClientUx.exe' GET CommandLine"
  : "ps x -o args | grep 'LeagueClientUx'";
