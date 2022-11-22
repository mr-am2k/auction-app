import { createBidRequest } from 'requestModels/createBidRequest';

import agent from 'lib/agent';

const BASE_URL = '/bids';

const bidService = {
  getHighestBid: (productId: string) =>
    agent.get<number[]>(`${BASE_URL}/product/${productId}`),
  addBid: (createBidRequest: createBidRequest) =>
    agent.post(BASE_URL, createBidRequest),
};

export default bidService;
