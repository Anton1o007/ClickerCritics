import { FC } from "react";
import {
  Container,
  TextDate,
  Row,
  Title,
  GameInfo,
  Cover,
  CoverContainer,
  StatusContainer,
  ButtonsContainer,
} from "./styles";
import Link from "next/link";
import { User as UserProps } from "@/models/User/types";
import DeleteuserButton from "../DeleteUserButton";
import EditUsersButton from "../EditUsersButton";

export type Props = {
  userData: UserProps;
  fetchUserDetails: () => Promise<void>;
  authenticated: boolean;
};

const UsersCard: FC<Props> = ({
  userData,
  fetchUserDetails,
  authenticated,
}) => {
  return (
    <Container>
      <CoverContainer>
        {userData.avatar ? (
          <Cover src={userData.avatar} width={50} height={50} alt="" />
        ) : (
          <Cover src="/images/default_user.png" width={50} height={50} alt="" />
        )}
      </CoverContainer>
      <GameInfo>
        <Row>
          <Link href={`/user/${userData.id}`}>
            <Title>{userData.username}</Title>
          </Link>
          <TextDate>{userData.user_type}</TextDate>
        </Row>
        <StatusContainer>
          {" "}
          {authenticated && (
            <ButtonsContainer>
              <EditUsersButton
                userData={userData}
                fetchUserDetails={fetchUserDetails}
              />
              <DeleteuserButton
                userData={userData}
                fetchUserDetails={fetchUserDetails}
              />
            </ButtonsContainer>
          )}
        </StatusContainer>
      </GameInfo>
    </Container>
  );
};

export default UsersCard;
