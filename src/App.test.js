import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

// test('renders App', () => {
// 	render(<App />);
// 	const input = screen.getByTestId('user-input');
// 	expect(input).toBeInTheDocument();
// });

test('renders error on invalid input', () => {
	render(<App />);
	const input = screen.getByTestId('user-input');
	fireEvent.change(input, { target: { value: 'sadf' } });
	fireEvent.click(screen.getByTestId('user-submit'));

	let error = screen.queryByText('Input is not a valid number!');
	expect(error).toBeInTheDocument();

	fireEvent.change(input, { target: { value: '12 3' } });
	fireEvent.click(screen.getByTestId('user-submit'));

	error = screen.queryByText('Input is not a valid number!');
	expect(error).toBeInTheDocument();
});

test('renders error on input with repeating digits', () => {
	render(<App />);
	const input = screen.getByTestId('user-input');
	fireEvent.change(input, { target: { value: '1223' } });
	fireEvent.click(screen.getByTestId('user-submit'));

	let error = screen.queryByText('Input digits are not unique!');
	expect(error).toBeInTheDocument();
});

test('renders winning message on right guess', () => {
	render(<App />);
	const input = screen.getByTestId('user-input');
	fireEvent.change(input, { target: { value: '1234' } });
	fireEvent.click(screen.getByTestId('user-submit'));

	let win = screen.getByText(/you got it right!/i);
	expect(win).toBeInTheDocument();
});

test('renders user guess in game stats table', () => {
	render(<App />);
	const input = screen.getByTestId('user-input');
	fireEvent.change(input, { target: { value: '1235' } });
	fireEvent.click(screen.getByTestId('user-submit'));

	// let stats = screen.getByText(/1234/i);
	// expect(stats).toBeInTheDocument();

	let guess = screen.getByText('1235');
	expect(guess).toBeInTheDocument();
	console.log(guess.textContent);

	// fireEvent.change(input, { target: { value: '5678' } });
	// fireEvent.click(screen.getByTestId('user-submit'));
	// stats = screen.getByText(/5678/i);
	// expect(stats).toBeInTheDocument();

	// fireEvent.change(input, { target: { value: '1456' } });
	// fireEvent.click(screen.getByTestId('user-submit'));
	// stats = screen.getByText(/1456/i);
	// expect(stats).toBeInTheDocument();
});

// LOGIC

// describe('Generated secret number', () => {
// 	it('should be a valid number', () => {
// 		let testNumber = generateSecretNumber();
// 		expect(isNaN(testNumber)).not.toBe(true);
// 	});

// 	it('should have four digits', () => {
// 		let testNumber = generateSecretNumber();
// 		expect(testNumber.length).toBe(4);
// 	});

// 	it('should have unique digits', () => {
// 		let testNumber = generateSecretNumber();
// 		expect(isRepeating(testNumber)).not.toBe(true);
// 	});
// });

// describe('User guess should be validated correctly', () => {
// 	it('should count 0 bull and 0 cow', () => {
// 		let secretNumber = '1234';
// 		let testUserGuess = '5678';
// 		let currentGuess = checkGuess(testUserGuess, secretNumber);
// 		expect(currentGuess.bullCount).toBe(0);
// 		expect(currentGuess.cowCount).toBe(0);
// 	});

// 	it('should count 0 bull and 4 cows', () => {
// 		let secretNumber = '1234';
// 		let testUserGuess = '4321';
// 		let currentGuess = checkGuess(testUserGuess, secretNumber);
// 		expect(currentGuess.bullCount).toBe(0);
// 		expect(currentGuess.cowCount).toBe(4);
// 	});

// 	it('should count 4 bulls and 0 cow', () => {
// 		let secretNumber = '9753';
// 		let testUserGuess = '9753';
// 		let currentGuess = checkGuess(testUserGuess, secretNumber);
// 		expect(currentGuess.bullCount).toBe(4);
// 		expect(currentGuess.cowCount).toBe(0);
// 	});

// 	it('should count 2 bulls and 2 cows', () => {
// 		let secretNumber = '1357';
// 		let testUserGuess = '1375';
// 		let currentGuess = checkGuess(testUserGuess, secretNumber);
// 		expect(currentGuess.bullCount).toBe(2);
// 		expect(currentGuess.cowCount).toBe(2);
// 	});
// });
