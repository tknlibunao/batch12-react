import React from 'react';
import Button from '../Button/Button';

import './UserWin.css'

function UserWin({ secretNumber, guessCount, clickAction }) {
	return (
		<div className='Win-header'>
			<div className='Win-message'>
				After <span className='Guess-count'>{guessCount} guesses</span>, you got
				it right!
			</div>
			<div className='Secret-number'>{secretNumber}</div>
			<Button className='Play-again' onClick={clickAction} value='↻' />
		</div>
	);
}

export default UserWin;
