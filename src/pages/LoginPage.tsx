import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { login } from "../redux/userSlice.ts";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Password is required"),
});

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eae6df;
`;

const FormContainer = styled(Box)`
  width: 400px;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled(Typography)`
  text-align: center;
  color: #1e38b2;
  margin-bottom: 1.5rem;
`;

const SubmitButton = styled(Button)`
  background-color: #fe5805;
  width: 100%;
  &:hover {
    background-color: #e04d00;
  }
`;

const TestButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(login({ email: values.email, password: values.password }));
    history("/items");
  };

  return (
    <Container>
      <FormContainer>
        <Title variant="h4">Login</Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ touched, errors, setFieldValue }) => (
            <Form>
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
              <SubmitButton type="submit" variant="contained">
                Login
              </SubmitButton>

              <TestButton
                type="button"
                onClick={() => {
                  setFieldValue("email", "testuser@example.com");
                  setFieldValue("password", "password123");
                }}
              >
                Test
              </TestButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
