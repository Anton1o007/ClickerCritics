import type { FC } from "react";
import {
  Avatar,
  Column,
  Container,
  GenresList,
  Row,
  TextInfo,
  TextInfoContainer,
  UserGenre,
  UsernameText,
} from "./styles";
import { User } from "@/models/User/types";
import Image from "next/image";

export type Props = {
  user: User;
  userGenres: string[];
  isProfessional: boolean;
};

const UserData: FC<Props> = ({ user, userGenres, isProfessional }) => {
  const handleRenderGenre = () => {
    if (userGenres !== null) {
      return userGenres.map((genre, index) => (
        <UserGenre key={index} index={index}>
          {genre}
        </UserGenre>
      ));
    }
  };

  return (
    <Container>
      {user.avatar ? (
        <Avatar
          src={user.avatar}
          width={150}
          height={150}
          alt="No hay imagen"
        />
      ) : (
        <Avatar
          src="/images/default_user.png"
          width={150}
          height={150}
          alt="No hay imagen"
        />
      )}

      <TextInfoContainer>
        <Row>
          <Column>
            {" "}
            <UsernameText>{user.username}</UsernameText>
            <TextInfo>E-mail: {user.email}</TextInfo>
          </Column>
          {isProfessional && (
          <Image
            src={"/images/proffesional_icon.png"}
            alt=""
            width={40}
            height={40}
          />)}
        </Row>
        <GenresList>{handleRenderGenre()}</GenresList>
      </TextInfoContainer>
    </Container>
  );
};

export default UserData;
