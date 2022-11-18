import { useState } from 'react';

import EN_STRINGS from 'util/en_strings';

import './image-picker.scss';

type Props = {
  children?: React.ReactNode;
  images: string[];
};

const ImagePicker: React.FC<Props> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const otherImages = images?.map((image, index: number) =>
    index !== selectedImageIndex ? (
      <img
        src={image}
        alt='Image'
        key={index}
        onClick={() => setSelectedImageIndex(index)}
      />
    ) : (
      ''
    )
  );

  return (
    <div className='c-images'>
      <div className='c-main-image'>
        <img src={images[selectedImageIndex]} alt={EN_STRINGS['ImagePicker.FocusedImage']}/>
      </div>

      <div className='c-other-images'>{otherImages}</div>
    </div>
  );
};

export default ImagePicker;
