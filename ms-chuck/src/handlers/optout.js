module.exports = (customersModel) => (request, reply) => {
  const trackingId  = request.query['tid'];
  console.info('Processing delete for tracking id', trackingId);

  const data = customersModel.getCustomer(trackingId);

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