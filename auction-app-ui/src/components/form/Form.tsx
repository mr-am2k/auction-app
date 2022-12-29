import { useForm } from 'hooks/useForm';

import './form.scss';

type Props = {
  children?: React.ReactNode;
  onSubmit: () => void;
  primaryActionLabel?: string;
  errorMessage: JSX.Element | string;
  otherOptions?: JSX.Element;
};

export const Form: React.FC<Props> = ({
  children,
  onSubmit,
  primaryActionLabel,
  otherOptions,
  errorMessage,
}) => {
  const { validateForm } = useForm();

  return (
    <div className='c-form-component'>
      <form className='c-form'>
        {children}

        {errorMessage}

        {primaryActionLabel && (
          <>
            {' '}
            <button
              onClickCapture={validateForm}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                onSubmit();
              }}
            >
              {primaryActionLabel}
            </button>
          </>
        )}

        {otherOptions}
      </form>
    </div>
  );
};

export default Form;
