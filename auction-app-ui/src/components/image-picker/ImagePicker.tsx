import { Product } from 'models/product';
import { useState } from 'react';
import './image-picker.scss';

type Props = {
  children?: React.ReactNode;
  singleProduct: Product;
};

const ImagePicker:React.FC<Props> = ({singleProduct}) => {
    const [mainImageIndex, setMainImageIndex] = useState(0);
    
    const otherImages = singleProduct?.imageURL.map((image, index: number) =>
    index !== mainImageIndex ? (
      <img
        src={image}
        alt='slika'
        key={index}
        onClick={() => setMainImageIndex(index)}
      />
    ) : ('')
  );

  return (
    <div className='c-images'>
      <div className='c-main-image'>
        <img src={singleProduct?.imageURL[mainImageIndex]} alt='Main' />
      </div>

      <div className='c-other-images'>{otherImages}</div>
    </div>
  );
};

export default ImagePicker;
