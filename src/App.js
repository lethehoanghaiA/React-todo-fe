import "./App.css";
import Header from "./components/header";
import Tasks from "./components/tasks";
import TaskForm from "./components/TaskForm";

import { useState, useEffect } from "react";

function App() {
	const [tasks, setTasks] = useState([]);

	//8.4 async API call to fetch task
	useEffect(() => {
		const getTask = async() => {
			const getTasksFromServer = await fetchTasks()
			setTasks(getTasksFromServer)
		}

		getTask()
	}, []) 
	//phai them [] neu ko se goi lien tuc

	//fetch task
	const fetchTasks = async () => {
		const res = await fetch('/tasks');
		const data = await res.json();
		return data;
	}

	//get a Task from server (to Update)
	const fetchATask = async (id) => {
		const res = await fetch(`/tasks/${id}`);
		const data = await res.json();
		return data;
	}

	//8.2 Adding event. min 51.58
	//create event function here and pass down like a props
	const deleteTask = async (id) => {
		await fetch(`/tasks/${id}`, {
			method: 'DELETE'
		})

		setTasks(tasks.filter((task) => task.id !== id));
	};

	//toggle function
	const toggleReminder = async (id) => {
		let taskToToggle = await fetchATask(id);
		taskToToggle.reminder = !taskToToggle.reminder;
		
		const res = await fetch(`/tasks/${id}`, 
			{
				method:'PUT',
				headers: {'Content-type' : 'application/json'},
				body: JSON.stringify(taskToToggle)
			}
		)

		const data = await res.json();
		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		);
	};

    //add task funtuon
    const addTask = async (task) => {
		const res = 
			await fetch('/tasks',
						{
							method:'POST',
							headers:{
								'Content-type':'application/json'
							},
							body: JSON.stringify(task),
						})
		const data = await res.json();
		setTasks([...tasks, data])

        //create ID:
        // let id = tasks.length + 1;
        // let newTask = {id, ...task};
        // setTasks([...tasks, newTask]);
    }

	//show Add Task function
	const[showAddTask, setShowAddTask] = useState(false);
	const onShowAdd = () => {
		setShowAddTask(!showAddTask)
	}
	
	return (
		<div className="App">
			<Header 
				showAdd = {onShowAdd}
				isShowing = {showAddTask} 
			/>
            { showAddTask && <TaskForm onAdd = {addTask} />}

			{tasks.length > 0 ? (
				<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
			) : (
				"There is no task"
			)}
		</div>
	);
}

export default App;
