import * as React from "react";
import ButtonInput from "./ButtonInput";
import TodoButton from "./TodoButton";

const Settings = ({
	websites,
	handleAddWebsite,
	handleDeleteWebsite,
	timeDuration,
	focusing,
	setTimeDuration,
	nightMode,
}) => {
	const minDuration = 1;
	const maxDuration = 40;

	return (
		<div>
			<h1>Settings</h1>
			<div className="line-top pt3 mt4 flex">
				<div className="w-50 pr4">
					<h2>Blocked Sites</h2>
					<ButtonInput action={handleAddWebsite} buttonText="+ add website" small />
					<ul className="line-border br4 ph3 pv2 vh-50 mt2 overflow-y-scroll">
						{websites.map((website, i) => (
							<li
								className={`${
									i !== 0 && "line-top"
								} ph2 pv1 flex justify-between items-center`}
								key={`${website}-settings`}
							>
								<div className="flex justify-between items-center">
									<img
										className="mr2"
										src={`https://www.google.com/s2/favicons?domain=${website}`}
										alt={`${website} favicon`}
									/>
									<span>{website}</span>
								</div>
								<TodoButton
									hide={focusing}
									nightMode={nightMode}
									icon="delete_outline"
									action={() => handleDeleteWebsite(website)}
								/>
							</li>
						))}
					</ul>
				</div>
				<div className="w-50 pl4">
					<h2>Timer Duration</h2>
					<div className="flex items-center f2">
						<button
							className={`bn flex br-pill ph2 pv1 pointer mr3 primary todo-action ${
								timeDuration <= minDuration || focusing ? "disabled" : ""
							}`}
							type="button"
							onClick={() => setTimeDuration(timeDuration - 1)}
							disabled={timeDuration <= minDuration || focusing}
						>
							-
						</button>
						{timeDuration} min
						<button
							className={`bn flex br-pill ph2 pv1 pointer ml3 primary todo-action ${
								timeDuration >= maxDuration || focusing ? "disabled" : ""
							}`}
							type="button"
							onClick={() => setTimeDuration(timeDuration + 1)}
							disabled={timeDuration >= maxDuration || focusing}
						>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
