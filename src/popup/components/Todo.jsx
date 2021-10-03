import * as React from "react";

const Todo = ({ backgroundClasses, children, small }) => (
	<div
		className={`todo pointer ${!small && "f4"} ${
			small ? "pv2 ph2" : "pl4 pv2"
		} br-pill bg-transition ${!small && "fw4"} ${backgroundClasses}`}
	>
		<div className="flex justify-between items-center">{children}</div>
	</div>
);

export default Todo;
