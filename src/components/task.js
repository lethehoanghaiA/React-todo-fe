import React from "react";

const Task = ({ task, onDelete, onToggle }) => {
	return (
		<div
			className={`task ${task.reminder ? 'reminder':''}`}
			onDoubleClick={() => onToggle(task.id)}
		>
			<h3>
				{task.text}{" "}
				<button
					className="btn btn-danger"
					style={{ cursor: "pointer" }}
					onClick={() => onDelete(task.id)}
				>
					x
				</button>
			</h3>
			<p>{task.day}</p>
		</div>
	);
};

export default Task;
