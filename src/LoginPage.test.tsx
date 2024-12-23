import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import LoginPage from "./pages/LoginPage.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

const testUser = {
	email: "testuser@example.com",
	password: "password123",
};

test("login with test user", async () => {
	render(
		<Provider store={store}>
			<Router>
				<LoginPage />
			</Router>
		</Provider>
	);

	const emailField = screen.getByLabelText(/email/i);
	const passwordField = screen.getByLabelText(/password/i);
	const submitButton = screen.getByRole("button", { name: /login/i });

	fireEvent.change(emailField, { target: { value: testUser.email } });
	fireEvent.change(passwordField, { target: { value: testUser.password } });

	fireEvent.click(submitButton);

	await waitFor(() => {
		expect(window.location.pathname).toBe("/items");
	});
});
