import React from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Backdrop({ showing = true, children, onClick, style}) {
	const theme = useTheme();

	return (
		<BackdropContainer style={style} onClick={onClick} showing={showing} theme={theme}>
			{children}
		</BackdropContainer>
	);
}

export default Backdrop;

const BackdropContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: ${({ showing }) => (showing ? "flex" : "none")};
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.backdrop.background};
	backdrop-filter: blur(${({ theme }) => theme.backdrop.blur}px);
	z-index: 999997;

	${({ style }) => style};
`;
