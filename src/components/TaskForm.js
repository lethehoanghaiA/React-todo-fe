import { useState } from "react";


const TaskForm = ( {onAdd }) => {
    const[taskName, setTaskName] = useState('');
    const[day, setDay] = useState('');
    const[reminder, setReminder] = useState(false);

    //submit function
    const onSubmit = (e) => {
         e.preventDefault()

         if(!taskName) {
            alert('Please fill in a task');
            return;
         } 
        
        onAdd({text : taskName , day : day , reminder : reminder})
         
        setTaskName('');
        setDay('');
        setReminder(false);
    }

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="taskName"> Task name </label>
                <input 
                    type="text" name="taskName" 
                    placeholder="Enter a task" 
                    value = {taskName}
                    onChange = {(e) => setTaskName(e.target.value)}
                />
            </div>
            
            <div className="form-control">
                <label htmlFor="day">Day </label>
                <input 
                    type="text" name="day" 
                    placeholder="Enter a task" 
                    value = {day}
                    onChange = {(e) => setDay(e.target.value)}
                />

            </div>

            <div className="form-control form-control-check">
                <label htmlFor="reminder">Reminder </label>
                <input 
                    type="checkbox" 
                    checked={reminder}
                    name="reminder" 
                    value = {reminder}
                    onChange = {(e) => setReminder(e.currentTarget.checked)} 
                />
            </div>

            <input type="submit" className="btn btn-primary btn-block" value="Save Task"/>
        </form>
    )
}

export default TaskForm
