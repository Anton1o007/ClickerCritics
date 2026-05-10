import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import {
  LoginContainer,
  Container,
  Title,
  Label,
  Input,
  Button,
  TextLabel,
  Form,
  Column,
  Row,
  ErrorContainer,
} from "./styles";
import { UserCredentials } from "@/models/User/types";
import { Avatar } from "@/components/UserDetails/UserData/styles";

const URL_REGISTER = "https://clicker-critics-api.onrender.com/auth/register";
const REGISTER_ERROR = "Error al registrar, comprueba tus datos.";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [registerErrors, setRegisterErrors] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const handleCloseError = (index: number) => {
    setRegisterErrors((prevErrors) => prevErrors.filter((_, i) => i !== index));
  };

  const handleRegisterError = (error: string) => {
    setRegisterErrors((prevErrors) => [...prevErrors, error]);
  };

  const isValidURL = (url: string | undefined) => {
    if (!url) return true; // URL vacía es válida
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidUsername = (username: string) => {
    return username && username.length <= 12 && /^[a-zA-Z0-9_]+$/.test(username);
  };

  const isValidEmail = (email: string) => {
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const canSubmitForm = !!isValidUsername(username) && !!isValidEmail(email) && !!isValidURL(avatar);
    setCanSubmit(canSubmitForm);
  }, [username, email, avatar]);

  const onRegister = async (userCredentials: UserCredentials) => {
    const errors = [];
    if (!isValidUsername(userCredentials.username)) {
      errors.push("El nombre de usuario no es válido.");
    }
    if (!isValidEmail(userCredentials.email)) {
      errors.push("El correo electrónico no es válido.");
    }
    if (!isValidURL(userCredentials.avatar)) {
      errors.push("La URL del avatar no es válida.");
    }

    if (errors.length > 0) {
      setRegisterErrors(errors);
      return;
    }

    try {
      const response = await fetch(URL_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(userCredentials).toString(),
      });

      if (!response.ok) {
        setRegisterErrors([REGISTER_ERROR]);
        return;
      }

      const data = await response.json();

      const accessToken = data.access_token;
      const userId = data.user_id;
      const tokenExp = data.exp;
      const registeredUser = data.username;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("token_exp", tokenExp);
      localStorage.setItem("username", registeredUser);

      router.push(`/user/${userId}`);
    } catch (err) {
      setRegisterErrors([REGISTER_ERROR]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userCredentials: UserCredentials = {
      username,
      password,
      email,
      avatar,
    };

    onRegister(userCredentials);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    if (isValidUsername(newUsername)) {
      setUsernameError("");
    } else {
      setUsernameError("El nombre de usuario no es válido. Debe tener un máximo de 12 caracteres y solo puede contener letras, números y guiones bajos.");
    }
    setUsername(newUsername);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (isValidEmail(newEmail)) {
      setEmailError("");
    } else {
      setEmailError("El correo electrónico no es válido.");
    }
    setEmail(newEmail);
  };

  const handleAvatarChange = () => {
    const newURL = prompt("Introduce la nueva URL del avatar:", avatar);
    if (newURL !== null) {
      if (isValidURL(newURL)) {
        setAvatarError("");
        setAvatar(newURL);
      } else {
        setAvatarError("La URL del avatar no es válida. Por favor, introduce una URL válida.");
      }
    }
  };

  return (
    <LoginContainer>
      <Title>Registro</Title>
      {!!registerErrors.length && (
        <>
          {registerErrors.map((error, index) => (
            <ErrorContainer key={index}>
              <span>{error}</span>
              <FaTimes className="close-icon" onClick={() => handleCloseError(index)} />
            </ErrorContainer>
          ))}
        </>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Container>
              <Label>
                <TextLabel>Avatar</TextLabel>
                {avatar ? (
                  <Avatar
                    src={avatar}
                    alt="Avatar"
                    width={100}
                    height={100}
                    onClick={handleAvatarChange}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <Avatar
                    src="/images/default_user.png"
                    alt="Avatar"
                    width={100}
                    height={100}
                    onClick={handleAvatarChange}
                    style={{ cursor: "pointer" }}
                  />
                )}
                {avatarError && (
                  <ErrorContainer>{avatarError}</ErrorContainer>
                )}
              </Label>
            </Container>
          </Column>
          <Column>
            <Container>
              <Label>
                <TextLabel>Nombre de usuario</TextLabel>
                <Input
                  type="text"
                  name="Nombre de usuario"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={handleUsernameChange}
                />
                {usernameError && (
                  <ErrorContainer>{usernameError}</ErrorContainer>
                )}
              </Label>
            </Container>
            <Container>
              <Label>
                <TextLabel>Correo Electrónico</TextLabel>
                <Input
                  type="text"
                  name="Correo Electrónico"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <ErrorContainer>{emailError}</ErrorContainer>
                )}
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
          </Column>
        </Row>
        <Button disabled={!canSubmit}>Registrarse</Button>
      </Form>
    </LoginContainer>
  );
};

export default Register;
