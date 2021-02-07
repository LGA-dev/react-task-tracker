import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    // You should use setTasks() instead of tasks.push as a way to send data (one-way data)
    // setTasks(...tasks, )
    <div>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle}/>
      ))}
    </div>
  )
}

export default Tasks

