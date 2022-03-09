import PropTypes from "prop-types";
import React, { createContext, useState, useEffect } from "react";

// The default theme of pringle
const themeTemplate = {
	colors: {
		primary: {
			100: "#FFF5D6",
			200: "#FFE8AD",
			300: "#FFD884",
			400: "#FFC866",
			500: "#FFAE33",
			600: "#DB8B25",
			700: "#B76C19",
			800: "#934F10",
			900: "#7A3B09",
		},
		success: {
			100: "#F4FDDF",
			200: "#E7FCBF",
			300: "#D5F89E",
			400: "#C1F184",
			500: "#A4E85C",
			600: "#80C743",
			700: "#60A72E",
			800: "#44861D",
			900: "#2F6F11",
		},
		info: {
			100: "#E4E7FF",
			200: "#C9CFFF",
			300: "#AFB7FF",
			400: "#9BA4FF",
			500: "#7A85FF",
			600: "#5962DB",
			700: "#3D45B7",
			800: "#262D93",
			900: "#171C7A",
		},
		warning: {
			100: "#FFF9CC",
			200: "#FFF099",
			300: "#FFE666",
			400: "#FFDC3F",
			500: "#FFCC00",
			600: "#DBAA00",
			700: "#B78B00",
			800: "#936D00",
			900: "#7A5700",
		},
		danger: {
			100: "#FFE0DD",
			200: "#FFBBBB",
			300: "#FF99A4",
			400: "#FF809A",
			500: "#FF5689",
			600: "#DB3E7D",
			700: "#B72B71",
			800: "#931B63",
			900: "#7A1059",
		},
		dark: {
			100: "#424242",
			200: "#3d3d3d",
			300: "#333333",
			400: "#2e2e2e",
			500: "#222222",
			600: "#1c1c1c",
			700: "#1a1a1a",
			800: "#171717",
			900: "#121212",
		},
		white: {
			100: "#FFFFFF",
			200: "#f2f2f2",
			300: "#e3e3e3",
			400: "#d4d4d4",
			500: "#c4c4c4",
			600: "#adadad",
			700: "#9c9c9c",
			800: "#8c8c8c",
			900: "#7d7d7d",
		},
		text: {
			100: "#FFFFFF",
			200: "#222222",
		},
	},
	button: {},
	textField: {
		background: "#fff",
		border: "#aaa",
	},
	dropdown: {
		mainBackground: "#fff",
		border: "#aaa",
		hover: {
			mainBackground: "#f2f2f2",
		},
		clicked: {
			mainBackground: "#e3e3e3",
		},
	},
	radio: {
		background: "#222",
	},
	checkbox: {
		background: "#222",
	},
	navbar: {
		burger: {
			background: "rgba(255 255 255 / 80%)",
		},
		blur: 20,
		background: "rgba(255 255 255 / 80%)",
	},
	range: {
		markColor: "#222",
		markOpacity: 0.5,
		valueViewBackground: "#fff",
	},
	text: {
		color: "#222",
		color2: "#8c8c8c",
		size: {
			sm: 12,
			md: 16,
			lg: 18,
			xl: 32,
			xl2: 64,
			giant: 128,
		},
	},
	avatar: {
		size: 64,
		color: "#FFF",
		background: "#FFAE33",
		group: {
			gap: 12,
		}
	},
	loader: {
		width: 64,
		height: 64,
		time: 1.5,
		background: "#DB8B25",
		background2: "#FFC866",
	},
	backdrop: {
		background: "rgba(0 0 0 / 50%)",
		blur: 20
	},
	radius: {
		sm: 4,
		md: 8,
		lg: 16,
		xl: 32,
		giant: 64,
		full: 999999,
	},
	border: {
		width: {
			sm: 1,
			md: 2,
			lg: 4,
			xl: 8,
			giant: 16,
		},
	},
	gap: {
		sm: 4,
		md: 8,
		lg: 16,
		xl: 32,
		giant: 64,
	},
	compSpacing: {
		x: 16,
		y: 10,
	},
	transition: {
		time: {
			fast: 0.1,
			medium: 0.2,
			long: 0.3,
			half: 0.5,
			full: 1,
		},
		easing: {
			pringle: "cubic-bezier(0.4,0,0.2,1)",
		},
		default: "0.2s cubic-bezier(0.4,0,0.2,1)",
	},
	breakpoints: {
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		"2xl": 1536,
	},
	page: {
		background: "#e3e3e3",
	},
	setTheme: () => {},
	addThemeValue: () => {},
};

// Same as the themeTemplate but exported to be used programmatically
const lightTheme = themeTemplate;

// Dark theme version of pringle
const darkTheme = {
	...themeTemplate,
	text: {
		...themeTemplate.text,
		color: themeTemplate.colors.white[100],
	},
	radio: {
		...themeTemplate.radio,
		background: themeTemplate.colors.dark[100],
	},
	textField: {
		...themeTemplate.textField,
		background: themeTemplate.colors.dark[100],
	},
	dropdown: {
		mainBackground: themeTemplate.colors.dark[100],
		border: "#aaa",
		hover: {
			mainBackground: themeTemplate.colors.dark[200],
		},
		clicked: {
			mainBackground: themeTemplate.colors.dark[300],
		},
	},
	navbar: {
		...themeTemplate.navbar,
		burger: {
			...themeTemplate.navbar.burger,
			background: "rgba(0 0 0 / 80%)",
		},
		background: "rgba(0 0 0 / 80%)",
	},
	range: {
		...themeTemplate.range,
		markColor: "#FFF",
		markOpacity: 0.2,
		valueViewBackground: themeTemplate.colors.dark[100],
	},
	avatar: {
		...themeTemplate.avatar,
		color: "#222",
	},
	page: {
		...themeTemplate.page,
		background: themeTemplate.colors.dark[500],
	},
};

const ThemeContext = createContext(themeTemplate);

ThemeProvider.propTypes = {
	children: PropTypes.node,
};

function ThemeProvider({ theme = themeTemplate, autoBackground = true, children }) {
	const [themeState, setThemeState] = useState(theme);

	// Change the current used theme. e.g: light to dark theme
	const setTheme = (theme) => {
		setThemeState(theme);
	};

	// Add values to the current theme
	const addThemeValue = (value) => {
		setThemeState({
			...themeState,
			...value,
		});
	};

	useEffect(() => {
		if (autoBackground) {
			const body = document.body;
			body.style.backgroundColor = themeState.page.background;
		}
	}, [themeState, autoBackground]);

	return (
		<ThemeContext.Provider
			value={{
				...themeState,
				addThemeValue,
				setTheme,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export { ThemeProvider, ThemeContext, themeTemplate, darkTheme, lightTheme };
