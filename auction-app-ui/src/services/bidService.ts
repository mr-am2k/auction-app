import agent from 'lib/agent';

const bidService = {
    getHighestBid: (productId:string) => agent.get<number>(`/bid/product/${productId}`)
  };

export default bidService