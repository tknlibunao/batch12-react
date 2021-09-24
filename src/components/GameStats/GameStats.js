import React from 'react';
import bullIcon from '../../assets/bullicon.png';
import cowIcon from '../../assets/cowicon.png';
import Icon from '../Icon/Icon';
import './GameStats.css';

function GameStats({ userGuess, bullCount, cowCount }) {
	return (
		<div className='Game-stats'>
			<div className='userGuess' data-testid='stats'>
				{userGuess}
			</div>
			<Icon source={bullIcon} alt='bullCount' count={bullCount} />
			<Icon source={cowIcon} alt='cowCount' count={cowCount} />
		</div>
	);
}

export default GameStats;
