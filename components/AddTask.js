import { useState } from 'react'

// Each piece of input will have it's own piece of state, component level state, not app level state
const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  // onSubmit is going to take an (e)vent object
  const onSubmit = (e) => {
    // prevent from actually submit to a page (??)
    e.preventDefault()

    // text state from line 5 
    if (!text) {
      alert('Please add a task');
      return
    }

    onAdd({ text, day, reminder})

    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        {/* When we start typing in the input , 
        that's gonna fire off this onChange, which is a control component.
        This also is gonna have a function where we pass the (e)vent object
        and directly call setText() from here, and set it to e.target.value, that is going to be
        whatever is typed in*/}
        <input type="text" placeholder="Add Task" value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input type="text" placeholder="Add Day & Time"  value={day} onChange={(e) => setDay(e.target.value)}/>
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        {/* This will target if the checkbox and give either a true or false value */}
        <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>
      <input type="submit" value="Save Task" className="btn btn-block"/>
    </form>
  )
}

export default AddTask
