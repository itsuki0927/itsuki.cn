const todoList = [
  { name: '新版UI', percent: '60%' },
  { name: '不知道写什么博客', percent: '10%' },
  { name: '阅读@tanstack/react-query中', percent: '50%' },
];

const TodoList = () => (
  <ul className='flex flex-col space-y-2 bg-gray-50 p-6'>
    <div className='text-xl font-medium text-gray-900'>TODO</div>
    {todoList.map(todo => (
      <li
        key={todo.name}
        className='flex list-inside list-decimal items-center justify-between transition-colors'
      >
        <span>{todo.name}</span>

        <span className='text-sm text-gray-500'>{todo.percent}</span>
      </li>
    ))}
  </ul>
);
export default TodoList;
