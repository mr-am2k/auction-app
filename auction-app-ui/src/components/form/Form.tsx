import { useForm } from 'hooks/useForm';

import './form.scss';

type Props = {
  children?: React.ReactNode;
  onSubmit?: () => void;
  primaryActionLabel?: string;
  errorMessage?: JSX.Element | string;
  otherOptions?: JSX.Element;
  googleAuth?: JSX.Element;
  facebookAuth?: JSX.Element;
  className?: string;
};

export const Form: React.FC<Props> = ({
  children,
  onSubmit,
  primaryActionLabel,
  otherOptions,
  errorMessage,
  className,
  googleAuth,
  facebookAuth,
}) => {
  const { validateForm } = useForm();

  const formClass = `c-form ${className}`;

  return (
    <div className='c-form-component'>
      <form className={formClass}>
        <div className='c-inputs-wrapper'>{children}</div>

        {errorMessage}
        
        <div className='c-social-media-buttons'>
          {googleAuth && googleAuth}
          {facebookAuth && facebookAuth}
        </div>

        {onSubmit && (
          <>
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
