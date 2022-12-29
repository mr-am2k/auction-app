import { Input, Form } from 'components/index';
import { INPUT_TYPE_TEXT, FORM, INPUT_TYPE_NUMBER } from 'util/constants';

type Props = {
  children?: React.ReactNode;
  errorMessage: JSX.Element | string;
};

const LocationForm: React.FC<Props> = ({ errorMessage }) => {
  const children = [
    <Input
      key={FORM.STREET}
      type={INPUT_TYPE_TEXT}
      name={FORM.STREET}
      title={FORM.STREET_TITLE}
      placeholder={FORM.STREET_PLACEHOLDER}
    />,

    <Input
      key={FORM.CITY}
      type={INPUT_TYPE_TEXT}
      name={FORM.CITY}
      title={FORM.CITY_TITLE}
      placeholder={FORM.CITY_PLACEHOLDER}
    />,

    <Input
      key={FORM.ZIP_CODE}
      type={INPUT_TYPE_NUMBER}
      name={FORM.ZIP_CODE}
      title={FORM.ZIP_CODE_TITLE}
      placeholder={FORM.ZIP_CODE_PLACEHOLDER}
    />,
    <Input
      key={FORM.STATE}
      type={INPUT_TYPE_TEXT}
      name={FORM.STATE}
      title={FORM.STATE_TITLE}
      placeholder={FORM.STATE_PLACEHOLDER}
    />,
    <Input
      key={FORM.COUNTRY}
      type={INPUT_TYPE_TEXT}
      name={FORM.COUNTRY}
      title={FORM.COUNTRY}
      placeholder={FORM.COUNTRY}
    />,
  ];

  return (
    <div>
      <Form children={children} errorMessage={errorMessage} />
    </div>
  );
};

export default LocationForm;
