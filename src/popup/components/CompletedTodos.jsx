import * as React from "react";
import TodoButton from "./TodoButton";

export default ({ todos, handleDeleteCompletedTodo, nightMode }) => {
	const { completed } = todos;

	return completed.length > 0 ? (
		<ul className={`line-top pv4 mt3 ${nightMode && "night"}`}>
			{completed.map((todo) => (
				<li
					key={`completed-${todo.id}`}
					className={`todo w100 flex items-center f6 pr2 fw3 ${
						nightMode ? "fs-peach" : "fs-purple"
					}`}
				>
					<TodoButton
						nightMode={nightMode}
						icon="delete_outline"
						action={() => handleDeleteCompletedTodo(todo.id)}
					/>
					<span className="pl1 strike hover-unstrike">{todo.text}</span>
				</li>
			))}
		</ul>
	) : (
		<div className="pt4" />
	);
};
