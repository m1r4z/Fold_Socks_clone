import * as React from "react";
import { useRef } from "react";
import TodoDrag from "./TodoDrag";
import { findIndex } from "../../common/usePositionReorder";
import move from "../../common/move";

export default ({
	todos,
	handleSetOrder,
	handleDeleteCurrentTodo,
	handleSetCompleted,
	handleSetText,
	nightMode,
}) => {
	const { current } = todos;

	const positions = useRef([]).current;
	const updatePosition = (i, offset) => {
		positions[i] = offset;
	};

	const updateOrder = (i, dragOffset) => {
		const targetIndex = findIndex(i, dragOffset, positions);
		if (targetIndex !== i) {
			handleSetOrder(move(current, i, targetIndex));
		}
	};

	return current.length > 0 ? (
		<ul className="relative">
			{current.map((todo, i) => (
				<TodoDrag
					key={`todo-${todo.id}`}
					text={todo.text}
					id={todo.id}
					i={i}
					updatePosition={updatePosition}
					updateOrder={updateOrder}
					nightMode={nightMode}
					handleDeleteCurrentTodo={handleDeleteCurrentTodo}
					handleSetCompleted={handleSetCompleted}
					handleSetText={handleSetText}
				/>
			))}
		</ul>
	) : (
		<div className="tc mb3 f4">
			<img
				style={{ width: 50 }}
				src={nightMode ? "night_socks.png" : "day_socks.png"}
				alt="striped socks"
			/>
			<div>Hm, all out of tasks...</div>
		</div>
	);
};
