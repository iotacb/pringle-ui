import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Range({
	id,
	onChange = () => {},
	min = 0,
	max = 100,
	step = 1,
	marks,
	showValue,
	alwaysShowValue,
	value,
	label,
	assetLeft,
	assetRight,
	style
}) {
	const theme = useTheme();
	const [markPoints, setMarkPoints] = useState([]);
	const [offset, setOffset] = useState(value ? value : 50);
	const [hovering, setHovering] = useState();
	const rangeRef = useRef();

	useEffect(() => {
		if (rangeRef.current) {
			const amountOfSteps = max / step;
			for (let i = 0; i <= amountOfSteps; i++) {
				setMarkPoints((prevMarks) => [...prevMarks, i * step]);
			}
		}
		return () => setMarkPoints([]);
	}, [rangeRef.current]);

	return (
		<RangeContainer style={style} theme={theme}>
			{label && <label htmlFor={id}>{label}</label>}
			{assetLeft && assetLeft}
			<RangeWrapper>
				<input
					ref={rangeRef}
					id={id}
					onChange={(e) => {
						onChange(e);
						setOffset(e.target.value);
					}}
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
				/>
				<MarksContainer>
					{markPoints && marks && markPoints.map((mark, index) => <MarkPoint theme={theme} key={index} index={mark} />)}
					<RangeThumb offset={offset} theme={theme} />
					<ValueView showValue={(showValue && hovering) || alwaysShowValue} offset={offset} theme={theme}>
						<span />
						{offset}
					</ValueView>
				</MarksContainer>
			</RangeWrapper>
			{assetRight}
		</RangeContainer>
	);
}

export default Range;

const RangeContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	transition: border ${({ theme }) => theme.transition.default};
	padding: ${({ theme }) => theme.compSpacing.y}px 0;
	gap: ${({ theme }) => theme.gap.sm}px;

	input {
		border: none;
		outline: none;
		cursor: pointer;
		accent-color: ${({ theme }) => theme.colors.primary[500]};

		&[type="range"]::-webkit-slider-thumb {
			opacity: 0;
		}
	}

	label {
		pointer-events: none;
		color: ${({ theme }) => theme.text.color};
	}

	${({ style }) => style};
`;

const RangeWrapper = styled.div`
	position: relative;
`;

const MarksContainer = styled.div`
	width: calc(100% - 16px);
	height: 100%;
	left: 8px;
	top: 0;
	position: absolute;
	pointer-events: none;
	z-index: 0;
`;

const MarkPoint = styled.div`
	position: absolute;
	width: 2px;
	height: 2px;
	border-radius: 1px;
	background-color: ${({ theme }) => theme.range.markColor};
	top: 50%;
	left: ${({ index }) => index}%;
	transform: translate(-50%, calc(-100% - 1px));
	opacity: ${({ theme }) => theme.range.markOpacity};
	pointer-events: none;
`;

const RangeThumb = styled.span`
	position: absolute;
	pointer-events: none;
	width: 16px;
	height: 16px;
	top: 2px;
	left: ${({ offset }) => offset}%;
	transform: translate(-50%, -5%);
	background-color: ${({ theme }) => theme.colors.primary[500]};
	border-radius: 50%;
	z-index: 1;
`;

const ValueView = styled.div`
	position: absolute;
	left: ${({ offset }) => offset}%;
	top: -100%;
	transform: ${({ showValue }) => `translate(-50%, -${showValue ? 50 : 20}%) scale(${showValue ? 1 : 0.5})`};
	opacity: ${({ showValue }) => (showValue ? 1 : 0)};
	background-color: ${({ theme }) => theme.range.valueViewBackground};
	color: ${({ theme }) => theme.text.color};
	padding: ${({ theme }) => theme.compSpacing.y / 3}px ${({ theme }) => theme.compSpacing.x / 2}px;
	border-radius: 2px;
	border: 1px solid #222;
	transition: opacity ${({ theme }) => theme.transition.default}, transform ${({ theme }) => theme.transition.default};

	span {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translate(-50%, -1px);
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid ${({ theme }) => theme.range.valueViewBackground};
	}
`;
