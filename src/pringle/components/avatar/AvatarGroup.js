import React, { Fragment } from "react";
import styled from "styled-components";

import Avatar from "./Avatar";
import useTheme from "../../hooks/useTheme";

function AvatarGroup({ avatars, max = 4, reverse, style }) {
	const theme = useTheme();

	return (
		<AvatarGroupContainer
			style={style}
			theme={theme}
			avatars={avatars}
			max={max}
			overflow={(avatars.length > max).toString()}
		>
			{avatars &&
				avatars.map((avatar, i) => (
					<Fragment key={i}>
						{i > max - 1 ? (
							<>
								{i === avatars.length - 1 && (
									<AvatarWrapper
										theme={theme}
										z={reverse ? i : avatars.length - i}
										index={max + 3}
										key={i}
									>
										<Avatar>+{i - (max - 1)}</Avatar>
									</AvatarWrapper>
								)}
							</>
						) : (
							<AvatarWrapper
								theme={theme}
								z={reverse ? i : avatars.length - i}
								index={i}
								key={i}
							>
								<Avatar src={avatar.src} alt={avatar.alt}>
									{avatar.children}
								</Avatar>
							</AvatarWrapper>
						)}
					</Fragment>
				))}
		</AvatarGroupContainer>
	);
}

export default AvatarGroup;

const AvatarGroupContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: ${({ theme, max, avatars, overflow }) =>
		theme.avatar.size +
		(theme.avatar.group.gap * (overflow ? max - 1 : avatars.length) +
			(overflow ? theme.avatar.size - (theme.avatar.group.gap / 3) * 4 : 0))}px;
	height: ${({ theme }) => theme.avatar.size}px;
	z-index: -1;

	${({ style }) => style};
`;

const AvatarWrapper = styled.div`
	position: absolute;
	top: 0;
	left: ${({ index, theme }) => theme.avatar.group.gap * index}px;
	z-index: ${({ z }) => z};
`;
