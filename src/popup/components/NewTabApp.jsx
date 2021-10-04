import * as React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import dayjs from "dayjs";
import Todos from "./Todos";
import CompletedTodos from "./CompletedTodos";
import ButtonInput from "./ButtonInput";
import Settings from "./Settings";
import {
	addLocalStorageChangeListener,
	getDataFromLocalStorage,
	setDataInLocalStorage,
} from "../../common/storageUtil";

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

	const [websites, setWebsites] = useState([
		"facebook.com",
		"twitter.com",
		"tiktok.com",
		"instagram.com",
		"youtube.com",
		"reddit.com",
		"medium.com",
		"imgur.com",
		"pinterest.com",
		"www.nytimes.com",
		"theguardian.com",
		"cnn.com",
		"huffingtonpost.com",
		"www.foxnews.com",
		"www.espn.com",
		"news.ycombinator.com",
		"vox.com",
		"wikipedia.org",
		"netflix.com",
		"www.amazon.com",
		"hulu.com",
		"booking.com",
		"tripadvisor.com",
		"expedia.com",
		"ebay.com",
		"mic.com",
		"www.vimeo.com",
		"9gag.com",
		"craigslist.org",
		"etsy.com",
		"ted.com",
		"blogger.com",
		"imdb.com",
		"twitch.tv",
		"soundcloud.com",
		"theonion.com",
		"tmz.com",
		"vice.com",
		"rottentomatoes.com",
		"bbc.com",
		"forbes.com",
		"economist.com",
		"nbcnews.com",
		"msnbc.com",
		"businessinsider.com",
		"buzzfeed.com",
		"bloomberg.com",
		"usatoday.com",
		"washingtonpost.com",
		"npr.org",
		"wsj.com",
		"time.com",
		"news.google.com",
		"cnet.com",
		"cnbc.com",
		"coinbase.com",
		"blockchain.info",
		"coinmarketcap.com",
		"bleacherreport.com",
		"foxsports.com",
		"cbssports.com",
		"mlb.com",
		"nfl.com",
		"nhl.com",
		"nba.com",
		"techcrunch.com",
		"mashable.com",
		"engadget.com",
		"gizmodo.com",
		"gigaom.com",
		"boingboing.net",
		"wired.com",
		"theverge.com",
		"lifehacker.com",
		"recode.net",
		"arstechnica.com",
		"thenextweb.com",
		"venturebeat.com",
		"producthunt.com",
	]);

	const handleSetNightMode = (value) => {
		setNightMode(value);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), nightMode: value });
	};

	const handleSetFocusing = (value) => {
		setFocusing(value);
		console.log("handleSetFocusing: ", value);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), focusing: value });
	};

	const handleSetTimerSession = (value) => {
		setTimerSession(value);
		//console.log("handleSetTimerSession: ", value);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), timerSession: value });
	};

	const handleSetTimeDuration = (value) => {
		setTimeDuration(value);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), timeDuration: value });
	};

	const handleAddWebsite = (site) => {
		let temp = [site, ...websites];
		setWebsites(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), websites: temp });
	};

	const handleDeleteWebsite = (site) => {
		let temp = websites.filter((website) => website !== site);
		setWebsites(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), websites: temp });
	};

	const updateTodoValue = (todos, id, keyToUpdate, value) => {
		return todos.map((todo) => (todo.id === id ? { ...todo, [keyToUpdate]: value } : todo));
	};

	const handleAddTodo = (value) => {
		let temp = {
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
		};
		setTodos(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), todos: temp });
	};

	const handleSetText = (id, value) => {
		let temp = {
			...todos,
			current: updateTodoValue(todos.current, id, "text", value),
		};
		setTodos(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), todos: temp });
	};

	const handleSetCompleted = (id) => {
		const currentIdx = todos.current.findIndex((todo) => todo.id === id);
		const completedTodo = {
			...todos.current[currentIdx],
			completed: Date.now(),
		};

		let temp = {
			...todos,
			current: todos.current.filter((todo) => todo.id !== id),
			completed: [completedTodo, ...todos.completed],
		};
		setTodos(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), todos: temp });
	};

	const handleDeleteCompletedTodo = (id) => {
		let temp = {
			...todos,
			completed: todos.completed.filter((todo) => todo.id !== id),
		};
		setTodos(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), todos: temp });
	};

	const handleDeleteCurrentTodo = (id) => {
		let temp = { ...todos, current: todos.current.filter((todo) => todo.id !== id) };
		setTodos(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), todos: temp });
	};

	const handleSetOrder = (currentTodos) => {
		let temp = { ...todos, current: currentTodos };
		setTodos(temp);
		setDataInLocalStorage({ ...getDataFromLocalStorage(), todos: temp });
	};

	const syncStorageData = (data) => {
		if (data) {
			console.log(
				data.focusing !== focusing,
				data.focusing,
				focusing,
				timerSession,
				nightMode
			);
			if (data.timerSession) setTimerSession(data.timerSession);
			else setDataInLocalStorage({ ...data, timerSession });
			if (data.focusing != undefined) setFocusing(data.focusing);
			else setDataInLocalStorage({ ...data, focusing });
			if (data.nightMode != undefined) setNightMode(data.nightMode);
			else setDataInLocalStorage({ ...data, nightMode });
			if (data.timeDuration != undefined) setTimeDuration(data.timeDuration);
			else setDataInLocalStorage({ ...data, timeDuration });
			if (data.todos) setTodos(data.todos);
			else setDataInLocalStorage({ ...data, todos });
			if (data.websites) setWebsites(data.websites);
			else setDataInLocalStorage({ ...data, websites });
		} else {
			setDataInLocalStorage({
				nightMode,
				focusing,
				timeDuration,
				timerSession,
				todos,
				websites,
			});
		}
	};

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

	useEffect(() => {
		addLocalStorageChangeListener(() => {
			let data = getDataFromLocalStorage();
			//console.log("storage update ", data);
			syncStorageData(data);
		});
		//init
		let storageData = getDataFromLocalStorage();
		syncStorageData(storageData);
	}, []);

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
					setNightMode={handleSetNightMode}
					setTimerSession={handleSetTimerSession}
					setFocusing={handleSetFocusing}
				/>
				<div>
					<AnimatePresence exitBeforeEnter>
						{showSettings ? (
							<MotionDiv
								key="settings"
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								transition={{
									x: { type: "spring", stiffness: 300, damping: 50 },
									duration: 0.2,
								}}
							>
								<Settings
									websites={websites}
									handleAddWebsite={handleAddWebsite}
									handleDeleteWebsite={handleDeleteWebsite}
									nightMode={nightMode}
									timeDuration={timeDuration}
									focusing={focusing}
									setTimeDuration={handleSetTimeDuration}
								/>
							</MotionDiv>
						) : (
							<MotionDiv
								key="todo"
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{
									x: { type: "spring", stiffness: 300, damping: 50 },
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
