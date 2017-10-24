module.exports = (customersModel) => (request, reply) => {
  const tid = request.query['tid'];
  console.info('Processing delete for tid', tid);

  const data = customersModel.getCustomer(tid);

  if (data) {
    //TODO: check if row can be deleted ? 
    if(customersModel.deleteCustomer(tid)) {
      reply('OK');
    } else {
      reply('BAD_INPUT').status(400);
    }
  } else {
    reply('Not Found').code(404);
  }
};