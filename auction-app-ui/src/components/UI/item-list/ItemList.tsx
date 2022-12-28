import React from 'react';
import { Link } from 'react-router-dom';

import EN_STRINGS from 'translation/en';
import { ROUTES } from 'util/routes';

type Props = {
  children?: React.ReactNode;
  elements: any[];
  expired?: boolean;
  emptyCart: JSX.Element;
  buttonLabel: string
};

const ItemList: React.FC<Props> = ({ elements, expired, emptyCart, buttonLabel }) => {
  return (
    <tbody>
      {elements.length ? (
        elements.map((element, index) => (
          <tr key={index}>
            <td>
              <img
                src={element.imageUrl}
                alt={EN_STRINGS.ITEM_LIST.ALT_MESSAGE}
              />
            </td>
            <td>{element.name}</td>
            <td>
              {expired ? EN_STRINGS.ITEM_LIST.EXPIRED : element.remainingTime}
            </td>
            <td>${element.price.toFixed(2)}</td>
            <td>{element.numberOfBids ? element.numberOfBids : '0'}</td>
            <td>
              {element.highestBid
                ? `$ ${element.highestBid?.toFixed(2)}`
                : EN_STRINGS.ITEM_LIST.NO_BIDS}
            </td>
            <td>
              <Link to={`${ROUTES.PRODUCT}/${element.id}`}>
                <button>{buttonLabel}</button>
              </Link>
            </td>
          </tr>
        ))
      ) : (
        <tr>{emptyCart}</tr>
      )}
    </tbody>
  );
};

export default ItemList;
