import React from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Radio({
	id,
	name,
	label,
	onChange = () => {},
	assetLeft,
	assetRight,
	checked,
	style
}) {
	const theme = useTheme();

	return (
		<RadioContainer
			style={style}
			theme={theme}
		>
			{assetLeft}
			<input checked={checked} onChange={onChange} name={name} id={id} type="radio" />
			<span></span>
			{label && <label htmlFor={id}>{label}</label>}
			{assetRight}
		</RadioContainer>
	);
}

export default Radio;

const RadioContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.gap.sm}px;
	color: ${({ theme }) => theme.text.color};
	position: relative;

	label {
		display: block;
		padding: ${({ theme }) => theme.compSpacing.y}px 0 ${({ theme }) => theme.compSpacing.y}px ${({ theme }) => theme.compSpacing.x + 8}px;
		cursor: pointer;
		user-select: none;
	}

	input {
		position: absolute;
		visibility: hidden;

		&[type=radio]:checked ~ span {
			&:after {
				transform: translate(-50%, -50%) scale(0.75);
			}
		}
	}

	span {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		left: 0;
		background-color: ${({ theme }) => theme.radio.background};
		position: absolute;
		pointer-events: none;

		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			left: 50%;
			top: 50%;
			border-radius: 50%;
			transform: translate(-50%, -50%) scale(0);
			background-color: ${({ theme }) => theme.colors.primary[500]};
			transition: transform ${({ theme }) => theme.transition.default};
		}
	}

	${({ style }) => style};
`;
