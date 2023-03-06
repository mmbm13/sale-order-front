import ReactLoading from 'react-loading';
import './Loader.css';

function Loader() {
  return (
    <div className="container">
      <ReactLoading
        type={'spin'}
        color={'#000'}
        height={'400px'}
        width={'400px'}
        className="Loader"
      />
    </div>
  );
}

export default Loader;
