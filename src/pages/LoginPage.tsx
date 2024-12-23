import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../redux/userSlice.ts";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
	const dispatch = useDispatch();
	const history = useNavigate();

	const handleLogin = (values: { email: string; password: string }) => {		
		dispatch(login(values.email));
		history("/items");
	};

	return (
		<div>
			<h1>Login</h1>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={handleLogin}
			>
				{() => (
					<Form>
						<div>
							<Field
								as={TextField}
								name="email"
								label="Email"
								variant="outlined"
								fullWidth
								margin="normal"
							/>
							<ErrorMessage name="email" component="div" />
						</div>
						<div>
							<Field
								as={TextField}
								name="password"
								label="Password"
								type="password"
								variant="outlined"
								fullWidth
								margin="normal"
							/>
							<ErrorMessage name="password" component="div" />
						</div>
						<Button type="submit" variant="contained" color="primary">
							Login
						</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default LoginPage;
