import { useCallback, useReducer, useRef } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

/*
### useReducer 사용하기
- useReducer → 두 번째 파라미터 = 초기 상태 넣어줘야 함
- 지금은 그 대신 두 번재 파라미터에 undefined를 넣고, 세 번째 파라미터에 초기 상태 만들어 주는 함수인 createBulkTodos를 넣어 줌
    → 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수 호출 됨
    
- useReducer 사용 → 기존 코드 많이 고쳐야 하는 단점
    BUT → 상태를 업데이트하는 로직 모아서 컴포넌트 바깥에 둘 수 있다는 장점
    (성능상 useState 함수형 업데이트와 비슷함 취향에 따라 사용)
*/

function createBulkTodos () {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

// 2. useReducer 사용하기
function todoReducer (todos, action) {
  switch (action.type) {
    case 'INSERT': // 추가
      // { type: 'INSERT', todo: { id: 1, test: 'todo', checked: false }}
      return todos.concat(action.todo);
    case 'REMOVE': // 제거
      // { type: 'REMOVE', id: 1 }
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE': // 토글
      // { type: 'TOGGLE', id: 1 }
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState(createBulkTodos);
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 고유값으로 사용될 id
  // ref 사용하여 변수 담기
  const nextId = useRef(2501);

  const onInsert = useCallback( text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1; // nextId 1씩 더하기
    }, []);
  
  // onRemove 작성
  const onRemove = useCallback( id => {
    dispatch({ type: 'REMOVE', id });
    }, []);

  // onToggle 작성
  const onToggle = useCallback( id => {
    dispatch({ type: 'TOGGLE', id });
    }, []);

  return (
    <TodoTemplate>
      {/* <TodoInsert /> */}
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
