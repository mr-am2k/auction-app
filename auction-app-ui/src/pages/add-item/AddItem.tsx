import { ItemForm, Prices } from 'components';
import './add-item.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'hooks/useForm';

const AddItem = () => {
  const { validateForm, resetFieldValues, setFieldValidationResults } =
    useForm();
  const [pageNumber, setPageNumber] = useState(1);
  const handleNext = () => {
    const isValid = validateForm();

    if (isValid) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  useEffect(() => {
    return () => {
      resetFieldValues();
      setFieldValidationResults({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='c-add-item-wrapper'>
      {pageNumber === 1 && <ItemForm handleNext={handleNext} />}
      {pageNumber === 2 && <Prices />}
    </div>
  );
};

export default AddItem;
