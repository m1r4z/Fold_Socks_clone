import * as React from "react";

const TodoButton = ({ action, icon, nightMode, primary, hide }) => (
	<div
		className={`${!hide && "todo-action"} flex br-pill ph2 pv1 pointer ${
			nightMode && "night"
		} ${primary && "primary"}`}
		onClick={action}
		onKeyPress={action}
		role="button"
		tabIndex={0}
	>
		<i className="material-icons f3 color-transition">{icon}</i>
	</div>
);

export default TodoButton;
