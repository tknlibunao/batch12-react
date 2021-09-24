import React from 'react';
import Input from '../Input/Input';
import Error from '../Error/Error';

import './Form.css';

function Form({
	formAction,
	buttonAction,
	inputChange,
	errorAction,
	errorMessage,
}) {
	return (
		<form
			className='Input-guess'
			onSubmit={(e) => formAction(e)}
			data-testid='form'
		>
			<Input
				className='Input-field'
				name='userGuess'
				type='text'
				maxLength='4'
				autoComplete='off'
				onChange={inputChange}
				testId='user-input'
			/>
			<Input
				className='Submit-btn'
				type='submit'
				value='Guess'
				onClick={buttonAction}
				testId='user-submit'
			/>
			<Error action={errorAction} message={errorMessage} />
		</form>
	);
}

export default Form;
