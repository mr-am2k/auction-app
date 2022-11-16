import agent from 'lib/agent';

const bidService = {
    getHighestBid: (productId:string) => agent.get<number>(`/bid/${productId}`)
  };

export default bidService