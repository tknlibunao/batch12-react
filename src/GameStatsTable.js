import React from 'react';
import GameStats from './components/GameStats.js';

function GameStatsTable({ userGuessList }) {
	return (
		<div className='Game-stats-board'>
			{userGuessList.map(({ userGuess, bullCount, cowCount }, index) => {
				return (
					<GameStats
						key={index}
						userGuess={userGuess}
						bullCount={bullCount}
						cowCount={cowCount}
					/>
				);
			})}
		</div>
	);
}

export default GameStatsTable;
