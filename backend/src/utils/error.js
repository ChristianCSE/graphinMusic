//I need to make middleware or some generic error catcher
const genericError = (err, methodName, res) => {
  console.error(`ERROR ${methodName}`, err);
  return res.json({"ERROR" : err});
};

module.exports = {
  genericError
};