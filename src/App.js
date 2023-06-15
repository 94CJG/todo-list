//css 추가
import styles from './Button.module.css';
import style from './Reset.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  // todo-list
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);

  //user
  const [userName, setUserName] = useState('');
  const [userSave, setUserSave] = useState([]);

  // todo-list
  const onChange = (e) => setTodo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === '') {
      return;
    }
    setList((addList) => [todo, ...addList]);
    localStorage.setItem('list', JSON.stringify(list));
    setTodo('');
  };
  const onClick = (e) => {
    const delteBtn = e.target.id;
    setList((addList) =>
      addList.filter((item) => {
        return item !== delteBtn;
      })
    );
  };
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('list'));
    setList(storedList || []);
  }, []);

  // user
  const userOnChange = (e) => setUserName(e.target.value);
  const userOnSubmit = (e) => {
    e.preventDefault();
    if (userName === '') {
      return;
    }
    setUserSave((addUser) => [userName, ...addUser]);
    setUserName('');
  };
  console.log(list);

  return (
    <div className={style.div}>
      <h1>Todo-list Practice !!</h1>
      {/* 사용자 이름 */}
      {userSave.length === 0 ? (
        <form onSubmit={userOnSubmit}>
          <div>
            <input
              id="name"
              value={userName}
              onChange={userOnChange}
              type="text"
              placeholder="write your name!"
            />
            <button>Add User Name</button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className={styles.userName}>User Name: {userSave[0]}</h2>
        </div>
      )}

      {/* ToDolist 작성하는 곳 */}
      <div>
        <h2>add ToDo-List</h2>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={todo}
            className={styles.botBtn}
            id="list"
            type="text"
            placeholder="write your toDolist"
          />
          <button>Add To Do</button>
        </form>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index} className={styles.li}>
            {item}
            <button id={item} onClick={onClick}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/** 질문
 * chatGpt를 사용해서 useEffect를 사용 코드 적용함

 * JSON.stringfy() 와 JSON.parse()의 차이점 및 사용처?
 * useEffect를 왜 사용하여 새로고침시 초기화가 안될까?
 * 로컬스토리지에 확인시 저장 값이 바로 안보인다.
 */