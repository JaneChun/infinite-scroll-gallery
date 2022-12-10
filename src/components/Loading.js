import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const GifImage = styled.img`
  width: 7%;
`;

export default function Loading() {
  return (
    <Container>
      <GifImage src="./loading.gif" />
    </Container>
  );
}
