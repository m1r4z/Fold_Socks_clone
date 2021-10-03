import * as React from "react";
import { useEffect, useState, useRef } from "react";

const LineInput = ({ small, prependText, action, setShowInput, initValue, nightMode }) => {
	const [value, setStateValue] = useState("");

	const inputRef = useRef(null);
	const formRef = useRef(null);

	const inputColors = nightMode ? "white" : "black";

	// Hack for getting current input value inside the click listener
	const valueRef = useRef(value);
	const setValue = (data) => {
		valueRef.current = data;
		setStateValue(data);
	};

	useEffect(() => {
		setStateValue(initValue);
		inputRef.current.focus();
	}, []);

	useEffect(() => {
		function handleClickOutside(event) {
			if (formRef.current && !formRef.current.contains(event.target)) {
				if (valueRef.current === "") {
					setValue("");
					setShowInput(false);
				}
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [formRef]);

	return (
		<div ref={formRef} className={`flex items-center w-100 ${!small && "pv1"}`}>
			{prependText && <span className={`w2 fw4 f6 ${inputColors}`}>{prependText}</span>}

			<form
				className="w-100"
				onSubmit={(e) => {
					e.preventDefault();
					if (value) {
						action(value);
					}
					setValue("");
					setShowInput(false);
				}}
			>
				<input
					className={`bg-transparent pa0 bn w-100 poppins ${
						!small && "fw4"
					} ${inputColors}`}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					type="text"
					ref={inputRef}
				/>
			</form>
		</div>
	);
};

export default LineInput;
