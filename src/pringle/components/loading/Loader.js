import React from "react";
import styled, { keyframes } from "styled-components";

import useTheme from "../../hooks/useTheme";

function Loader({ showing = true, style }) {
	const theme = useTheme();

	let points = [];
	for (let i = 0; i < 10; i++) {
		points.push({});
	}

	return (
		<>
			<LoaderContainer style={style} showing={showing} theme={theme}>
				{points && points.map((point, i) => <LoaderPoint key={i} index={i} theme={theme} />)}
			</LoaderContainer>
		</>
	);
}

export default Loader;

const float = keyframes`
    0% {
        transform: translate(150%, -0%) scale(1);
    }
    25% {
        transform: translate(300%, 150%) scale(1.25);
    }
	50% {
        transform: translate(150%, 300%) scale(1);
    }
	75% {
        transform: translate(-0%, 150%) scale(1.25);
    }
	100% {
        transform: translate(150%, -0%) scale(1);
    }
`;

const LoaderContainer = styled.div`
	width: ${({ theme }) => theme.loader.width}px;
	height: ${({ theme }) => theme.loader.height}px;
	display: ${({ showing }) => (showing ? "block" : "none")};
	justify-content: center;
	align-items: center;
	position: relative;

	${({ style }) => style};
`;

const LoaderPoint = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 25%;
	height: 25%;
	border-radius: 50%;
	background-color: ${({ theme, index }) => (index % 2 === 0 ? theme.loader.background : theme.loader.background2)};
	animation: ${float} 2s -${({ index }) => index * 1.5}s ease-in-out infinite backwards;
`;
