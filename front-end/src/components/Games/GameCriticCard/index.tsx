import { FC, useEffect, useRef, useState } from "react";
import {
  Container,
  TextDate,
  Row,
  Box,
  Rating,
  CriticInfo,
  Author,
  Text,
  SeeMoreButton,
  DeleteButtonContainer,
  ButtonsRow,
  AuthorRow,
} from "./styles";
import Link from "next/link";
import { Critic as CriticProps } from "@/models/Critic/types";
import DeleteGamesCriticButton from "../DeleteGamesCriticButton";
import Image from "next/image";

export type Props = {
  criticData: CriticProps;
  fetchData: () => Promise<void>;
};

const GameCriticCard: FC<Props> = ({ criticData, fetchData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState<number>(100);
  const [showButton, setShowButton] = useState<boolean>(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  function formatDate(dateToChange: Date): string {
    const date = new Date(dateToChange);

    const months: string[] = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();

    return `${month} ${day},${year}`;
  }

  const date = formatDate(criticData.creation_date).toString();

  function handleSeeMoreClick() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    if (!isExpanded) {
      setMaxHeight(100);
    } else {
      setMaxHeight(textRef.current?.scrollHeight || 0);
    }

    if (textRef.current) {
      setShowButton(textRef.current.scrollHeight > maxHeight);
    }
  }, [isExpanded, maxHeight]);

  return (
    <Container>
      <Box>
        <Row>
          <Rating $rating={criticData.score}>{criticData.score}</Rating>
          <CriticInfo>
            <AuthorRow>
              <Link href={`/user/${criticData.userId}`}>
                <Author>{criticData.author}</Author>
              </Link>
              {criticData.critic_type == "PROFESSIONAL" && (
                <Image src={"/images/proffesional_icon.png"} alt="" width={30} height={30}/>
              )}
            </AuthorRow>
            <TextDate>{date}</TextDate>
          </CriticInfo>
        </Row>
        <Text isExpanded={isExpanded} ref={textRef}>
          {criticData.text}
        </Text>
        <ButtonsRow>
          {isExpanded || showButton ? (
            <SeeMoreButton onClick={handleSeeMoreClick}>
              {isExpanded ? "Ver menos" : "Ver más"}
            </SeeMoreButton>
          ) : null}
          <DeleteButtonContainer>
            <DeleteGamesCriticButton
              criticData={criticData}
              fetchData={fetchData}
            />
          </DeleteButtonContainer>
        </ButtonsRow>
      </Box>
    </Container>
  );
};

export default GameCriticCard;
