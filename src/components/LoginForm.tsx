import React from "react";
import { Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box } from "@mui/material";

const validationSchema = Yup.object({
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string().required("Password is required"),
});

interface LoginFormProps {
	touched: { [key: string]: boolean };
	errors: { [key: string]: string };
	setFieldValue: (field: string, value: string) => void;
	handleSubmit: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
	touched,
	errors,
	setFieldValue,
	handleSubmit,
}) => {
	return (
		<Form onSubmit={handleSubmit}>
			<Box sx={{ marginBottom: 2 }}>
				<Field
					as={TextField}
					name="email"
					label="Email"
					variant="outlined"
					fullWidth
					margin="normal"
					error={touched.email && Boolean(errors.email)}
					helperText={touched.email && errors.email}
				/>
			</Box>
			<Box sx={{ marginBottom: 2 }}>
				<Field
					as={TextField}
					name="password"
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					margin="normal"
					error={touched.password && Boolean(errors.password)}
					helperText={touched.password && errors.password}
				/>
			</Box>
			<Button
				type="submit"
				variant="contained"
				fullWidth
				sx={{ backgroundColor: "#fe5805" }}
			>
				Login
			</Button>

			<Button
				type="button"
				fullWidth
				sx={{ marginTop: 1 }}
				onClick={() => {
					setFieldValue("email", "testuser@example.com");
					setFieldValue("password", "password123");
				}}
			>
				Test
			</Button>
		</Form>
	);
};

export { LoginForm, validationSchema };
