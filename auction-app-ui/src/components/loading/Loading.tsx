import './loading.scss';

type Props = {
  children?: React.ReactNode;
  content?: string;
};

const Loading: React.FC<Props> = ({ content = 'Loading' }) => {
  return (
    <div className='c-loading-container'>
      <div className='c-spinner'></div>
      <h3>{content}</h3>
    </div>
  );
};

export default Loading;
