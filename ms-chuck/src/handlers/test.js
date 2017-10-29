module.exports = (customersModel) => (request, reply) => {
  const trackingId = request.params.trackingId;
  const campaignId = request.params.campaignId;

  console.info(`Processing /test for tracking ${trackingId} and campaign ${campaignId}`);

  return customersModel.registerInterest(trackingId, campaignId)
  .then(data => reply(data).code(202));
};