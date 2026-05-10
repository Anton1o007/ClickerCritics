import React from "react";
import { useRouter } from "next/router";
import { UpdateProfileButton } from "./styles";

const UpdateProfileRedirectButton = () => {
  const router = useRouter();

  const redirectToUpdateProfile = () => {
    router.push("/user/update");
  };

  return (
    <UpdateProfileButton onClick={redirectToUpdateProfile}>
      Actualizar Perfil
    </UpdateProfileButton>
  );
};

export default UpdateProfileRedirectButton;
