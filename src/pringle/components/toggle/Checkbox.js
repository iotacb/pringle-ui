import React from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Checkbox({
	id,
	name,
	label,
	onChange,
	onClick,
	assetLeft,
	assetRight,
	checked,
	style,
}) {
	const theme = useTheme();

	return (
		<CheckboxContainer style={style} onClick={onClick} theme={theme}>
			{assetLeft}
			<input
				checked={checked}
				onChange={onChange}
				name={name}
				id={id}
				type="checkbox"
			/>
			<span></span>
			{label && <label htmlFor={id}>{label}</label>}
			{assetRight}
		</CheckboxContainer>
	);
}

export default Checkbox;

const CheckboxContainer = styled.div`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.gap.sm}px;
	color: ${({ theme }) => theme.text.color};
	position: relative;

	transition: ${({ theme }) =>
		`background-color ${theme.transition.default}, color ${theme.transition.default}`};

	label {
		display: flex;
		align-items: center;
		padding: ${({ theme }) => theme.compSpacing.y}px 0
			${({ theme }) => theme.compSpacing.y}px
			${({ theme }) => theme.compSpacing.x + 8}px;
		cursor: pointer;
		user-select: none;
	}

	input {
		position: absolute;
		visibility: hidden;

		&[type="checkbox"]:checked ~ span {
			&:after {
				transform: translate(-50%, -50%) scale(0.75);
			}
		}
	}

	span {
		width: 20px;
		height: 20px;
		border-radius: ${({ theme }) => theme.radius.sm}px;
		left: 0;
		background-color: ${({ theme }) => theme.checkbox.background};
		position: absolute;
		pointer-events: none;

		&:after {
			content: "";
			position: absolute;
			width: 100%;
			height: 100%;
			left: 50%;
			top: 50%;
			border-radius: inherit;
			transform: translate(-50%, -50%) scale(0);
			background-color: ${({ theme }) => theme.colors.primary[500]};
			transition: transform ${({ theme }) => theme.transition.default};
		}
	}

	${({ style }) => style};
`;
