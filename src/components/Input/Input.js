import React from 'react';
import './Input.css';

function Input({
	className,
	name,
	type,
	value,
	maxLength,
	onChange,
	onClick,
	autoComplete,
	testId
}) {
	return (
		<input
			className={className}
			name={name}
			type={type}
			value={value}
			maxLength={maxLength}
			onChange={(e) => onChange(e.target.value)}
			onClick={onClick}
			autoComplete={autoComplete}
			data-testid={testId}
		/>
	);
}

export default Input;
