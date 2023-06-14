//git pull로 다시 받아와서 재실행
//2023.06.14 재시작
import { useState } from 'react';

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
  console.log(userSave);

  return (
    <div>
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
          <h2>User Name: {userSave[0]}</h2>
        </div>
      )}

      {/* ToDolist 작성하는 곳 */}
      <div>
        <h2>add ToDo-List</h2>
        <form onSubmit={onSubmit}>
          <input
            onChange={onChange}
            value={todo}
            id="list"
            type="text"
            placeholder="write your toDolist"
          />
          <button>Add To Do</button>
        </form>
      </div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
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
