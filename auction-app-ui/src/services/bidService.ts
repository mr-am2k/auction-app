import { createBidRequest } from 'requestModels/create/createBidRequest';

import agent from 'lib/agent';
import { Bid } from 'models/bid';

const BASE_URL = '/bids';

const bidService = {
  getHighestBid: (productId: string) =>
    agent.get<number>(`${BASE_URL}/product/${productId}`),
  addBid: (createBidRequest: createBidRequest) =>
    agent.post(BASE_URL, createBidRequest),
  getUserBids: (userId: string) => 
    agent.get<Bid[]>(`${BASE_URL}/user/${userId}`)
};

export default bidService;
