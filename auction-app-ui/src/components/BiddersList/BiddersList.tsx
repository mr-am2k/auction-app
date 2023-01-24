import { useEffect, useState } from 'react';

import bidService from 'services/bidService';
import userService from 'services/userService';

import Splitter from 'components/splitter/Splitter';
import { Bidders } from 'models/bidders';
import { Bid } from 'models/bid';
import userImage from 'assets/images/user.png';
import { getDateString } from 'util/dateUtils';
import { BIDDER_LIST } from 'translation/en';

import './bidders-list.scss';

import classNames from 'classnames';

type Props = {
  children?: React.ReactNode;
  productId: string;
};

const BiddersList: React.FC<Props> = ({ productId }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [bidders, setBidders] = useState<Bidders[]>([]);

  const getUsers = async (params: {}) => {
    let fetchedBids: Bid[] = [];
    let bids: any;

    bidService
      .getProductBids(productId, { params })
      .then(bidsPage => {
        bids = bidsPage;
        fetchedBids = bidsPage.content;

        const userPromises = fetchedBids.map(bid => userService.getUser(bid.userId));

        return Promise.all(userPromises);
      })
      .then(users => {
        const newBidders = users.map((user, index) => {
          const fetchedBid = fetchedBids[index];

          return {
            profileImageUrl: user.profileImageUrl,
            firstName: user.firstName,
            lastName: user.lastName,
            creationDateTime: fetchedBid.creationDateTime,
            bidPrice: fetchedBid.price,
          };
        });

        setBidders(bidders => [...bidders, ...newBidders]);
        setLastPage(bids.last);
      });
  };

  const sendRequest = () => {
    const requestParams = { pageNumber: pageNumber };
    setPageNumber(pageNumber => pageNumber + 1);
    getUsers(requestParams);
  };

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-bidders-list-container'>
      <h2>{BIDDER_LIST.BIDDERS}</h2>

      <Splitter />

      {bidders.length ? (
        <div className='c-bidders-table'>
          <table>
            <thead>
              <tr className='c-table-rows c-table-header'>
                <th className='c-bidder'>{BIDDER_LIST.BIDDER}</th>
                <th className='c-date'>{BIDDER_LIST.DATE}</th>
                <th className='c-bid'>{BIDDER_LIST.BID}</th>
              </tr>
            </thead>

            <tbody>
              {bidders.map((bid, index) => (
                <tr className='c-table-rows' key={index}>
                  <td className='c-user-data'>
                    <img src={bid.profileImageUrl || userImage} alt='Profile' />
                    <span>{bid.firstName}</span>
                    <span>{bid.lastName}</span>
                  </td>

                  <td>{getDateString(bid.creationDateTime.toString())}</td>

                  <td
                    className={classNames('c-bid-column', {
                      'c-highest-bidder': index === 0,
                    })}
                  >
                    $ {bid.bidPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>{BIDDER_LIST.WITHOUT_BIDDERS}</h2>
      )}

      {!lastPage && <button onClick={sendRequest}>{BIDDER_LIST.LOAD_MORE}</button>}
    </div>
  );
};

export default BiddersList;
