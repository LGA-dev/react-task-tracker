import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
// To use state inside a function we use a hook called useState 

function App() {
    // Why brackets?
  // One piece of state is called "tasks"
  // And then a function to update the state is called "setTask"
  // Inside useState is the default(the array) that we want to use for this piece of state for tasks
  // This is part of the app component state
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const  getTasks = async () => {
      const tasksFromSever = await fetchTasks();
      setTasks(tasksFromSever)
    }

    getTasks();
  }, []) // Dependecy array (???)
  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    // console.log(data)
    return data
  }
  // Fetch tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    // console.log(data)
    return data
  }
  // Add Tasks
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks/',
    {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    // // console.log(task)
    // // This will give me a random number from 1 to 10000
    // const id = Math.floor(Math.random() * 10000) + 1;
    // console.log(id);
    // // This will create a new object with the id(random number) and it will copy whatever is being passed on task (line36)
    // const newTask = {id, ...task};
    // // This will copy the current tasks and also the new task
    // setTasks([...tasks, newTask])
  }
  // Delete Tasks
  const deleteTask = async (id) => {
    await fetch (`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    // console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    // Choose tasks state and map through
    // For each one is going to be called task
    // Where the task ID in the current interation it's equal to the id that's being passed in
    // Then we are going to have a specific object (set the oposite of that specific reminder status)
    // Else it's a specific task (no change)
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        {/* Set showAddtaks to the oposite of whatever it is */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {/* Check if showAddTask is true */}

        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {/* Passing task in to Tasks component as a prop */}
            {
            tasks.length > 0 ? 
            ( <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>)
            :
            ("No tasks to show")
            }
          </>
        )} />
        <Route path='/about' component={About}/>
        <Footer />
      </div>
    </Router>
  )
}

export default App