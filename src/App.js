import { useCallback, useRef, useState } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

// todos 배열에 새 객체 추가하기
// - App 컴포넌트에서 todos 배열에 새 객체 추가하는 onInsert 함수 만들기
// - 이 함수에선 새로운 객체 만들 때마다 id 값에 1씩 더해줘야 함
// - id 값은 useRef 사용하여 관리
// - 여기서 useState가 아닌 useRef 사용해 컴포넌트에서 사용할 변수를 만드는 이유
//     - id 값은 렌더링되는 정보가 아니기 때문. 단순히 참조되는 값
// - onInsert 함수는 컴포넌트의 성능 아낄 수 잇도록 useCallback 으로 감싸주기
//     - props로 전달해야 할 함수 만들 때는 useCallback 사용해 함수 감싸는 것 습관화해주기
// - onInsert 함수 만든 뒤 해당 함수를 TodoInsert 컴포넌트의 props로 설정

const App = () => {
  const [todos, setTodos] = useState([
    {
      // map 사용 위해 고유한 key 값 id 넣어줌
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: '쇼핑몰 만들어 보기',
      checked: false,
    },
  ]);

  // 고유값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(4);

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
  
  return (
    <TodoTemplate>
      {/* <TodoInsert /> */}
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
};

export default App;