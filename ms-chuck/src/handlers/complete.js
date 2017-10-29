module.exports = (customersModel) => (request, reply) => {
  const trackingId = request.params.trackingId;
  const campaignId = request.params.campaignId;

  console.info(`Processing /complete for tracking ${trackingId} and campaign ${campaignId}`);

  return customersModel.registerDetails(trackingId, campaignId, request.payload)
  .then(result => {
    if (result) {
      reply(result).code(202);
    } else {
      reply('Not Found').code(404);
    }
  });
};