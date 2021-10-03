import * as React from "react";
import { motion } from "framer-motion";
import SettingsToggle from "./SettingsToggle";
import FocusOrCountdown from "./FocusOrCountdown";

const MotionDiv = motion.div;

const Header = ({
	showSettings,
	setShowSettings,
	nightMode,
	setNightMode,
	focusing,
	timeDuration,
	timerSession,
	setTimerSession,
	setFocusing,
}) => {
	return (
		<div className="pv4 w-100 flex items-center">
			<div className="w-40">
				<FocusOrCountdown
					focusing={focusing}
					timerDuration={timeDuration}
					nightMode={nightMode}
					timerSession={timerSession}
					setTimerSession={setTimerSession}
					setFocusing={setFocusing}
				/>
			</div>
			<div
				className={`flex justify-center w-20 logo no-select poppins fw8 i f4 color-transition ${
					nightMode ? "white" : "black"
				}`}
			>
				FOLD
				<br />
				SOCKS
			</div>
			<div className="flex justify-end items-center w-40">
				{nightMode ? (
					<div role="button" onClick={() => setNightMode(false)}>
						<i className="pointer no-select material-icons white color-transition mr2">
							brightness_5
						</i>
					</div>
				) : (
					<div role="button" onClick={() => setNightMode(true)}>
						<i className="pointer no-select material-icons black color-transition mr2">
							brightness_2
						</i>
					</div>
				)}
				{
					<MotionDiv initial={false} animate={showSettings ? "open" : "closed"}>
						<SettingsToggle
							toggle={
								showSettings
									? () => setShowSettings(false)
									: () => setShowSettings(true)
							}
							nightMode={nightMode}
						/>
					</MotionDiv>
				}
			</div>
		</div>
	);
};

export default Header;
