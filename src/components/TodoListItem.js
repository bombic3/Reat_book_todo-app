import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <div className='TodoListItem'>
      {/* <div className='checkbox'> */}
      <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
        {/* <MdCheckBoxOutlineBlank /> */}
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        {/* <div className='text'>할 일</div> */}
        <div className='text'>{text}</div>
      </div>
      <div className='remove' onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;