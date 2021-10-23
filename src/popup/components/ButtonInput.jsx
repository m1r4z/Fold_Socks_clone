import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Todo from "./Todo";
import LineInput from "./LineInput";

const MotionDiv = motion.div;

const ButtonInput = ({
	action,
	buttonText,
	prependText,
	small,
	nightMode,
	setShowSubscriptionPage,
}) => {
	const [showInput, setShowInput] = useState(false);

	const bgColorsInput = nightMode ? "fs-b-input-dark" : "fs-b-input-light";

	const bgColorsButton = nightMode ? "fs-hover-black" : "fs-hover-white";

	const handleSetShowSubscriptionPage = (cb) => {
		if (setShowSubscriptionPage) {
			//console.log("handleOpenSubscriptionPageOrCallback");
			chrome.runtime.sendMessage({ query: "CHECK_PAYMENT_STATUS" }, (status) => {
				console.log("status: ", status);
				if (!status.paid) {
					setShowSubscriptionPage(true);
				} else {
					cb();
				}
			});
		} else {
			cb();
		}
	};

	return showInput ? (
		<MotionDiv
			animate={{ width: "100%" }}
			initial={{ width: "10%" }}
			transition={{ ease: "easeIn", duration: 0.1 }}
		>
			<Todo backgroundClasses={bgColorsInput} small={small}>
				<LineInput prependText={prependText} action={action} setShowInput={setShowInput} />
			</Todo>
		</MotionDiv>
	) : (
		<div
			role="button"
			onClick={() => handleSetShowSubscriptionPage(() => setShowInput(true))}
			className={`fs-red tc ${
				small ? "pv2 ph2 dib" : "pv2 f5 w4"
			} pointer bg-transition br-pill ba bw1 fs-bg-hover-red ${bgColorsButton} b-red`}
		>
			<div className="pv1 fw6">{buttonText}</div>
		</div>
	);
};

export default ButtonInput;
