import React from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { login } from "../redux/userSlice.ts";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { LoginForm, validationSchema } from "../components/LoginForm.tsx"; 

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

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values: { email: string; password: string }) => {
    dispatch(login(values));
    navigate("/items");
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
          {(formikProps) => (
            <LoginForm
              touched={formikProps.touched}
              errors={formikProps.errors}
              setFieldValue={formikProps.setFieldValue}
              handleSubmit={formikProps.handleSubmit}
            />
          )}
        </Formik>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
