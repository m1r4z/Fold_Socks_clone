import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import Todo from "./Todo";
import LineInput from "./LineInput";
import { getDataFromStorage } from "../../common/storageUtil";

const MotionDiv = motion.div;

const ButtonInput = ({ action, buttonText, prependText, small, nightMode }) => {
	const [showInput, setShowInput] = useState(false);

	const bgColorsInput = nightMode ? "fs-b-input-dark" : "fs-b-input-light";

	const bgColorsButton = nightMode ? "fs-hover-black" : "fs-hover-white";

	const handleSetShowInput = () => {
		chrome.runtime.sendMessage({ query: "CHECK_PAYMENT_STATUS" }, (res) => {
			setShowInput(res.paid);
		});
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
			onClick={() => handleSetShowInput(true)}
			className={`fs-red tc ${
				small ? "pv2 ph2 dib" : "pv2 f5 w4"
			} pointer bg-transition br-pill ba bw1 fs-bg-hover-red ${bgColorsButton} b-red`}
		>
			<div className="pv1 fw6">{buttonText}</div>
		</div>
	);
};

export default ButtonInput;
