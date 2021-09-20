import React from 'react';

function UserWin({ secretNumber, guessCount, clickAction }) {
	return (
		<div className='Win-header'>
			<div className='Win-message'>
				After <span className='Guess-count'>{guessCount} guesses</span>, you got
				it right!
			</div>
			<div className='Secret-number'>{secretNumber}</div>
			<button className='Play-again' onClick={clickAction}>
				↻
			</button>
		</div>
	);
}

export default UserWin;
