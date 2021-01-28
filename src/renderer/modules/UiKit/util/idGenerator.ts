import shortid from 'shortid';

const generateId = () => {
  return `_${shortid()}`;
};

export default generateId;
