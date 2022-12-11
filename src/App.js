import "./styles.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import useAxios from "./util/useAxios";
import Loading from "./components/Loading";

const Wrapper = styled.div``;

const Container = styled.section``;

const Item = styled.img`
  width: 300px;
`;

export default function App() {
  const [images, setImages] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const { data, loading } = useAxios(pageNum);

  console.log(loading);

  useEffect(() => {
    if (data !== null) {
      setImages([...images, ...data]);
    }
  }, [data]); // useAxios로부터 받아오는 data가 변경될 때마다 setImages로 images를 업데이트한다.

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight
    ) {
      setPageNum((pageNum) => pageNum + 1);
      console.log(pageNum);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // scroll 이벤트 등록

    return () => window.removeEventListener("scroll", handleScroll); // scroll 이벤트 해제
  });

  return (
    <Wrapper>
      <Container>
        {images &&
          images.map((el) => <Item src={el.urls.regular} key={el.id} />)}
      </Container>
      {loading && <Loading />}
      {/* loading이 true면 표시한다. */}
    </Wrapper>
  );
}
