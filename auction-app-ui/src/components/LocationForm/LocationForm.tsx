import { useForm } from 'hooks/useForm';

import { Input, Form } from '../index';
import { User } from 'models/user';
import { INPUT_TYPE_TEXT, ADDRESS_FORM, INPUT_TYPE_NUMBER } from 'util/constants';
import { ADDRESS } from 'translation/en';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
  required?: boolean;
};

const LocationForm: React.FC<Props> = ({ user, required }) => {
  const { fieldValues } = useForm();

  const children = [
    <Input
      key={ADDRESS_FORM.STREET}
      type={INPUT_TYPE_TEXT}
      name={ADDRESS_FORM.STREET}
      title={ADDRESS.STREET_TITLE}
      placeholder={user?.address?.street ? user.address.street : ADDRESS_FORM.STREET_PLACEHOLDER}
      value={fieldValues[ADDRESS_FORM.STREET]}
      required={required ? !user?.address?.street : false}
    />,

    <Input
      key={ADDRESS_FORM.CITY}
      type={INPUT_TYPE_TEXT}
      name={ADDRESS_FORM.CITY}
      title={ADDRESS.CITY_TITLE}
      placeholder={user?.address?.city ? user.address.city : ADDRESS_FORM.CITY_PLACEHOLDER}
      value={fieldValues[ADDRESS_FORM.CITY]}
      required={required ? !user?.address?.city : false}
    />,

    <Input
      key={ADDRESS_FORM.ZIP_CODE}
      type={INPUT_TYPE_NUMBER}
      name={ADDRESS_FORM.ZIP_CODE}
      title={ADDRESS.ZIP_CODE_TITLE}
      placeholder={user?.address?.zipCode ? user.address.zipCode : ADDRESS_FORM.ZIP_CODE_PLACEHOLDER}
      value={fieldValues[ADDRESS_FORM.ZIP_CODE]}
      required={required ? !user?.address?.zipCode : false}
    />,

    <Input
      key={ADDRESS_FORM.STATE}
      type={INPUT_TYPE_TEXT}
      name={ADDRESS_FORM.STATE}
      title={ADDRESS.STATE_TITLE}
      placeholder={user?.address?.state ? user.address.state : ADDRESS_FORM.STATE_PLACEHOLDER}
      value={fieldValues[ADDRESS_FORM.STATE]}
      required={required ? !user?.address?.state : false}
    />,

    <Input
      key={ADDRESS_FORM.COUNTRY}
      type={INPUT_TYPE_TEXT}
      name={ADDRESS_FORM.COUNTRY}
      title={ADDRESS.COUNTRY_TITLE}
      placeholder={user?.address?.country ? user.address.country : ADDRESS_FORM.COUNTRY_PLACEHOLDER}
      value={fieldValues[ADDRESS_FORM.COUNTRY]}
      required={required ? !user?.address?.country : false}
    />,
  ];

  return (
    <div>
      <Form children={children} />
    </div>
  );
};

export default LocationForm;
