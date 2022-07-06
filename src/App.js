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

  const onInsert = useCallback( text => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // setTodos(todos.concat(todo));
      setTodos(todos => todos.concat(todo));
      nextId.current += 1; // nextId 1씩 더하기
    }, []
    // [todos],
  );
  
  // onRemove 작성
  const onRemove = useCallback( id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    }, []
    // [todos],
  );

  // onToggle 작성
  const onToggle = useCallback( id => {
      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    }, []
    // [todos],
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

/*
## React DevTools를 사용한 성능 모니터링

- 정확히 몇 초가 걸리는지 확인 → React DevTools 사용
- 리액트 v17 이전 → 브라우저 내장 성능 측정 도구 User Timing API 사용
- 리액트 v17 이후 → 리액트 전용 개발자 도구 React DecTools 사용
    
    → 개발자 도구 창(F12) Profiler 탭 클릭
    
    → 좌측 상단 파란색 녹화 버튼
    
    → 불꽃 모양 아이콘과 랭크 차트 아이콘 눌러보기
    
    → 리렌더링 된 시간과, 리렌더링 된 컴포넌트 오래 걸린 순으로 정렬해서 보여줌

→ 컴포넌트 리렌더링 성능 최적화 → 불필요한 리렌더링 방지

## onToggle, onRemove 함수가 바뀌지 않게 하기

- React.memo를 사용하는 것만으로 최적화 끝 아님
- 현재 프로젝트에서 todos 배열 업데이트 시 onRemove와 onToggle 함수도 새로 바뀌기 때문
- onRemove와 onToggle 함수는 배열 상태를 업데이트 하는 과정에서 최신 상태의 todos를 참조하기 때문에 todos 배열이 바뀔 때마다 함수가 새로 만들어짐

### 함수가 계속 만들어지는 상황 방지하는 두 가지 방법

1. useState의 함수형 업데이트 기능 사용
2. useReducer 사용


### useState의 함수형 업데이트

- 기존 - setTodos 함수를 사용할 때 새로운 상태를 파라미터로 넣어 주었음
- 변경 - setTodos를 사용할 때 새로운 상태를 파라미터로 넣는 대신, 상태 업데이트를 어떻게 할지 정의해 주는 업데이트 함수를 넣기 → 함수형 업데이트

### onToggle, onRemove 함수에서 1️⃣ useState의 함수형 업데이트 사용해보기

- 이 과정에서 onInsert 함수도 함께 수정
- setTodos를 사용할 때 그 안에 todos ⇒ 만 앞에 넣어주면 됨
- 수정 후 Profiler 개발자 도구 확인하면 빨라져 있음
*/