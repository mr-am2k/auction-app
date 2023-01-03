import './dropdown.scss';

interface Option {
  value: string;
  label: string;
}

type Props = {
  children?: React.ReactNode;
  value: string | undefined;
  options: Option[];
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Dropdown: React.FC<Props> = ({
  value,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <select className='c-dropdown' onChange={onChange}>
      <option disabled selected>
        {placeholder}
      </option>

      {options.map((option) => (
        <option className='c-option' key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
