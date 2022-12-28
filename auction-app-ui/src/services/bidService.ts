import { createBidRequest } from 'requestModels/createBidRequest';

import agent from 'lib/agent';
import { BidWithProduct } from 'models/bidWithProduct';

const BASE_URL = '/bids';

const bidService = {
  getHighestBid: (productId: string) =>
    agent.get<number>(`${BASE_URL}/product/${productId}`),
  addBid: (createBidRequest: createBidRequest) =>
    agent.post(BASE_URL, createBidRequest),
  getBidsForUser: () => 
    agent.get<BidWithProduct[]>(`${BASE_URL}/user-bids`)
};

export default bidService;
