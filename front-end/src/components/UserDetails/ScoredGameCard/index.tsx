import { FC, useEffect, useRef, useState } from "react";
import {
  Container,
  TextDate,
  Column,
  Rating,
  Author,
  CriticInfo,
  Cover,
} from "./styles";
import Link from "next/link";
import { Game } from "@/models/Game/types";

export type Props = {
  gameData: {
    game: Game;
    score: number;
  };
};

const ScoredGameCard: FC<Props> = ({ gameData }) => {
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

  const date = formatDate(gameData.game.release_date).toString();

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
          <Cover
            src={gameData.game.cover}
            width={1000}
            height={1000}
            alt=""
            style={{ maxWidth: `${95}px`, minHeight: `${151}px` }}
          />
          <CriticInfo>
            <Column>
              <Link href={`/game/${gameData.game.id}`}>
                <Author>{gameData.game.title}</Author>
              </Link>
              <TextDate>{date}</TextDate>
            </Column>
            <Rating $rating={gameData.score}>{gameData.score}</Rating>
          </CriticInfo>

    </Container>
  );
};

export default ScoredGameCard;
