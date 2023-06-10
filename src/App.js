//git pull로 다시 받아와서 재실행
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState([]);
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

  return (
    <div>
      <h1>Todo-list Practice !!</h1>
      <form>
        <div>
          <input id="name" type="text" placeholder="write your name!" />
          <button>Add User Name</button>
        </div>
      </form>
    
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