module.exports = (customersModel) => (request, reply) => {
  const tid = request.query['tid'];
  console.info('Processing complete for tid', tid);

  const firstName = request.query['firstName'];
  const lastName = request.query['lastName'];
  const phoneNumber = request.query['phoneNumber'];
  const salary = request.query['salary'];
  const product = request.query['product'];
  const time = request.query['time'];

  const data = customersModel.getCustomer(tid);

  if (data) {
    const success = 
      customersModel.setCustomer(tid, { firstName, lastName, phoneNumber, salary, time, product });
    if (success) {
      reply('Success').code(202);
    } else {
      reply('Error').code(500);
    }
  } else {
    reply('Not Found').code(404);
  }
};