import React, { useState } from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Dropdown({ id, name, options = ["Dropdown"], label, onChange = () => {}, style }) {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState();
	const [selectedValue, setSelectedValue] = useState(options[0]);

	const handleValueChange = (value) => {
		const prevValue = selectedValue;
		const newValue = value;
		setSelectedValue(newValue);
		onChange({
			prev: prevValue,
			value: newValue,
		});
	};

	return (
		<DropdownContainer style={style} open={isOpen} theme={theme} onClick={() => setIsOpen(!isOpen)}>
			<DropdownItem open={isOpen} isSelected={true} theme={theme} label={selectedValue} />
			{options &&
				isOpen &&
				options
					.filter((o) => o !== selectedValue)
					.map((option, i) => (
						<DropdownItem
							key={i}
							index={i}
							theme={theme}
							onClick={() => handleValueChange(option)}
							label={option}
							open={isOpen}
							isLast={i === options.length - 2}
						/>
					))}
		</DropdownContainer>
	);
}

const DropdownItem = ({ theme, label, isSelected = false, open, isLast, index, onClick = () => {} }) => (
	<DropdownItemContainer
		isLast={isLast}
		onClick={onClick}
		index={index}
		open={open}
		isSelected={isSelected}
		theme={theme}
	>
		{limitCharLength(label, isSelected ? 12 : 13)}
	</DropdownItemContainer>
);

const limitCharLength = (text, len) => {
	if (text.length > len) {
		const chars = "...";
		const diff = text.length - len;
		return text.substring(0, text.length - diff - chars.length) + chars;
	}
	return text;
};

export default Dropdown;

const DropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${({ theme }) => theme.gap.sm}px;
	color: ${({ theme }) => theme.text.color};
	position: relative;
	user-select: none;
	min-width: 160px;
	min-height: 40px;

	&:after {
		content: "";
		position: absolute;
		right: 8px;
		top: 50%;
		z-index: 1;
		transform: translateY(-50%) ${({ open }) => open && "rotateX(180deg)"};
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid ${({ theme, open }) => (open ? theme.colors.primary[500] : theme.dropdown.border)};
		transition: all ${({ theme }) => theme.transition.default};
	}

	${({ style }) => style};
`;

const DropdownItemContainer = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 1;
	cursor: pointer;
	top: ${({ isSelected, index }) => (isSelected ? 0 : (index + 1) * 100)}%;
	padding: ${({ isSelected, theme }) =>
		isSelected
			? `${theme.compSpacing.y}px ${theme.compSpacing.x * 2}px ${theme.compSpacing.y}px ${theme.compSpacing.x}px`
			: `${theme.compSpacing.y}px ${theme.compSpacing.x}px`};
	background-color: ${({ theme }) => theme.dropdown.mainBackground};
	border-left: 1px solid ${({ theme }) => theme.dropdown.border};
	border-right: 1px solid ${({ theme }) => theme.dropdown.border};
	border-bottom: ${({ isLast, isSelected, open, theme }) =>
		(isLast || (isSelected && !open)) && `1px solid ${theme.dropdown.border}`};
	border-top: ${({ isSelected, theme }) => isSelected && `1px solid ${theme.dropdown.border}`};

	&:hover {
		background-color: ${({ theme }) => theme.dropdown.hover.mainBackground};
	}

	&:active {
		background-color: ${({ theme }) => theme.dropdown.clicked.mainBackground};
	}
`;
