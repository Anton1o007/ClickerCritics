import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaTimes } from 'react-icons/fa';
import {
  LoginContainer,
  Container,
  Title,
  LoginForm,
  Label,
  Input,
  ErrorContainer,
  Button,
  TextLabel,
  RegisterText,
} from "./styles";
import { UserLogin } from "@/models/User/types";
import Link from "next/link";

const URL_LOGIN = "https://clicker-critics-api.onrender.com/auth/login";
const LOGIN_ERROR = "Error al inicial sesión, comprueba tus credenciales.";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleCloseError = () => {
    setLoginError("");
  };

  const onLogin = async (userCredentials: UserLogin) => {
    try {
        const response = await fetch(URL_LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(userCredentials).toString(),
        });

        if (!response.ok) {
            setLoginError(LOGIN_ERROR);
            return;
        }

        const data = await response.json();
        if (!data.access_token) {
            setLoginError(LOGIN_ERROR);
            return;
        }

        const accessToken = data.access_token;
        const userId = data.user_id;
        const tokenExp = data.exp;
        const username = data.username;

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user_id", userId);
        localStorage.setItem("token_exp", tokenExp);
        localStorage.setItem("username", username);


        router.push(`/`);
    } catch (err) {
        setLoginError(LOGIN_ERROR);
    } finally {
        setUsername("");
        setPassword("");
    }
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { username, password };
    onLogin(user);
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Iniciar Sesión</Title>
        {!!loginError && (
          <ErrorContainer>
            {loginError}
            <span onClick={handleCloseError}>
              <FaTimes />
            </span>
          </ErrorContainer>
        )}
        <Container>
          <Label>
            <TextLabel>Nombre de usuario</TextLabel>
            <Input
              type="text"
              name="Nombre de usuario"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>
        </Container>
        <Container>
          <Label>
            <TextLabel>Contraseña</TextLabel>
            <Input
              type="password"
              name="Contraseña"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
        </Container>
        <Button>Login</Button>
        <Link href="/auth/register">
          <RegisterText>No tienes cuenta todavia?</RegisterText>
        </Link>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
