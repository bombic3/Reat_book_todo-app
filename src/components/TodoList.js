import TodoListItem from './TodoListItem';
import './TodoList.scss';
import React from 'react';
/*
## TodosList 컴포넌트 최적화하기
- 리스트 관련 컴포넌트 최적화 할 시
    → 리스트 내부에서 사용하는 컴포넌트와
    → 리스트로 사용되는 컴포넌트 자체 최적화 시켜주기

→ 지금 최적화 코드는 현재 프로젝트 성능에 전혀 영향 주지 않음
→ TodoList 컴포넌트의 부모 컴포넌트 App 컴포넌트가 리렌더링 되는 유일한 이유가 todos 배열 업데이트 시이기 때문
→ 즉, 지금 TodoList 컴포넌트는 불필요한 리렌더링 발생하지 않음
→ 하지만 App 컴포넌트에 다른 state가 추가되어 해당 값들이 업데이트될 때는 TodoList 컴포넌트가 불필요한 리렌더링을 할 수도 있음
→ 때문에 미리 React.memo 사용해 미치 최적화
 */


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
    </div>
  );
};

export default React.memo(TodoList);