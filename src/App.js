//새로고침시 로컬스토리지에 바로 추가 안됨
//새로고침시 제일 최근에 저장해뒀던 list가 사라짐

//css 추가
import styles from './Button.module.css';
import style from './Reset.module.css';
import mouse from './Mouse.module.css';
import { useEffect, useState } from 'react';

function App() {
  // mosue
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // todo-list
  const [todo, setTodo] = useState('');
  const [todos, setToDos] = useState([]);

  //user
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);

  // todo-list
  const onChange = (e) => setTodo(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    if (todo === '') {
      return;
    }
    setToDos((addToDos) => [todo, ...addToDos]);
    setTodo('');
  };

  useEffect(() => {
    if (todos.length === 0) return;
    const jsonStr = JSON.stringify(todos);
    localStorage.setItem('todos', jsonStr);
  }, [todos]);

  useEffect(() => {
    const localToDos = localStorage.getItem('todos');
    if (!localToDos) return;
    const storedToDos = JSON.parse(localToDos);
    setToDos(storedToDos || []);
  }, []);

  const onClick = (e) => {
    const delteBtn = e.target.id;
    setToDos((addToDos) =>
      addToDos.filter((item) => {
        return item !== delteBtn;
      })
    );
  };

  // user
  const userOnChange = (e) => setUserName(e.target.value);
  const userOnSubmit = (e) => {
    e.preventDefault();
    if (userName === '') {
      return;
    }
    setUsers((addUser) => [userName, ...addUser]);
    setUserName(userName);
    setUserName('');
    console.log(users);
  };

  useEffect(() => {
    if (users.length === 0) return;
    const jsonSetUsers = JSON.stringify(users);
    localStorage.setItem('Users', jsonSetUsers);
  }, [users]);

  useEffect(() => {
    const localGetUsers = localStorage.getItem('Users');
    if (!localGetUsers) return;
    const localParseUsers = JSON.parse(localGetUsers);
    setUsers(localParseUsers || []);
  }, []);

  // mouseMove
  useEffect(() => {
    function handleMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.addEventListener('pointermove', handleMove);
  }, []);

  return (
    <div className={style.div}>
      <div
        className={mouse.pink}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      ></div>

      <h1>Todo-list Practice !!</h1>
      {/* 사용자 이름 */}
      {users.length === 0 ? (
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
          <h2 className={styles.userName}>User Name: {users[0]}</h2>
        </div>
      )}

      {/* ToDotodos 작성하는 곳 */}
      <div>
        <h2>add ToDo-todos</h2>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={todo}
            className={styles.botBtn}
            id="todos"
            type="text"
            placeholder="write your todo-list"
          />
          <button>Add To Do</button>
        </form>
      </div>
      <ul>
        {todos.map((item, index) => (
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
 * 현재 93번째줄에 style추가 한 내용을 css쪽에다 어떻게 지정을 해줄수있을까?
 */

// * 공식문서 읽다가 마우스 이벤트리스너 추가
