import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaTimes } from "react-icons/fa";
import {
  UpdateContainer,
  Container,
  Title,
  Form,
  Input,
  ErrorContainer,
  Button,
  TextLabel,
  Column,
  Row,
  Description,
} from "./styles";
import { UserUpdate } from "@/models/User/types";
import { Avatar } from "@/components/UserDetails/UserData/styles";

const URL_UPDATE_USER = "https://clicker-critics-api.onrender.com/user/update";

const Update = () => {
  const router = useRouter();
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

  const handleCloseError = () => {
    setUpdateError("");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const user_id = localStorage.getItem("user_id");

    if (!accessToken || !user_id) {
      console.error(
        "No se encontró el token de acceso o el ID de usuario en el almacenamiento local."
      );
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://clicker-critics-api.onrender.com/user/${user_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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
  }, []);

  const onUpdateUser = async (userCredentials: UserUpdate) => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");

      if (!accessToken) {
        setUpdateError("No se encontró un token de acceso válido.");
        return;
      }

      // Declarar un tipo explícito para requestBody
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
        user_type: userCredentials.user_type,
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

      const response = await fetch(URL_UPDATE_USER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
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
        router.push(`/user/${user_id}`);
      }, 2000);
    } catch (err) {
      setUpdateError("Error al actualizar, comprueba tus datos.");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateUser(userCredentials);
  };

  return (
    <UpdateContainer>
      <Title>Actualizar Usuario</Title>
      {!!updateError && (
        <ErrorContainer>
          {updateError}
          <FaTimes onClick={handleCloseError} />
        </ErrorContainer>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Column>
            <Container>
              <TextLabel>Avatar</TextLabel>
              {userCredentials.avatar ? (
                <Avatar
                  src={userCredentials.avatar}
                  alt="Avatar"
                  width={100}
                  height={100}
                  onClick={() => {
                    const newURL = prompt(
                      "Introduce la nueva URL del avatar:",
                      userCredentials.avatar
                    );
                    if (newURL !== null) {
                      setUserCredentials({
                        ...userCredentials,
                        avatar: newURL,
                      });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <Avatar
                  src="/images/default_user.png"
                  alt="Avatar"
                  width={100}
                  height={100}
                  onClick={() => {
                    const newURL = prompt(
                      "Introduce la nueva URL del avatar:",
                      userCredentials.avatar
                    );
                    if (newURL !== null) {
                      setUserCredentials({
                        ...userCredentials,
                        avatar: newURL,
                      });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Container>
          </Column>
          <Column>
            <Container>
              <TextLabel>Nombre de usuario</TextLabel>
              <Input
                type="text"
                name="Nombre de usuario"
                placeholder="Nombre de usuario"
                value={userCredentials.username}
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    username: e.target.value,
                  })
                }
              />
            </Container>
            <Container>
              <TextLabel>Correo Electrónico</TextLabel>
              <Input
                type="text"
                name="Correo Electrónico"
                placeholder="Correo Electrónico"
                value={userCredentials.email}
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    email: e.target.value,
                  })
                }
              />
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
          </Column>
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
        </Row>
        <Button>Actualizar</Button>
      </Form>
    </UpdateContainer>
  );
};

export default Update;
