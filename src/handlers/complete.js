module.exports = (customersModel) => (request, reply) => {
  const tid = request.query['tid'];
  const first_name = request.query['fname'];
  const last_name = request.query['lname'];
  const tel_number = request.query['tel'];
  const salary = request.query['salary'];
  const product = request.query['product'];
  const time = request.query['time'];

  const data = customersModel.getCustomer(tid);

  if (data) {
    const success = 
      customersModel.setCustomer(tid, { first_name, last_name, tel_number, salary, time, product });
    if (success) {
      reply('Success').code(202);
    } else {
      reply('Error').code(500);
    }
  } else {
    reply('Not Found').code(404);
  }
};