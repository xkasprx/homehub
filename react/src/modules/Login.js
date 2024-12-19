import "../assets/css/Login.css";
import { useEffect, useState } from 'react';
import settings from '../assets/json/settings.json';

function Login(props) {
	let [code, setCode] = useState('');
	let [error, setError] = useState(false);
	let [success, setSuccess] = useState(false);
	let adminCode = settings.adminCode;

	let handleButtonClick = (num) => {
		if (num === `\u232B`) {
			setCode(code.slice(0, -1));
			setError(false);
		}else if (code.length < adminCode.length) {
			setCode(code + num);
			setError(false);
		}
	};

	let handleSubmit = () => {
		if (code === adminCode) {
			setSuccess(true);

			setTimeout(() => {
				setSuccess(false);
				props.setLoggedIn(true);
			}, 2000);

		} else {
			document.querySelectorAll('.keypadNumber').forEach(button => {
				button.disabled = true;
			});
			setError(true);
			setCode('');
			
			setTimeout(() => {
				document.querySelectorAll('.keypadNumber').forEach(button => {
					button.disabled = false;
				});
				setError(false);
			}, 3000);
		}
	};

	useEffect(() => {
		if (code.length === adminCode.length) {
			handleSubmit();
		}
	});

	let renderButton = (num) => (
		<button key={num} className="keypadNumber" onClick={() => handleButtonClick(num)}>{num}</button>
	);

	return (
		<div className="inputScreen">
			<div className="loginTitle">
				<h1 className={error ? "loginError" : success ? "loginSuccess" : "loginHeader"}>{error ? "Invalid Code" : success ? "Log In Successful" : "Enter Code"}</h1>
			</div>
			<div className="keypadBox">
				<div className={error ? "keypadDisplay entryError" : success ? "keypadDisplay entrySuccess" : "keypadDisplay entry"}>
					<h1>{error ? '•'.repeat(adminCode.length): '•'.repeat(code.length)}</h1>
				</div>
				<div className="keypad">
					<div className="keypadTop">
						{[1, 2, 3].map(renderButton)}
					</div>
					<div className="keypadMiddle">
						{[4, 5, 6].map(renderButton)}
					</div>
					<div className="keypadBottom">
						{[7, 8, 9].map(renderButton)}
					</div>
					<div className="keypadZeroClr">
						{[`\u232B`, 0].map(renderButton)}
					</div>
				</div>
			</div>
		</div>
	);
}


export default Login;