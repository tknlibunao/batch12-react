import React, { useState, useEffect } from 'react';
import GameStatsTable from './GameStatsTable';
import UserWin from './UserWin';
import './App.css';

function App() {
	const [guessCount, setGuessCount] = useState(0);
	const [userInput, setUserInput] = useState('');
	const [secretNumber, setSecretNumber] = useState('');
	const [userGuessList, setUserGuessList] = useState([]);
	const [userWin, setUserWin] = useState(false);
	const [showError, setShowError] = useState(true);

	useEffect(() => {
		setSecretNumber(generateSecretNumber);
	}, []);

	// On user submit, validate user input
	const submitUserGuess = () => {
		// Input error handling
		if (isNaN(userInput)) return alert('Input is not a valid number!');
		if (isError(showError)) return alert('Input is not a 4-digit number!');
		if (isRepeating(userInput)) return alert('Input digits are not unique!');

		setGuessCount((guessCount) => guessCount + 1);

		let currentGuess = checkGuess(userInput, secretNumber);
		if (currentGuess.bullCount === 4) setUserWin(true);

		setUserGuessList((userGuessList) => [currentGuess, ...userGuessList]);
	};

	// Show error until user has typed 4 characters
	const checkInputError = (value) => {
		if (value.length !== 4) return setShowError(true);
		setShowError(false);
		setUserInput(value);
	};

	// On form submit, reset only the input field
	const submitFormHandler = (e) => {
		e.preventDefault();
		e.target.reset();
	};

	// Refresh page
	const playAgain = () => {
		window.location.reload();
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<h1>BULLS AND COWS</h1>
			</header>

			{!userWin && (
				<form className='Form' onSubmit={(e) => submitFormHandler(e)}>
					<div className='Input-guess'>
						<div className='User-input'>
							<input
								className='Input-field'
								name='userGuess'
								type='text'
								maxLength='4'
								autoComplete='off'
								onChange={(e) => checkInputError(e.target.value)}
							/>
							<input
								className='Submit-btn'
								type='submit'
								value='Guess'
								onClick={submitUserGuess}
							/>
						</div>
						<div className='Error-message'>
							{showError && <div className='Error'>Enter 4 unique digits</div>}
						</div>
					</div>
				</form>
			)}

			{userWin && (
				<UserWin
					secretNumber={secretNumber}
					guessCount={guessCount}
					clickAction={playAgain}
				/>
			)}

			<div className='Game-stats-container'>
				<div className='Scroll-table'>
					<GameStatsTable userGuessList={userGuessList} />
				</div>
			</div>
		</div>
	);
}

// Generate a 4-digit number (non-repeating digits)
const generateSecretNumber = () => {
	let integers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	let secretNumber = String(Math.floor(Math.random() * 9) + 1);
	integers.splice(integers.indexOf(Number(secretNumber)), 1);

	for (let i = 0; i < 3; i++) {
		let idx = Math.floor(Math.random() * integers.length);
		secretNumber += integers[idx];
		integers.splice(idx, 1);
	}

	// For checking purposes
	console.log('Secret Number is', secretNumber);
	return secretNumber;
};

// Check if not a number
const isNaN = (testInput) => {
	if (!testInput.match(/^[1-9]\d*$/g)) return true;
	return false;
};

// Check if there is input error (length !== 4)
const isError = (testError) => {
	if (testError) return true;
	return false;
};

// Check if digits are repeating
const isRepeating = (testInput) => {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (testInput[i] === testInput[j] && i !== j) {
				return true;
			}
		}
	}
	return false;
};

// Count number of bulls and cows
const checkGuess = (guess, number) => {
	let bull = 0;
	let cow = 0;
	for (let i = 0; i < guess.length; i++) {
		if (number.includes(guess[i])) number[i] === guess[i] ? bull++ : cow++;
	}

	return { userGuess: guess, bullCount: bull, cowCount: cow };
};

export { generateSecretNumber, isNaN, isError, isRepeating, checkGuess };
export default App;
