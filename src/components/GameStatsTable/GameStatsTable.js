import React from 'react';
import GameStats from '../GameStats/GameStats.js';
import './GameStatsTable.css';

function GameStatsTable({ userGuessList }) {
	return (
		<div className='Game-stats-container'>
			<div className='Scroll-table'>
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
			</div>
		</div>
	);
}

export default GameStatsTable;
