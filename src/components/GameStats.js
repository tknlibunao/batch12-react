import React from 'react';
import bullIcon from '../assets/bullicon.png';
import cowIcon from '../assets/cowicon.png';

function GameStats({ userGuess, bullCount, cowCount }) {
	return (
		<div className='Game-stats'>
			<div className='userGuess'>{userGuess}</div>
			<div className='bull'>
				<img src={bullIcon} className='bullIcon' alt='bullIcon' /> x{bullCount}
			</div>
			<div className='cow'>
				<img src={cowIcon} className='cowIcon' alt='cowIcon' /> x{cowCount}
			</div>
		</div>
	);
}

export default GameStats;
