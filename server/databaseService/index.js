const {createConnection } = require('./service');
const startDB = async () => {
  await createConnection();
}