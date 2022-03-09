import React, { useState } from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function TextField({
	id,
	onClick,
	onChange,
	assetLeft,
	assetRight,
	placeholder,
	label,
	value = "",
	password = false,
	required = false,
	validation,
	style
}) {
	const theme = useTheme();

	const [focus, setFocus] = useState();

	const simpleValidation = () => {
		return value.length > 0;
	};

	return (
		<TextFieldContainer
			style={style}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			onClick={onClick}
			theme={theme}
			hoverLabel={value.length > 0 || focus}
			valid={required ? (validation ? validation(value) : simpleValidation()) : true}
		>
			{assetLeft}
			<input
				id={id}
				onChange={onChange}
				type={password ? "password" : "text"}
				required={required}
				placeholder={placeholder}
			/>
			{label && <label htmlFor={id}>{`${label}${required && "*"}`}</label>}
			{assetRight}
		</TextFieldContainer>
	);
}

export default TextField;

const TextFieldContainer = styled.div`
	background: ${({ theme }) => theme.textField.background};
	border-bottom: ${({ theme, hoverLabel, valid }) =>
		`${theme.border.width.sm}px solid ${
			valid ? (hoverLabel ? theme.colors.primary[500] : theme.textField.border) : theme.colors.danger[500]
		}`};
	display: flex;
	position: relative;
	transition: border ${({ theme }) => theme.transition.default};

	input {
		border: none;
		outline: none;
		background-color: transparent;
		color: ${({ theme }) => theme.text.color};

		padding: ${({ theme }) => theme.compSpacing.y * 2}px ${({ theme }) => theme.compSpacing.x / 2}px
			${({ theme }) => theme.compSpacing.y / 2}px ${({ theme }) => theme.compSpacing.x / 2}px;

		font-size: ${({ theme }) => theme.text.size.sm}px;
	}

	label {
		font-size: ${({ theme }) => theme.text.size.lg}px;
		position: absolute;
		left: 5px;
		top: 8px;
		transition: ${({ theme }) => theme.transition.default} all;
		pointer-events: none;
		color: ${({ theme, valid }) => (valid ? theme.text.color2 : theme.colors.danger[500])};

		${({ theme, hoverLabel, valid }) =>
			hoverLabel &&
			`
				top: 0px;
				left: 8px;
				font-size: ${theme.text.size.sm}px;
				color: ${valid ? theme.colors.primary[500] : theme.colors.danger[500]};
			`}
	}

	${({ style }) => style};
`;
