import { render } from '@testing-library/react';
import App, {
	generateSecretNumber,
	isNaN,
	isRepeating,
	checkGuess,
} from './App';

test('renders App', () => {
	render(<App />);
});

describe('Generated secret number', () => {
	it('should be a valid number', () => {
		let testNumber = generateSecretNumber();
		expect(isNaN(testNumber)).not.toBe(true);
	});

	it('should have four digits', () => {
		let testNumber = generateSecretNumber();
		expect(testNumber.length).toBe(4);
	});

	it('should have unique digits', () => {
		let testNumber = generateSecretNumber();
		expect(isRepeating(testNumber)).not.toBe(true);
	});
});

describe('User guess should be validated correctly', () => {
	it('should count 0 bull and 0 cow', () => {
		let secretNumber = '1234';
		let testUserGuess = '5678';
		let currentGuess = checkGuess(testUserGuess, secretNumber);
		expect(currentGuess.bullCount).toBe(0);
		expect(currentGuess.cowCount).toBe(0);
	});

	it('should count 0 bull and 4 cows', () => {
		let secretNumber = '1234';
		let testUserGuess = '4321';
		let currentGuess = checkGuess(testUserGuess, secretNumber);
		expect(currentGuess.bullCount).toBe(0);
		expect(currentGuess.cowCount).toBe(4);
	});

	it('should count 4 bulls and 0 cow', () => {
		let secretNumber = '9753';
		let testUserGuess = '9753';
		let currentGuess = checkGuess(testUserGuess, secretNumber);
		expect(currentGuess.bullCount).toBe(4);
		expect(currentGuess.cowCount).toBe(0);
	});

	it('should count 2 bulls and 2 cows', () => {
		let secretNumber = '1357';
		let testUserGuess = '1375';
		let currentGuess = checkGuess(testUserGuess, secretNumber);
		expect(currentGuess.bullCount).toBe(2);
		expect(currentGuess.cowCount).toBe(2);
	});
});
