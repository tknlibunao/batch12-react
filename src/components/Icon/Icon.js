import React from 'react';
import './Icon.css'

function Icon({ source, alt, count }) {
	return (
		<div className='Icon-div'>
			<img src={source} className='Icon-image' alt={alt} /> x{count}
		</div>
	);
}

export default Icon;
