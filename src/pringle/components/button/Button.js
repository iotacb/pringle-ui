import React from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Button({ children, onClick, type = "default", assetLeft, assetRight, style }) {
	const theme = useTheme();
	
	return (
		<ButtonContainer style={style} outlined={type !== "default"} onClick={onClick} theme={theme}>
			{assetLeft}
			{children}
			{assetRight}
		</ButtonContainer>
	);
}

export default Button;

const ButtonContainer = styled.button`
	background-color: ${({ theme, outlined }) => !outlined && theme.colors.primary[500]};
	color: ${({ theme }) => theme.text.color};
	padding: ${({ theme }) => theme.compSpacing.y}px ${({ theme }) => theme.compSpacing.x}px;
	border: ${({ theme, outlined }) =>
		outlined ? `${theme.border.width.sm}px solid ${theme.colors.primary[500]}` : "none"};

	font-size: ${({ theme }) => theme.text.size.md}px;

	user-select: none;
	cursor: pointer;
	position: relative;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: ${({ theme }) => theme.gap.sm}px;

	&:hover,
	&:active {
		background-color: ${({ theme, outlined }) => !outlined && theme.colors.primary[600]};

		&:before {
			opacity: 0.2;
		}
	}

	&:active {
		background-color: ${({ theme, outlined }) => !outlined && theme.colors.primary[700]};
	}

	&:before {
		content: "";
		position: absolute;
		inset: 0;
		background-color: ${({ theme, outlined }) => outlined && theme.colors.primary[500]};
		opacity: 0;
	}

	${({ style }) => style};
`;
