import React from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Checkbox({ onClick, style, children, spacing, size = 1 }) {
	const theme = useTheme();

	return (
		<HeadingContainer style={style} size={size} onClick={onClick} theme={theme}>
			{children}
		</HeadingContainer>
	);
}

export default Checkbox;

const HeadingContainer = styled.p`
	font-size: ${({ size, theme }) =>
		size === 1
			? theme.text.size.xl
			: size === 2
			? theme.text.size.lg
			: size === 3
			? theme.text.size.md
			: size === 4
			? theme.text.size.sm
			: size === 5
			? theme.text.size.ty
			: theme.text.size.md}px;
	font-weight: ${({ theme }) => theme.text.weight.bold};
	color: ${({ theme }) => theme.text.color};
	transition: ${({ theme }) => `color ${theme.transition.default}`};
	user-select: none;

	${({ style }) => style};
`;
