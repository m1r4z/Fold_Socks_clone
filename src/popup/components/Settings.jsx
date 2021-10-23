import * as React from "react";
import { useState } from "react";
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
	const [showSubscriptionPage, setShowSubscriptionPage] = useState(false);
	const minDuration = 1;
	const maxDuration = 40;

	const handleOpenPaymentPage = () => {
		chrome.runtime.sendMessage({ query: "OPEN_EXTPAY" });
	};

	const handleSetShowSubscriptionPage = (cb) => {
		//console.log("handleOpenSubscriptionPageOrCallback");
		chrome.runtime.sendMessage({ query: "CHECK_PAYMENT_STATUS" }, (status) => {
			console.log("status: ", status);
			if (!status.paid) {
				setShowSubscriptionPage(true);
			} else {
				cb();
			}
		});
	};

	return showSubscriptionPage ? (
		<div style={{ textAlign: "center" }}>
			<div style={{ width: "30%", margin: "0 auto", lineHeight: "20px" }}>
				<h2>Get premium access to more features</h2>
				<p style={{ fontSize: "12px", lineHeight: "20px" }}>
					Accomplish your goals daily by breaking them into small tasks and focusing on
					one thing at a time.
				</p>
				<span style={{ fontSize: "15px", fontWeight: 600 }}>
					Get Premium
					<br />
				</span>
				<p style={{ fontSize: "30px", fontWeight: 600 }}>$24</p>
				<span style={{ fontSize: "12px" }}>
					For 1 year
					<br />
				</span>
				<p style={{ fontSize: "20px" }}>😻😻</p>
				<p style={{ fontSize: "12px" }}>
					Customized Time duration, <br /> add custom websites
				</p>
				<p>
					<button
						className={`bn tc ph3 pv2 f4 fw6 pointer bg-transition br-pill fs-bg-red`}
						onClick={() => handleOpenPaymentPage()}
					>
						<div className={`pv1 i fw8 ph3 ${nightMode ? "black" : "white"}`}>
							Check out
						</div>
					</button>
					<p>
						<a
							href="#"
							onClick={() => setShowSubscriptionPage(false)}
							style={{ color: "inherit", textDecoration: "none" }}
						>
							Maybe Later
						</a>
					</p>
				</p>
				<p style={{ fontSize: "10px" }}>
					You will be charged $24 (annual plan) through. You can cancel at any time if
					your not satisfied.
				</p>
			</div>
		</div>
	) : (
		<div>
			<h1>Settings</h1>
			<div className="line-top pt3 mt4 flex">
				<div className="w-50 pr4">
					<h2>Blocked Sites</h2>
					<ButtonInput
						action={handleAddWebsite}
						buttonText="+ add website"
						small
						setShowSubscriptionPage={setShowSubscriptionPage}
					/>
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
							onClick={() =>
								handleSetShowSubscriptionPage(() =>
									setTimeDuration(timeDuration - 1)
								)
							}
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
							onClick={() =>
								handleSetShowSubscriptionPage(() =>
									setTimeDuration(timeDuration + 1)
								)
							}
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
