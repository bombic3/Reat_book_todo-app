import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss'

const TodoInsert = () => {
  return (
    <div>
      <form className='TodoInsert'>
        <input placeholder='할 일을 입력하세요' />
        <button type='submit'>
          <MdAdd />
        </button>
      </form>
    </div>
  );
};

export default TodoInsert;