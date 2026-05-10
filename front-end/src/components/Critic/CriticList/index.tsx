import type { FC } from "react";
import React from "react";
import { Container, Line, Rating, RatingContainer, RatingText, Row } from "./styles";
import { Critic as CriticProps } from "@/models/Critic/types";
import { CriticCard } from "..";

export type Props = {
  criticsList: CriticProps[];
  ratingValue: number | null;
  fetchData: () => Promise<void>;
  checkReview: () => Promise<void>;
};

const CriticList: FC<Props> = ({ criticsList, ratingValue, fetchData, checkReview }) => {
  
  let formattedRating: string | number = "";

  if (ratingValue !== null){
    formattedRating = ratingValue % 1 === 0 ? ratingValue.toString() : ratingValue.toFixed(1);
  }

  return (
    <Container>
      <Row>
      {ratingValue !== null && (
          <RatingContainer>
            <RatingText>Nota Media</RatingText>
            <Rating $rating={ratingValue}>{formattedRating}</Rating>
          </RatingContainer>
        )}
      </Row>

      <Line />
      {criticsList.map((criticData, index) => (
        <CriticCard key={index} criticData={criticData} fetchData={fetchData} checkReview={checkReview}/>
      ))}
    </Container>
  );
};

export default CriticList;
