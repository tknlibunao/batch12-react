import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import UserWin from './components/UserWin/UserWin';
import GameStatsTable from './components/GameStatsTable/GameStatsTable';

import './App.css';

function App() {
	const [guessCount, setGuessCount] = useState(0);
	const [userInput, setUserInput] = useState('');
	const [secretNumber, setSecretNumber] = useState('');
	const [userGuessList, setUserGuessList] = useState([]);
	const [userWin, setUserWin] = useState(false);
	const [showError, setShowError] = useState(true);
	const [errorMessage, setErrorMessage] = useState('Enter 4 unique digits');

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

		// For checking and testing purposes
		console.log('Secret Number is', secretNumber);
		secretNumber = '1234';
		return secretNumber;
	};

	// Check if not a number
	const isNaN = (testInput) => {
		if (!testInput.match(/^[1-9]\d*$/g)) return true;
		return false;
	};

	// Check if digits are repeating
	const isRepeating = (testInput) => {
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (testInput[i] === testInput[j] && i !== j) return true;
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

	useEffect(() => {
		setSecretNumber(generateSecretNumber);
	}, []);

	// On user submit, validate user input
	const submitUserGuess = () => {
		// Input error handling
		if (isNaN(userInput) || isRepeating(userInput)) {
			setShowError(true);
			setUserInput('');
			if (isNaN(userInput))
				return setErrorMessage('Input is not a valid number!');
			if (isRepeating(userInput))
				return setErrorMessage('Input digits are not unique!');
		}
		setGuessCount((guessCount) => guessCount + 1);

		let currentGuess = checkGuess(userInput, secretNumber);
		if (currentGuess.bullCount === 4) setUserWin(true);

		setUserGuessList((userGuessList) => [currentGuess, ...userGuessList]);
		setUserInput('');
		setErrorMessage('Enter 4 unique digits');
		setShowError(true);
	};

	// Show error until user has typed 4 characters
	const checkInputError = (value) => {
		setErrorMessage('Enter 4 unique digits');
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
			<Header className='App-header' title='BULLS AND COWS' />
			{!userWin && (
				<Form
					formAction={submitFormHandler}
					buttonAction={submitUserGuess}
					inputChange={checkInputError}
					errorAction={showError}
					errorMessage={errorMessage}
				/>
			)}

			{userWin && (
				<UserWin
					secretNumber={secretNumber}
					guessCount={guessCount}
					clickAction={playAgain}
				/>
			)}

			<GameStatsTable userGuessList={userGuessList} />
		</div>
	);
}

export default App;
