import React from 'react';

function Header({ className, title }) {
	return (
		<header className={className}>
			<h1>{title}</h1>
		</header>
	);
}

export default Header;
