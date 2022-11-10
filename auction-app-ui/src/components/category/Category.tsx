import './category.scss'

type Props = {
  children?: React.ReactNode;
  categoryName: string;
};

const Category: React.FC<Props> = ({categoryName}) => {
  return (
    <div className='c-category-wrapper'>
      <p>{categoryName}</p>
    </div>
  );
};

export default Category;
