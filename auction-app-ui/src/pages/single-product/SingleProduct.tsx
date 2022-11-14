import { Product } from 'models/product';
import { useContext, useEffect } from 'react';
import PageContext from 'store/page-context';
import EN_STRINGS from 'util/en_strings';

import './single-product.scss'

const mockProduct:Product = {
  id: '12312312djklfjklfj3',
  name: 'Black Shirt',
  description: "Note The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm. Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside. Zippered Hand Pockets and Hidden Pocket keep your things secure.  Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
  imageURL: "test.jpg",
  price: 52,
  creationDate: new Date(),
  expirationDate: new Date()
}

const SingleProduct = () => {
  const {setNavbarItems} = useContext(PageContext);

  useEffect(() => {
    setNavbarItems([
      mockProduct.name,
      EN_STRINGS['Navbar.Shop'],
      EN_STRINGS['Shop.SingleProduct'],
    ])
  })
  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct