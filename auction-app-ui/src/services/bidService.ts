import { createBidRequest } from 'models/request/create/createBidRequest';

import agent from 'lib/agent';
import { Bid } from 'models/bid';

const bidService = {
  getHighestBid: (productId: string) =>
    agent.get<number>(`/product/${productId}/bids/highest`),
  addBid: (createBidRequest: createBidRequest, productId: string) =>
    agent.post(`/product/${productId}/bids`, createBidRequest),
  getUserBids: (userId: string) =>
    agent.get<Bid[]>(`/user/${userId}/bids`),
  getProductBids: (productId: string, params: {}) =>
    agent.get<any>(`product/${productId}/bids`, params),
};

export default bidService;
