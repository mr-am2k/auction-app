import { useForm } from 'hooks/useForm';

import { Input, Form } from 'components/index';
import { User } from 'models/user';
import { INPUT_TYPE_TEXT, FORM, INPUT_TYPE_NUMBER } from 'util/constants';

type Props = {
  children?: React.ReactNode;
  user: User | undefined;
  required?: boolean;
};

const LocationForm: React.FC<Props> = ({ user, required }) => {
  const { fieldValues } = useForm();

  const children = [
    <Input
      key={FORM.STREET}
      type={INPUT_TYPE_TEXT}
      name={FORM.STREET}
      title={FORM.STREET_TITLE}
      placeholder={user?.street ? user.street : FORM.STREET_PLACEHOLDER}
      value={fieldValues[FORM.STREET]}
      required={required ? user?.street === null : undefined}
    />,

    <Input
      key={FORM.CITY}
      type={INPUT_TYPE_TEXT}
      name={FORM.CITY}
      title={FORM.CITY_TITLE}
      placeholder={user?.city ? user.city : FORM.CITY_PLACEHOLDER}
      value={fieldValues[FORM.CITY]}
      required={required ? user?.city === null : undefined}
    />,

    <Input
      key={FORM.ZIP_CODE}
      type={INPUT_TYPE_NUMBER}
      name={FORM.ZIP_CODE}
      title={FORM.ZIP_CODE_TITLE}
      placeholder={user?.zipCode ? user.zipCode : FORM.ZIP_CODE_PLACEHOLDER}
      value={fieldValues[FORM.ZIP_CODE]}
      required={required ? user?.zipCode === null : undefined}
    />,
    <Input
      key={FORM.STATE}
      type={INPUT_TYPE_TEXT}
      name={FORM.STATE}
      title={FORM.STATE_TITLE}
      placeholder={user?.state ? user.state : FORM.STATE_PLACEHOLDER}
      value={fieldValues[FORM.STATE]}
      required={required ? user?.state === null : undefined}
    />,
    <Input
      key={FORM.COUNTRY}
      type={INPUT_TYPE_TEXT}
      name={FORM.COUNTRY}
      title={FORM.COUNTRY_TITLE}
      placeholder={user?.country ? user.country : FORM.COUNTRY_PLACEHOLDER}
      value={fieldValues[FORM.COUNTRY]}
      required={required ? user?.country === null : undefined}
    />,
  ];

  return (
    <div>
      <Form children={children} />
    </div>
  );
};

export default LocationForm;
