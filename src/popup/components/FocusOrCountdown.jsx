import * as React from "react";
import { useState, useEffect } from "react";
import Time from "./Time";
import dayjs from "dayjs";

const FocusOrCountdown = ({
	focusing,
	timerDuration,
	nightMode,
	timerSession,
	setTimerSession,
	setFocusing,
}) => {
	const [cancelConfirm, setCancelConfirm] = useState(false);

	useEffect(() => {
		if (cancelConfirm) {
			setTimeout(() => setCancelConfirm(false), 5000);
		}
	}, [cancelConfirm]);

	const createTimerSession = (duration) => {
		let start = dayjs();
		let end = start.add(duration, "m");
		console.log("createTimerSession: ", start.valueOf(), end.valueOf());
		return { start: start.valueOf(), end: end.valueOf() };
	};

	return (
		<div>
			{focusing ? (
				<div>
					<div className={"db"}>
						<Time
							timerSession={timerSession}
							setTimerSession={setTimerSession}
							setFocusing={setFocusing}
						/>
					</div>
					<div className={"dib"}>
						{cancelConfirm ? (
							<div className={"f6"}>
								<span className="mr3">Are you sure?</span>
								<span
									className="mr3 underline-hover pointer"
									onClick={() => setCancelConfirm(false)}
								>
									No.
								</span>
								<span
									className="underline-hover pointer"
									onClick={() => {
										setTimerSession({
											start: dayjs().valueOf(),
											end: dayjs().valueOf(),
										});
										setFocusing(false);
									}}
								>
									Yes.
								</span>
							</div>
						) : (
							<div
								className="underline-hover pointer f6"
								onClick={() => {
									setCancelConfirm(true);
								}}
							>
								cancel
							</div>
						)}
					</div>
				</div>
			) : (
				<button
					className={`bn tc ph3 pv2 f4 fw6 pointer bg-transition br-pill fs-bg-red`}
					onClick={() => {
						setTimerSession(createTimerSession(timerDuration));
						setFocusing(true);
					}}
				>
					<div className={`pv1 i fw8 ph3 ${nightMode ? "black" : "white"}`}>FOCUS</div>
				</button>
			)}
		</div>
	);
};

export default FocusOrCountdown;
