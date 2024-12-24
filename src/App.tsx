import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import LoginPage from "./pages/LoginPage.tsx";
import ItemsPage from "./pages/ItemsPage.tsx";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store.ts";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fe5805",
		},
		secondary: {
			main: "#1E38B2",
		},
		background: {
			default: "#EAE6DF",
			paper: "#FFFFFF",
		},
		text: {
			primary: "#1E38B2",
			secondary: "#000000",
		},
	},
	typography: {
		h1: {
			fontSize: "2rem",
			fontWeight: "600",
			color: "#1E38B2",
		},
		h2: {
			fontSize: "1.5rem",
			fontWeight: "600",
			color: "#1E38B2",
		},
		body1: {
			fontSize: "1rem",
			color: "#000000",
		},
	},
});

const App: React.FC = () => {
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/items"
						element={isLoggedIn ? <ItemsPage /> : <Navigate to="/login" />}
					/>
					<Route path="/" element={<Navigate to="/login" />} />
				</Routes>
			</Router>
		</ThemeProvider>
	);
};

export default App;
