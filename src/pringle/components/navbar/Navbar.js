import React, { useEffect, useState } from "react";
import styled from "styled-components";

import useTheme from "../../hooks/useTheme";

function Navbar({
	logo,
	links,
	component,
	navigation,
	scrollThreshold = 60,
	onOpenChange = () => {},
	style,
}) {
	const theme = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const checkScroll = () => {
			if (scrollThreshold > -1) {
				setIsScrolled(window.pageYOffset > scrollThreshold);
			}
		};

		window.addEventListener("scroll", () => checkScroll());
		checkScroll();

		return window.removeEventListener("scroll", checkScroll);
	}, []);

	const handleBurgerClick = () => {
		onOpenChange();
		setIsOpen(!isOpen);
	};

	return (
		<>
			<NavbarWrapper style={style} theme={theme} scrolled={isScrolled}>
				<LogoItem theme={theme} logo={logo} navigation={navigation} />
				<div>{component}</div>
				<LinksWrapper>
					{links &&
						links.map((link, index) => (
							<LinkItem
								theme={theme}
								key={index}
								link={link}
								navigation={navigation}
							/>
						))}
				</LinksWrapper>
				<BurgerItem theme={theme} onClick={handleBurgerClick} open={isOpen} />
			</NavbarWrapper>
			<BurgerNavbarWrapper theme={theme} open={isOpen}>
				<BurgerNavbarItemWrapper>
					{links &&
						links.map((link, index) => (
							<LinkItem
								theme={theme}
								key={index}
								link={link}
								navigation={navigation}
							/>
						))}
				</BurgerNavbarItemWrapper>
			</BurgerNavbarWrapper>
		</>
	);
}

const LogoItem = ({ logo, style, theme, navigation }) => (
	<LogoItemWrapper
		style={style}
		theme={theme}
		onClick={() => {
			// If navigation from react-router-dom provided use it to navigate
			if (navigation) {
				if (logo.href) {
					if (logo.tab) {
						window.open(logo.href, "_blank").focus();
					} else {
						navigation(logo.href);
					}
				} else {
					if (logo.onClick) {
						logo.onClick();
					}
				}
			} else {
				if (logo.href) {
					// Open in new tab when starting with underscore
					if (logo.tab) {
						window.open(logo.href, "_blank").focus();
					} else {
						window.location.href = logo.href;
					}
				} else {
					if (logo.onClick) {
						logo.onClick();
					}
				}
			}
		}}
	>
		{logo.text ? <h1>{logo.text}</h1> : logo.component ? logo.component : <></>}
	</LogoItemWrapper>
);

const LinkItem = ({ link, style, theme, navigation }) => (
	<LinkItemWrapper
		style={style}
		theme={theme}
		onClick={() => {
			// If navigation from react-router-dom provided use it to navigate
			if (navigation) {
				if (link.href) {
					if (link.tab) {
						window.open(link.href, "_blank").focus();
					} else {
						navigation(link.href);
					}
				} else {
					if (link.onClick) {
						link.onClick();
					}
				}
			} else {
				if (link.href) {
					// Open in new tab when starting with underscore
					if (link.tab) {
						window.open(link.href, "_blank").focus();
					} else {
						window.location.href = link.href;
					}
				} else {
					if (link.onClick) {
						link.onClick();
					}
				}
			}
		}}
	>
		{link.name ? link.name : link.component ? link.component : <></>}
	</LinkItemWrapper>
);

const BurgerItem = ({ onClick, open, theme }) => (
	<BurgerItemWrapper theme={theme} onClick={onClick}>
		<BurgerItemLine
			theme={theme}
			rotation={45}
			translation={[0, 14]}
			open={open}
		/>
		<BurgerItemLine theme={theme} rotation={15} open={open} middle />
		<BurgerItemLine
			theme={theme}
			rotation={-45}
			translation={[0, -15]}
			open={open}
		/>
	</BurgerItemWrapper>
);

export default Navbar;
export {};

const NavbarWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: ${({ theme }) => theme.compSpacing.y * 3.2}px
		${({ theme }) => theme.compSpacing.x * 3}px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 999999;
	backdrop-filter: ${({ scrolled, theme }) =>
		scrolled && `blur(${theme.navbar.blur}px)`};
	background-color: ${({ scrolled, theme }) =>
		scrolled && theme.navbar.background};
	transition: all ${({ theme }) => theme.transition.default};

	${({ style }) => style};
`;

const LinksWrapper = styled.div`
	gap: 1rem;
	display: flex;

	@media (max-width: 768px) {
		display: none;
	}
`;

const LogoItemWrapper = styled.div`
	cursor: pointer;
	color: ${({ theme }) => theme.text.color};
	transition: ${({ theme }) => `color ${theme.transition.default}`};
`;

const LinkItemWrapper = styled.div`
	cursor: pointer;
	color: ${({ theme }) => theme.text.color};
	transition: ${({ theme }) => `color ${theme.transition.default}`};
`;

const BurgerItemWrapper = styled.div`
	width: 2rem;
	height: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	cursor: pointer;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
		display: none;
	}
`;

const BurgerItemLine = styled.div`
	width: 100%;
	height: 3px;
	background-color: ${({ theme }) => theme.text.color};
	opacity: ${({ open, middle }) => open && middle && 0};
	transform: ${({ open, rotation, translation, middle }) =>
		open &&
		`translate(${
			translation ? `${translation[0]}px, ${translation[1]}px` : "0px"
		}) rotateZ(${rotation ? rotation : 0}deg) ${
			(middle ? middle : false) ? "scale(.5)" : ""
		}`};
	transition: opacity 0.3s ease, transform 0.3s ease;
`;

const BurgerNavbarWrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.navbar.burger.background};
	backdrop-filter: ${({ open, theme }) =>
		open && `blur(${theme.navbar.blur / 2}px)`};
	transform: ${({ open }) => !open && "translateX(100%)"};
	transition: transform ${({ theme }) => theme.transition.default},
		backdrop-filter ${({ theme }) => theme.transition.default};
	z-index: 999998;

	@media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
		display: none;
	}
`;

const BurgerNavbarItemWrapper = styled.div``;
