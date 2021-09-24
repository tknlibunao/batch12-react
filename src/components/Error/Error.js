import React from 'react';
import './Error.css';

function Error({ action, message }) {
	return (
		<div className='Error-message'>
			{action && <div className='Error'>{message}</div>}
		</div>
	);
}

export default Error;
