import TodoListItem from './TodoListItem';
import './TodoList.scss';

// TodoListItem 에서 토글 함수 호출하기
// - App에서 만든 onToggle 함수 TodoListItem 에서 호출 할 수 있도록 
// TodoList 거쳐 TodoListItem으로 전달

const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className='TodoList'>
      {todos.map(todo => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
      {/* <TodoListItem />
      <TodoListItem />
      <TodoListItem /> */}
    </div>
  );
};

export default TodoList;