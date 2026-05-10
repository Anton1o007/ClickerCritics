import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-top: 2.5%;
    gap: 10px;
`;

export const SliderContainer = styled.div`
  width: 400px;
  @media (max-width: 768px) {
    width: 65%;
  }
`;

export const Slider = styled.input`
width: 100%;
height: 15px;
border: 2.5px solid ${(props) => props.theme.nord.dark0};
border-radius: 5px;
background: linear-gradient(to right, 
  #ff0000 0%,
  #ff0000 10%,
  #ff4000 10%,
  #ff4000 20%,
  #ff8000 20%,
  #ff8000 30%,
  #ffbf00 30%,
  #ffbf00 40%,
  #ffff00 40%,
  #ffff00 50%,
  #bfff00 50%,
  #bfff00 60%,
  #80ff00 60%,
  #80ff00 70%,
  #40ff00 70%,
  #40ff00 80%,
  #00ff00 80%, 
  #00ff00 90%, 
  #00ff80 90%,
  #00ff80 100%
);
outline: none;
opacity: 0.7;
-webkit-appearance: none;
appearance: none;
transition: opacity 0.2s;

&::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.nord.dark0};
  background: #ffffff;
  cursor: pointer;
}

&::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #ffffff;
  cursor: pointer;
}
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  align-items: center;
  align-content: center;
  gap: 20px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  height: fit-content;
  gap:10px;
`;

export const RatingLabel = styled.p`
  width: 45px;
  text-align: center;
  padding: 5px;
  color: ${(props) => props.theme.nord.dark0};
  font-family: "proxima-nova-extrabold", sans-serif;
  font-size: 28px;
  margin-bottom: 10px;
  border: 2.5px solid ${(props) => props.theme.nord.dark0};
  border-radius: 5px;
`;