import path from 'path';
import rimraf from 'rimraf';

export default function deleteSourceMaps() {
  rimraf.sync(path.join(__dirname, '../intermediate/dist/*.js.map'));
  rimraf.sync(path.join(__dirname, '../intermediate/*.js.map'));
}
