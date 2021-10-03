import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useMeasurePosition } from "../../common/useMeasurePosition";
import Todo from "./Todo";
import TodoButton from "./TodoButton";
import LineInput from "./LineInput";

const MotionLi = motion.li;

const TodoDrag = ({
	text,
	updatePosition,
	updateOrder,
	i,
	id,
	nightMode,
	handleDeleteCurrentTodo,
	handleSetCompleted,
	handleSetText,
}) => {
	const [isDragging, setDragging] = useState(false);
	const [isEditing, setEditing] = useState(false);

	const ref = useMeasurePosition((pos) => updatePosition(i, pos));

	let nightModeClasses;
	if (isEditing) {
		nightModeClasses = nightMode ? "white fs-b-input-dark" : "black fs-b-input-light";
	} else {
		nightModeClasses = nightMode ? "white fs-bg-dark-gray" : "black fs-bg-light-gray";
	}

	return (
		<MotionLi
			className="relative mb3"
			ref={ref}
			layout
			whileTap={{
				scale: 1.01,
			}}
			initial={false}
			style={{ zIndex: isDragging ? 3 : 1 }}
			drag="y"
			dragConstraints={{ top: 0, bottom: 0 }}
			dragElastic={1}
			onDragStart={() => setDragging(true)}
			onDragEnd={() => {
				setDragging(false);
			}}
			onViewportBoxUpdate={(_viewportBox, delta) =>
				isDragging && updateOrder(i, delta.y.translate)
			}
		>
			<Todo backgroundClasses={nightModeClasses}>
				{isEditing ? (
					<LineInput
						prependText={`${i + 1}.`}
						action={(value) => handleSetText(id, value)}
						setShowInput={setEditing}
						initValue={text}
						nightMode={nightMode}
					/>
				) : (
					<>
						<div className="flex items-center">
							<div className="w2 fw4 f6">{i + 1}.</div>{" "}
							<div className="cursor-text">{text}</div>
						</div>

						<div className="flex mr2">
							<TodoButton
								action={() => handleDeleteCurrentTodo(id)}
								nightMode={nightMode}
								icon="delete_outline"
							/>
							<TodoButton
								action={() => setEditing(true)}
								nightMode={nightMode}
								icon="create"
							/>
							<div className="ml1" />
							<TodoButton
								action={() => handleSetCompleted(id)}
								nightMode={nightMode}
								icon="done"
								primary
							/>
						</div>
					</>
				)}
			</Todo>
		</MotionLi>
	);
};

export default TodoDrag;
