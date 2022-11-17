import agent from 'lib/agent';

const BASE_URL = '/bids';

const bidService = {
  getHighestBid: (productId: string) =>
    agent.get<number>(`${BASE_URL}/product/${productId}`),
};

export default bidService;
