import { useState } from 'react';
import './image-picker.scss';

type Props = {
  children?: React.ReactNode;
  images: string[];
};

const ImagePicker: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const otherImages = images?.map((image, index: number) =>
    index !== selectedImage ? (
      <img
        src={image}
        alt='Product'
        key={index}
        onClick={() => setSelectedImage(index)}
      />
    ) : (
      ''
    )
  );

  return (
    <div className='c-images'>
      <div className='c-main-image'>
        <img src={images[selectedImage]} alt='Main' />
      </div>

      <div className='c-other-images'>{otherImages}</div>
    </div>
  );
};

export default ImagePicker;
