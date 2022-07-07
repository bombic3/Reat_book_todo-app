import TodoListItem from './TodoListItem';
import { List } from 'react-virtualized';
import './TodoList.scss';
import React, { useCallback } from 'react';
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

---

## react-virtualized를 사용한 렌더링 최적화

- 맨 처음 렌더링될 때 2,500개 중 2,491개 컴포넌트 스크롤하기 전에 보이지 않음에도 렌더링
    → 비효율적
- 나중에 todos 배열에 변동이 생길 때도 TodoList 컴포넌트 내부의 map 함수에서 배열의 처음부터 끝까지 컴포넌트로 변환 → 2,491개는 보이지 않음
    → 시스템 자원 낭비
➡️  react-virtualized 사용
→ 스크롤되기 전 보이지 않는 컴포넌트 렌더링 하지 않고 크기만 차지
→ 해당 스크롤 위치에서 보여 주어야 할 컴포넌트 자연스럽게 렌더링 시킴

---

### 11.8.1 최적화 준비 - 설치와 사전작업(크기 알아내기)
> $ yarn add react-virtualized
> 
- 각 항목의 실제 크기 px 단위로 알아내기(개발자 도구 아이콘 눌러 사용)
    → 테두리가 포함되어 있는 두 번째 항목(할 일2)의 크기 확인하기
    → div.TodoListItem 512x57 px

---

- List 컴포넌트 사용위해 rowRenderer 함수 새로 작성
    → react-virtualized 의 List 컴포넌트에서 각 TodoItem 을 렌더링할 때 사용
    → 이 함수를 List 컴포넌트의 props로 설정
    → 이 함수는 파라미터에 index, key, style 값을 객체 타입으로 받아와 사용
- List 컴포넌트 사용시
    → 해당 리스트의 전체 크기와 각 항목의 높이, 각 항목을 렌더링할 때 사용해야 하는 함수, 배열을 props로 넣어줘야 함
    → 그럼 이 컴포넌트가 전달받은 props를 사용하여 자동으로 최적화해 줌

=> TodoListItem도 수정

### 성능 측정
- React.memo 총해 28ms까지 줄였는데, 이번에는 2.4ms로 줄어듦
 
*/

const TodoList = ({ todos, onRemove, onToggle }) => {
  // rowRenderer 함수 작성
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          todo={todo}
          key={key}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [onRemove, onToggle, todos],
  );

  return (
    <List
      className='TodoList'
      width={512} // 전체 크기
      height={513} // 전체 높이
      rowCount={todos.length} // 항목 개수
      rowHeight={57} // 항목 높이
      rowRenderer={rowRenderer} // 항목을 렌더링할 때 쓰는 함수
      list={todos} // 배열
      style={{ outline: 'none' }} // List에 기본 적용되는 outline 스타일 제거
    />
  );
};

export default React.memo(TodoList);