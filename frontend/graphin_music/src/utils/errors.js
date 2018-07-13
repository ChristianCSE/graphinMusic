export const genericActionError = (err, action) => {
  console.log('\nERROR: \n', err);
  console.log('\n ERROR\'D ACTION: \n', action);
  return;
};