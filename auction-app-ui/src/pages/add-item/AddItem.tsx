import { ItemForm, Prices } from 'components';
import './add-item.scss';
import { useEffect, useState } from 'react';
import { useForm } from 'hooks/useForm';

const AddItem = () => {
  const { fieldValues, validateForm, resetFieldValues, setFieldValidationResults } =
    useForm();
  const [pageNumber, setPageNumber] = useState(1);

  const handleNext = () => {
    const isValid = validateForm();

    if (isValid) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  const handlePrevious = () => {
    setPageNumber((prevNumber) => prevNumber - 1);
  };

  console.log(fieldValues)

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
      {pageNumber === 2 && (
        <Prices handleNext={handleNext} handlePrevious={handlePrevious} />
      )}
      {pageNumber === 3 && <p>Treci page</p>}
    </div>
  );
};

export default AddItem;
