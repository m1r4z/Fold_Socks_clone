import * as React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import dayjs from "dayjs";
import Todos from "./Todos";
import CompletedTodos from "./CompletedTodos";
import ButtonInput from "./ButtonInput";
//import Todos from "./Todos";
//import ButtonInput from "./ButtonInput";
//import CompletedTodos from "./CompletedTodos";
//import Settings from "./Settings";
//import { addTodo, deleteCompletedTodo } from "../actions/todos";

const MotionDiv = motion.div;

const NewTabApp = () => {
	const [showSettings, setShowSetting] = useState(false);
	const [nightMode, setNightMode] = useState(false);
	const [focusing, setFocusing] = useState(false);
	const [timeDuration, setTimeDuration] = useState(30);
	const [timerSession, setTimerSession] = useState({
		start: dayjs().valueOf(),
		end: dayjs().valueOf(),
	});

	const [todos, setTodos] = useState({
		current: [
			{
				id: 1,
				text: "First add the Fold Socks icon by clicking the puzzle piece in the top right toolbar",
				created: Date.now(),
				completed: null,
			},
			{
				id: 2,
				text: "In the dropdown, click the pin next to the Fold Socks app",
				created: Date.now(),
				completed: null,
			},
			{
				id: 3,
				text: "Now, click the new pinned app icon to start your focus!",
				created: Date.now(),
				completed: null,
			},
		],
		completed: [],
		count: 3,
	});

	const updateTodoValue = (todos, id, keyToUpdate, value) => {
		return todos.map((todo) => (todo.id === id ? { ...todo, [keyToUpdate]: value } : todo));
	};

	const handleAddTodo = (value) =>
		setTodos({
			...todos,
			current: [
				...todos.current,
				{
					id: todos.count + 1,
					text: value,
					created: Date.now(),
					completed: null,
					editing: false,
				},
			],
			count: todos.count + 1,
		});

	const handleSetText = (id, value) =>
		setTodos({
			...todos,
			current: updateTodoValue(todos.current, id, "text", value),
		});

	const handleSetCompleted = (id) => {
		const currentIdx = todos.current.findIndex((todo) => todo.id === id);
		const completedTodo = {
			...todos.current[currentIdx],
			completed: Date.now(),
		};
		setTodos({
			...todos,
			current: todos.current.filter((todo) => todo.id !== id),
			completed: [completedTodo, ...todos.completed],
		});
	};

	const handleDeleteCompletedTodo = (id) =>
		setTodos({
			...todos,
			completed: todos.completed.filter((todo) => todo.id !== id),
		});

	const handleDeleteCurrentTodo = (id) =>
		setTodos({ ...todos, current: todos.current.filter((todo) => todo.id !== id) });

	const handleSetOrder = (currentTodos) => setTodos({ ...todos, current: currentTodos });

	useEffect(() => {
		todos.completed.forEach((todo) => {
			const now = dayjs();
			const endTime = dayjs(todo.completed);

			const diffHours = now.diff(endTime, "hour");

			if (diffHours >= 24) {
				handleDeleteCompletedTodo(todo.id);
			}
		});
	}, [todos]);

	return (
		<div
			className={`w-100 ph5 sans-serif min-vh-100 ${nightMode && "night"} ${
				nightMode ? "bg-black white" : "bg-white black"
			} bg-transition poppins`}
		>
			<div className="mw9 center">
				<Header
					showSettings={showSettings}
					nightMode={nightMode}
					focusing={focusing}
					timeDuration={timeDuration}
					timerSession={timerSession}
					setShowSettings={setShowSetting}
					setNightMode={setNightMode}
					setTimerSession={setTimerSession}
					setFocusing={setFocusing}
				/>
				<div>
					<AnimatePresence exitBeforeEnter>
						{showSettings ? (
							{
								/* <MotionDiv
								key="settings"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{
									x: { type: "spring", stiffness: 300, damping: 200 },
									duration: 0.2,
								}}
							>
								<Settings />
							</MotionDiv> */
							}
						) : (
							<MotionDiv
								key="todo"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{
									x: { type: "spring", stiffness: 300, damping: 200 },
									duration: 0.2,
								}}
							>
								<Todos
									todos={todos}
									handleSetOrder={handleSetOrder}
									handleDeleteCurrentTodo={handleDeleteCurrentTodo}
									handleSetCompleted={handleSetCompleted}
									handleSetText={handleSetText}
									nightMode={nightMode}
								/>
								<ButtonInput
									action={handleAddTodo}
									buttonText="+ add task"
									prependText={`${todos.current.length + 1}.`}
									nightMode={nightMode}
								/>
								<CompletedTodos
									todos={todos}
									handleDeleteCompletedTodo={handleDeleteCompletedTodo}
									nightMode={nightMode}
								/>
							</MotionDiv>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
};

export default NewTabApp;
