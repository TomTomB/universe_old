/**
 * @type Array<{
 *  id: string;
 *  name: string;
 *  roles: string[]
 * }>
 */
let users = [
  { id: 'asdassds', name: 'Linus', roles: ['admin', 'bäcker'] },
  { id: 'asdassds', name: 'Tom', roles: ['bäcker'] }
];

const theFirstAdminUser = users.filter((u) => u.roles.includes('admin'))
const theFirstAdminUser = findFirst((u) => u.roles.includes('admin'))



function findFirst(p, predicate) {
  return p.find(predicate);
}


// Todo

const adminArr = ['admin', 'admin', 'admin', 'gans'];


