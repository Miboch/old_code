module.exports = {
  validate: (object, expectedKeys) => {
    let actualKeys = Object.keys(object);
    propTest = actualKeys.reduce((valid, key) => {
      let test = expectedKeys.some(exKey => exKey === key);
      if (!test) return false;
      return true;
    }, true);
    return propTest && actualKeys.length == expectedKeys.length;
  },
  success: response => {
    response.status(200).send({ message: 'Ok' });
  },
  invalidObject: response => {
    response.status(400).send({ message: 'Malformed Request: Request body did not match expected properties' });
  },
  invalidId: response => {
    response.status(500).send({ message: 'Could not find any row matching the provided Id' });
  }
};
