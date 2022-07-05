import { useCallback, useRef, useState } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

// 많은 데이터 렌더링하기
// - 데이터 하나하나 직접 입력하지 않고 createBulkTodos 함수 만들어 데이터 2,500개 자동 생성하도록 함
// - 주의할 점 : useState 기본값에 함수를 넣어줬다는 것
//     → useState (createBulkTodos()) 라고 적으면 리렌더링 될 때 마다 createBulkTodos함수 호출 됨
//     → useState(createBulkTodos) 처럼 파라미터를 함수 형태로 넣어주면 컴포넌트가 처음 렌더링 될 때만 createBulkTodos 함수 실행

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

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링 해보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '쇼핑몰 만들어 보기',
  //     checked: false,
  //   },
  // ]);
  
  
  // 고유값으로 사용될 id
  // ref 사용하여 변수 담기
  const nextId = useRef(2501);
  
  // const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
    },
    [todos],
  );
  
  // onRemove 작성
  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  // onToggle 작성
  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      {/* <TodoInsert /> */}
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;