import { useState, useEffect } from "react";
import styled from "styled-components";

import {
	Button,
	TextField,
	Radio,
	Navbar,
	Range,
	Checkbox,
	Dropdown,
	Avatar,
	AvatarGroup,
	Loader,
	Backdrop,
	useTheme,
	darkTheme,
	lightTheme,
} from "./pringle";

function App() {
	const { setTheme } = useTheme();
	const [textValue, setTextValue] = useState();
	const [switchValue, setSwitchValue] = useState();
	const [showLoading, setShowLoading] = useState();

	const [isDark, setDark] = useState(false);

	const logo = { text: "LOGO", href: "/" };

	const links = [
		{ name: "Test1", href: "/test" },
		{ name: "Test2", href: "/test" },
		{ name: "Test3", href: "/test" },
		{ name: "Test4", href: "/test" },
	];

	const dropdownOptions = [
		"JavaScript",
		"Java",
		"Python",
		"C#",
		"AHHHHHHHHHHHHHHHHHHHH",
		"Java",
		"Python",
		"C#",
		"AHHHHHHHHHHHHHHHHHHHH",
		"Java",
		"Python",
		"C#",
		"AHHHHHHHHHHHHHHHHHHHH",
	];

	const avatars = [
		{ src: "https://mui.com/static/images/avatar/1.jpg" },
		{ src: "https://mui.com/static/images/avatar/2.jpg" },
		{ src: "https://mui.com/static/images/avatar/3.jpg" },
		{ src: "https://mui.com/static/images/avatar/1.jpg" },
		{ src: "https://mui.com/static/images/avatar/2.jpg" },
		{ src: "https://mui.com/static/images/avatar/3.jpg" },
		{ src: "https://mui.com/static/images/avatar/1.jpg" },
		{ src: "https://mui.com/static/images/avatar/2.jpg" },
		{ src: "https://mui.com/static/images/avatar/3.jpg" },
	];

	useEffect(() => {
		if (isDark) {
			setTheme(darkTheme);
		} else {
			setTheme(lightTheme);
		}
	}, [isDark, setTheme]);

	const validator = (value) => {
		return value.length > 6 && value.includes("a");
	};

	return (
		<Container>
			<Navbar logo={logo} links={links} />
			<TextField
				validation={validator}
				required
				value={textValue}
				onChange={(e) => setTextValue(e.target.value)}
				label="Text field"
			/>
			<Button onClick={() => setDark(!isDark)}>Change Theme</Button>
			<Radio name="uff" id="test" label="Radio" />
			<Radio name="uff" id="test2" label="Radio2" />
			<Range showValue step={5} label="Range" />
			<Checkbox
				onClick={() => setSwitchValue(!switchValue)}
				onChange={(e) => setSwitchValue(e.target.value)}
				checked={!switchValue}
				label="Switch"
			/>
			<Dropdown label="Dropdown" id="dropdown" options={dropdownOptions} />
			<Avatar src="https://mui.com/static/images/avatar/2.jpg">H</Avatar>
			<AvatarGroup avatars={avatars} total={20} max={8} />
			<Button onClick={() => setShowLoading(true)}>Show loading screen</Button>
			<Backdrop onClick={() => setShowLoading(false)} showing={showLoading}>
				<Loader />
				<Button onClick={() => setShowLoading(false)}>Hide loading screen</Button>
			</Backdrop>
		</Container>
	);
}

export default App;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;
