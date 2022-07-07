import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';
import React from 'react';

// 컴포넌트 React.memo 함수로 감싸서 todo, onRemove, onToggle값이 바뀔때만 리렌더링 됨
const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;

// - render 함수에서 div로 감싸고 해당 div에 className 설정
//    props 로 받아온 style도 적용
// - 여기서 TodoListItem-virtualized 클래스 만든 이유
// → 컴포넌트 사이사이에 테두리를 제대로 쳐주고
// → 홀/짝 항목에 다른 색상 설정

  return (
    <div className='TodoListItem-virtualized' style={style}>
      <div className='TodoListItem'>
        <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className='text'>{text}</div>
        </div>
        <div className='remove' onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);

// 느려지는 원인 분석
// – 컴포넌트가 리렌더링 될 때
// 1. 자신이 전달받은 props가 변경될 때
// 2. 자신의 state가 바뀔 때
// 3. 부모 컴포넌트가 리렌더링 될 때
// 4. forceUpdate 함수가 실행될 때
// → 컴포넌트 리렌더링 성능 최적화 → 불필요한 리렌더링 방지

// React.memo를 사용하여 컴포넌트 성능 최적화
// - 클래스 컴포넌트의 리렌더링 방지 → shouldComponentUpdate 라이프사이클 사용
// - 함수 컴포넌트의 리렌더링 방지 → React.memo 함수 사용
//     - 해당 컴포넌트의 props가 바뀌지 않았다면, 리렌더링하지 않도록 설정하여 함수 컴포넌트의 리렌더링 성능 최적화 해주기
//     - 사용 : 컴포넌트 감싸주기 export default React.memo(컴포넌트);