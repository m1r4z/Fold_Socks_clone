import * as React from "react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const getTimeLeft = (timerSession) => {
	const { end } = timerSession;
	const now = dayjs();
	const endTime = dayjs(end);
	const diffSeconds = endTime.diff(now, "second");

	const minutes = Math.floor(diffSeconds / 60);
	const seconds = diffSeconds % 60;

	if (minutes < 0 || seconds < 0) {
		return { minutes: -1, seconds: -1 };
	}

	return {
		minutes: Math.floor(diffSeconds / 60),
		seconds: diffSeconds % 60,
	};
};

const doubleDigit = (num) => {
	const numStr = num.toString();
	return numStr.length === 1 ? `0${numStr}` : numStr;
};

const Time = ({ timerSession, setTimerSession, setFocusing }) => {
	const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });

	const handleSetTime = () => {
		const t = getTimeLeft(timerSession);
		if (t.minutes < 0) {
			setTimerSession({ start: dayjs().valueOf(), end: dayjs().valueOf() });
			setFocusing(false);
		} else {
			setTimer(getTimeLeft(timerSession));
		}
	};

	useEffect(() => {
		const intervalId = setInterval(handleSetTime, 1000);
		handleSetTime();
		return () => clearInterval(intervalId);
	}, []);

	return (
		<span className="f2 fw6 fs-red">
			{doubleDigit(timer.minutes)}:{doubleDigit(timer.seconds)}
		</span>
	);
};

export default Time;
