import React from 'react';
import { Link } from 'react-router-dom';

import { EN_STRINGS } from 'translation/en';
import { ROUTES } from 'util/routes';
import { ITEM_LIST } from 'util/constants';

import './item-list.scss';

type Props = {
  children?: React.ReactNode;
  elements: any[];
  expired?: boolean;
  emptyList: JSX.Element;
  buttonLabel: string;
  secondButtonLabel?: string;
};

const ItemList: React.FC<Props> = ({ elements, expired, emptyList, buttonLabel, secondButtonLabel }) => {
  return (
    <tbody>
      {elements.length ? (
        elements.map((element, index) => (
          <tr key={index}>
            <td>
              <img src={element.imageUrl} alt={EN_STRINGS.ITEM_LIST.ALT_MESSAGE} />
            </td>

            <td>{element.name}</td>

            <td>{element.remainingTime === '-1' ? EN_STRINGS.ITEM_LIST.EXPIRED : element.remainingTime}</td>

            <td>${element.price.toFixed(2)}</td>

            <td>{element.numberOfBids}</td>

            <td>
              <span>
                {element.highestBid ? `$ ${element.highestBid?.toFixed(ITEM_LIST.PRICE_DECIMALS)}` : EN_STRINGS.ITEM_LIST.NO_BIDS}
              </span>
            </td>

            <td>
              {element.paid ? (
                <span>Item is paid</span>
              ) : (
                <Link to={`${ROUTES.PRODUCT}/${element.id}`}>
                  {element.remainingTime !== '-1' ? <button>{buttonLabel}</button> : <button>{secondButtonLabel}</button>}
                </Link>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>{emptyList}</tr>
      )}
    </tbody>
  );
};

export default ItemList;
