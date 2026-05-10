import React, { FC, useEffect, useState } from "react";
import {
  ConfirmationBackground,
  EditButton,
  UpdateContainer,
  Title,
  ErrorContainer,
  Form,
  Row,
  Column,
  Container,
  TextLabel,
  Input,
  Description,
  Button,
  CrossContainer,
  CloseButton,
  ToggleButton,
  ToggleRow,
  MainColumn,
} from "./styles";
import { User as UserProps, UserUpdate } from "@/models/User/types";
import { FaTimes } from "react-icons/fa";
import { Avatar } from "@/components/UserDetails/UserData/styles";

export type Props = {
  userData: UserProps;
  fetchUserDetails: () => Promise<void>;
};

const URL_UPDATE_USER = "https://clicker-critics-api.onrender.com/user/update";

const EditUsersButton: FC<Props> = ({ userData, fetchUserDetails }) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [userCredentials, setUserCredentials] = useState<UserUpdate>({
    username: "",
    password: "",
    email: "",
    avatar: "",
    description: "",
    user_type: "",
  });
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const user_id = userData.id;

    if (!accessToken || !user_id) {
      console.error(
        "No se encontró el token de acceso o el ID de usuario en el almacenamiento local."
      );
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://clicker-critics-api.onrender.com/user/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          console.error("Error al obtener datos del usuario");
          return null;
        }

        const userData = await response.json();
        setUserCredentials({
          ...userData,
          password: null,
        });
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        setUpdateError("Error al cargar datos del usuario.");
      }
    };

    fetchUserData();
  }, [userData]);

  const isValidURL = (url: string | undefined) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidUsername = (username: string) => {
    return (
      username && username.length <= 12 && /^[a-zA-Z0-9_]+$/.test(username)
    );
  };

  const isValidEmail = (email: string) => {
    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onUpdateUser = async (userCredentials: UserUpdate) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const user_id = userData.id.toString();

      if (!accessToken) {
        setUpdateError("No se encontró un token de acceso válido.");
        return;
      }

      const requestBody: {
        id: string;
        username?: string;
        email?: string;
        avatar?: string;
        password?: string;
        description?: string;
        user_type?: string;
      } = {
        id: user_id ? user_id : "",
      };

      if (userCredentials.username) {
        requestBody.username = userCredentials.username;
      }

      if (userCredentials.email) {
        requestBody.email = userCredentials.email;
      }

      if (userCredentials.avatar) {
        requestBody.avatar = userCredentials.avatar;
      } else {
        requestBody.avatar = "";
      }

      if (userCredentials.description) {
        requestBody.description = userCredentials.description;
      } else {
        requestBody.description = "";
      }

      if (userCredentials.password) {
        requestBody.password = userCredentials.password;
      } else {
        requestBody.password = "";
      }
      if (userCredentials.user_type) {
        requestBody.user_type = userCredentials.user_type;
      }

      const response = await fetch(URL_UPDATE_USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setConfirmationVisible(false);
        fetchUserDetails();
      } else {
        const errorData = await response.json();
        setUpdateError(
          `Error al actualizar: ${
            errorData.detail[0].msg || "Comprueba tus datos."
          }`
        );
        return;
      }

      if (!accessToken) {
        setUpdateError(
          "No has iniciado sesión o tu sesión ha expirado. Por favor, inicia sesión nuevamente."
        );
        return;
      }

      if (userCredentials.username) {
        localStorage.setItem("username", userCredentials.username);
      }

      setUpdateSuccess("Usuario actualizado con éxito");

      setTimeout(() => {
        setConfirmationVisible(false);
      }, 2000);
    } catch (err) {
      setUpdateError("Error al actualizar, comprueba tus datos.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      onUpdateUser(userCredentials);
    }
  };

  const handleAddGame = () => {
    setConfirmationVisible(true);
    setCanSubmit(false);
  };

  const handleClose = () => {
    setConfirmationVisible(false);
  };

  const handleCloseError = () => {
    setUpdateError("");
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    if (isValidUsername(newUsername)) {
      setUsernameError("");
    } else {
      setUsernameError("El nombre de usuario no es válido. Debe tener un máximo de 12 caracteres y solo puede contener letras, números y guiones bajos.");
    }
    setUserCredentials({
      ...userCredentials,
      username: newUsername,
    });
    setCanSubmit(!!isValidUsername(newUsername) && !!isValidEmail(userCredentials.email) && !!isValidURL(userCredentials.avatar));
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (isValidEmail(newEmail)) {
      setEmailError("");
    } else {
      setEmailError("El correo electrónico no es válido.");
    }
    setUserCredentials({
      ...userCredentials,
      email: newEmail,
    });
    setCanSubmit(!!isValidUsername(userCredentials.username) && !!isValidEmail(newEmail) && !!isValidURL(userCredentials.avatar));
  };
  
  const handleAvatarChange = () => {
    const newURL = prompt(
      "Introduce la nueva URL del avatar:",
      userCredentials.avatar
    );
    if (newURL !== null) {
      if (isValidURL(newURL)) {
        setUserCredentials({
          ...userCredentials,
          avatar: newURL,
        });
        setAvatarError("");
      } else {
        setAvatarError(
          "La URL del avatar no es válida. Por favor, introduce una URL válida."
        );
      }
      setCanSubmit(!!isValidUsername(userCredentials.username) && !!isValidEmail(userCredentials.email) && !!isValidURL(newURL));
    }
  };
  

  return (
    <>
      <EditButton onClick={handleAddGame} />
      {isConfirmationVisible && (
        <ConfirmationBackground>
          <UpdateContainer>
            <CrossContainer>
              <CloseButton onClick={handleClose} />
            </CrossContainer>
            <Title>Actualizar Usuario</Title>
            {!!updateError && (
              <ErrorContainer>
                {updateError}
                <FaTimes onClick={handleCloseError} />
              </ErrorContainer>
            )}
            <MainColumn>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Column>
                    <Container>
                      <TextLabel>Nombre de usuario</TextLabel>
                      <Input
                        type="text"
                        name="Nombre de usuario"
                        placeholder="Nombre de usuario"
                        value={userCredentials.username}
                        onChange={handleUsernameChange}
                      />
                      {usernameError && (
                        <ErrorContainer>{usernameError}</ErrorContainer>
                      )}
                    </Container>
                    <Container>
                      <TextLabel>Correo Electrónico</TextLabel>
                      <Input
                        type="text"
                        name="Correo Electrónico"
                        placeholder="Correo Electrónico"
                        value={userCredentials.email}
                        onChange={handleEmailChange}
                      />
                      {emailError && (
                        <ErrorContainer>{emailError}</ErrorContainer>
                      )}
                    </Container>

                    <Container>
                      <TextLabel>Contraseña</TextLabel>
                      <Input
                        type="text"
                        name="Contraseña"
                        placeholder="Contraseña"
                        value={userCredentials.password}
                        onChange={(e) =>
                          setUserCredentials({
                            ...userCredentials,
                            password: e.target.value,
                          })
                        }
                      />
                    </Container>
                    {userCredentials.user_type !== "ADMIN" && (
                      <Container>
                        <TextLabel>Tipo de Usuario</TextLabel>
                        <ToggleRow>
                          {userCredentials.user_type === "PROFESSIONAL"
                            ? "Profesional"
                            : "Normal"}{" "}
                          <ToggleButton
                            active={
                              userCredentials.user_type === "PROFESSIONAL"
                            }
                            onClick={() => {
                              setUserCredentials({
                                ...userCredentials,
                                user_type:
                                  userCredentials.user_type === "PROFESSIONAL"
                                    ? "USER"
                                    : "PROFESSIONAL",
                              });
                              setCanSubmit(false);
                            }}
                          ></ToggleButton>
                        </ToggleRow>
                      </Container>
                    )}
                  </Column>
                  <Column>
                    <Container>
                      <TextLabel>Avatar</TextLabel>
                      <Avatar
                        src={
                          userCredentials.avatar || "/images/default_user.png"
                        }
                        alt="Avatar"
                        width={100}
                        height={100}
                        onClick={handleAvatarChange}
                        style={{ cursor: "pointer" }}
                      />
                      {avatarError && (
                        <ErrorContainer>{avatarError}</ErrorContainer>
                      )}
                    </Container>
                    {userCredentials.user_type === "PROFESSIONAL" && (
                      <Container>
                        <TextLabel>Descripción</TextLabel>
                        <Description
                          name="Texto de la descripción..."
                          placeholder="Texto de la  descripción..."
                          value={userCredentials.description}
                          onChange={(e) =>
                            setUserCredentials({
                              ...userCredentials,
                              description: e.target.value,
                            })
                          }
                        />
                      </Container>
                    )}
                  </Column>
                </Row>
                <Button disabled={!canSubmit}>Actualizar</Button>{" "}
              </Form>
            </MainColumn>
          </UpdateContainer>
        </ConfirmationBackground>
      )}
    </>
  );
};

export default EditUsersButton;
