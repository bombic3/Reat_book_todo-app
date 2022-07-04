import { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss'

// App 에서 TodoInsert에 넣어 준 onInsert 함수에
// 현재 useState를 통해 관리하고 있는 value 값을
// 파라미터로 넣어서 호출
const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback(e => {
    // console.log("OK");
    setValue(e.target.value);
  }, []);

  // onSubmit을 useCallback사용하여 생성
  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue(''); // value 값 초기화

      // submit 이벤트는 브라우저에서 새로고침을 발생시킴
      // 이를 방지하기 위해 이 함수 호출함
      e.preventDefault();
    },
    [onInsert, value],
  );
  
  return (
    <div>
      <form className='TodoInsert' onSubmit={onSubmit}>
        <input
          placeholder='할 일을 입력하세요'
          value={value}
          onChange={onChange}
        />
        <button type='submit'>
          <MdAdd />
        </button>
      </form>
    </div>
  );
};

export default TodoInsert;


// - onSubmit 대신에 button의 onClick 이벤트로 처리 가능하지만 form 과 onSubmit 사용한 이유
// → onSubmit 이벤트의 경우 인풋에서 Enter를 눌렀을 때로 발생하기 때문
// → 버튼에서 onClick만 사용했다면 인풋에서 onKeyPress 이벤트 통해 Enter 감지하는 로직 따로 만들어야 함

// onSubmit 대신에 button의 onClick 이벤트로 처리 했을 시 코드
/*

const onClick = useCallback(
  () => {
    onInsert(value);
    setValue('');
  },
  [onInsert, value],
);

return (
  <form className='TodoInsert'>
    <input
      placeholder='할 일을 입력하세요'
      value={value}
      onChange={onChange}
    />
    <button onClick={onClick}>
      <MdAdd />
    </button>
  </form>
);

*/