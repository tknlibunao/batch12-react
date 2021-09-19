import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [guessCount, setGuessCount] = useState(0);
	const [bullCount, setBullCount] = useState(0);
	const [cowCount, setCowCount] = useState(0);
	const [userInput, setUserInput] = useState('');
	const [userGuess, setUserGuess] = useState('');
	const [secretNumber, setSecretNumber] = useState('');
	const [win, setWin] = useState(false);
	const [showError, setShowError] = useState(true);

	// Generate 4-digit number (UNIQUE DIGITS)
	useEffect(() => {
		let integers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		let secretNumber = '';

		let rand = Math.floor(Math.random() * 9) + 1;
		let digits = [rand];
		integers.splice(integers.indexOf(rand), 1);

		for (let i = 0; i < 3; i++) {
			rand = Math.floor(Math.random() * integers.length);
			digits.push(integers[rand]);
			integers.splice(rand, 1);
		}

		digits.forEach((digit) => {
			secretNumber = secretNumber + digit;
		});

		setSecretNumber(secretNumber);
	}, []);

	const submitUserGuess = () => {
		let bull = 0;
		let cow = 0;

		if (showError) return alert('Input not a 4-digit number!');
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (userInput[i] === userInput[j] && i !== j) return alert('Digits are not unique!');
			}
		}

		setGuessCount((guessCount) => guessCount + 1);
		setUserGuess(userInput);

		if (userInput.length !== 4) {
			console.log('Not submitted. Guess must be 4-digits!', userGuess);
		} else {
			console.log('This userGuess was submitted:', userGuess);
		}

		

		for (let i = 0; i < userInput.length; i++) {
			if (secretNumber.includes(userInput[i]))
				secretNumber[i] === userInput[i] ? bull++ : cow++;
		}
		setBullCount(bull);
		setCowCount(cow);

		if (bull === 4) setWin(true);
	};

	const checkUserInput = (e) => {
		const value = e.target.value;
		if (value.length !== 4) {
			console.log('Guess must be 4-digits!');
			setShowError(true);
		} else {
			setShowError(false);
			setUserInput(value);
			console.log('userInput is set to', value);
		}
	};

	const playAgain = () => {
		window.location.reload();
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>BULLS AND COWS</h1>
			</header>

			{!win && (
				<div className='Input-guess'>
					<div className='User-input'>
						<input
							type='text'
							autoComplete='off'
							name='userGuess'
							onChange={(e) => checkUserInput(e)}
						/>
						<button onClick={submitUserGuess}>Guess</button>
					</div>
					<div className='Error-message'>
						{showError && <div className='Error'>Guess must be 4-digits!</div>}
					</div>
				</div>
			)}

			{win && (
				<div className='User-won'>
					<h1>You guessed it right!</h1>
					<div className='Secret-number'>
						<h2>Secret Number: {secretNumber}</h2>
					</div>
					<button onClick={playAgain}>Play Again</button>
				</div>
			)}

			<div className='Game-stats'>
				<h3>Total Guesses: {guessCount}</h3>
				<h3>User guess: {userGuess}</h3>
				<h3>
					Bulls: {bullCount} Cows: {cowCount}
				</h3>
			</div>
		</div>
	);
}

export default App;
