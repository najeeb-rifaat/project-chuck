module.exports = (customersModel) => (request, reply) => {
  const tid = request.query['tid'];
  console.info('Processing test for tid', tid);

  const data = customersModel.getCustomer(tid);

  if (data) {
    //TODO: check if row have been consumed ? 
    reply(data);
  } else {
    reply('Not Found').code(404);
  }
};