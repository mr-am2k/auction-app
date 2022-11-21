import { requestBid } from 'requestModels/requestBid';

import agent from 'lib/agent';

const BASE_URL = '/bids';

const bidService = {
  getHighestBid: (productId: string) =>
    agent.get<number>(`${BASE_URL}/product/${productId}`),
  addBid: (createBidRequest: requestBid) =>
    agent.post(BASE_URL, createBidRequest),
};

export default bidService;
