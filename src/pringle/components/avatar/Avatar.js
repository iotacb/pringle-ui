import React from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Avatar({ children, src, alt, color, type = "", onClick, style }) {
	const theme = useTheme();

	return (
		<AvatarContainer style={style} onClick={onClick} theme={theme} color={color || theme.avatar.background} type={type.toLowerCase()}>
			{src ? <AvatarImage alt={alt} src={src} /> : <>{children}</>}
		</AvatarContainer>
	);
}

export default Avatar;

const AvatarContainer = styled.div`
	width: ${({ theme }) => theme.avatar.size}px;
	height: ${({ theme }) => theme.avatar.size}px;
	border-radius: ${({ type, theme }) =>
		type === "square" ? "0px" : type === "rounded" ? `${theme.radius.sm}px` : "50%"};
	display: flex;
	justify-content: center;
	align-items: center;
    background-color: ${({ color }) => color};
	font-size: ${({ theme }) => theme.text.size.xl}px;
	color: ${({ theme }) => theme.avatar.color};
    overflow: hidden;

	${({ style }) => style};
`;

const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
