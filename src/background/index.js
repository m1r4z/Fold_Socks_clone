import dayjs from "dayjs";
import {
	addLocalStorageChangeListener,
	getDataFromLocalStorage,
	setDataInLocalStorage,
	setDataInStorage,
} from "../common/storageUtil";

let extpay = window.ExtPay("foldsocks");
extpay.startBackground();

extpay.getUser().then((user) => {
	setDataInStorage({ paid: user.paid });
});

let badgeTextInterval;

const setIconWhite = () => chrome.browserAction.setIcon({ path: "fold_icon_white_64.png" });
const setIconRed = () => {
	chrome.browserAction.setIcon({ path: "fold_icon_red_64.png" });
	chrome.browserAction.setBadgeBackgroundColor({ color: "#F36369" });
};

const getMinute = (end) => {
	const now = dayjs();
	const endTime = dayjs(end);
	if (endTime.isBefore(now)) {
		return -1;
	}

	const diffSeconds = endTime.diff(now, "second");
	const minutes = Math.floor(diffSeconds / 60);

	return minutes === 0 ? "< 1" : minutes;
};

const startTimerCountdown = (end, timeout = 60000) => {
	console.log("startTimerCountdown");
	setIconRed();

	chrome.browserAction.setBadgeText({ text: `${getMinute(end)}m` });
	return setInterval(() => {
		const minutes = getMinute(end);
		console.log(minutes);
		if (minutes === -1) {
			let storageData = getDataFromLocalStorage();
			setDataInLocalStorage({
				...storageData,
				timerSession: { start: dayjs().valueOf(), end: dayjs().valueOf() },
				focusing: false,
			});
			clearInterval(badgeTextInterval);
			badgeTextInterval = null;
		}
		return chrome.browserAction.setBadgeText({ text: `${minutes}m` });
	}, timeout);
};

const createTimerSession = (duration) => {
	let start = dayjs();
	let end = start.add(duration, "m");
	console.log("createTimerSession: ", start.valueOf(), end.valueOf());
	return { start: start.valueOf(), end: end.valueOf() };
};

chrome.browserAction.onClicked.addListener(() => {
	let storageData = getDataFromLocalStorage();
	if (!storageData.focusing) {
		let session = createTimerSession(storageData.timeDuration);
		setDataInLocalStorage({
			...storageData,
			focusing: true,
			timerSession: session,
		});
		badgeTextInterval = startTimerCountdown(session.end);
	}
});

addLocalStorageChangeListener(() => {
	let storageData = getDataFromLocalStorage();
	console.log("storage update ", storageData);
	if (storageData.focusing && !badgeTextInterval) {
		badgeTextInterval = startTimerCountdown(storageData.timerSession.end);
	}

	if (!storageData.focusing) {
		setIconWhite();
		chrome.browserAction.setBadgeText({ text: "" });
		clearInterval(badgeTextInterval);
		badgeTextInterval = null;
	}
});

/******************************************/

let url;
let tabId;

let oldTodoText = "";
let oldFocusing = false;
let oldBlocking = false;

const checkShouldBlock = (tabUrl, blockListUrl) =>
	new URL(tabUrl).host === blockListUrl || new URL(tabUrl).host === `www.${blockListUrl}`;

const parseData = (root) => {
	console.log("parseData ", root);
	let todoText;
	try {
		todoText = root.todos.current[0].text;
	} catch {
		todoText = "Time to Focus.";
	}

	console.log(todoText);

	const focusing = root.focusing;
	console.log(focusing);

	//if (oldTodoText !== todoText || oldFocusing !== focusing) {
	if (focusing) {
		const websites = root.websites;

		websites.forEach((website) => {
			console.log(url, website);
			if (checkShouldBlock(url, website)) {
				console.log("match");
				oldBlocking = true;
				chrome.tabs.sendMessage(tabId, { query: "BLOCK_PAGE", text: todoText });
				//mountBlocker(blockContent(todoText));
			}
		});
	} else if (oldFocusing && oldBlocking) {
		chrome.tabs.reload(tabId);
	}

	oldTodoText = todoText;
	oldFocusing = focusing;
	//}
};

const processCurrentTab = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		console.log(tabs[0]);
		url = tabs[0].url;
		tabId = tabs[0].id;
		parseData(getDataFromLocalStorage());
	});
};

chrome.tabs.onUpdated.addListener(function (id, changeInfo, tab) {
	if (tab.active /* && changeInfo.status === "complete" */) {
		processCurrentTab();
	}
});

chrome.tabs.onActivated.addListener(function (activeTabInfo) {
	processCurrentTab();
});

addLocalStorageChangeListener(() => {
	parseData(getDataFromLocalStorage());
});

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
	console.log(request);
	if (request.query === "OPEN_EXTPAY") {
		extpay.getUser().then((user) => {
			setDataInStorage({ paid: user.paid });
			if (!user.paid) {
				extpay.openPaymentPage();
			}
		});
	} else if (request.query === "CHECK_PAYMENT_STATUS") {
		extpay.getUser().then((user) => {
			setDataInStorage({ paid: user.paid });
			sendMessage({ paid: user.paid });
		});
	}
	return true;
});

extpay.onPaid.addListener((user) => {
	setDataInStorage({ paid: user.paid });
});
