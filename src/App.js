import "./styles.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";
import Loading from "./components/Loading";

const Wrapper = styled.div``;

const Container = styled.section`
  width: 100%;
`;

const Item = styled.div`
  /* width: 300px; */
  float: left;
  margin: 10px;

  &img {
    width: 100%;
    height: 170px;
  }
`;

export default function App() {
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);
  console.log(pageNum);

  const URL =
    "https://api.unsplash.com/photos?page=1&client_id=BzK9qcDoVOU37glq0ApRxpPRDnL2aFmNrkoUCVMo2BI";

  const { data } = useAxios(URL, pageNum, setLoading);

  let scrollEnd =
    window.innerHeight + document.documentElement.scrollTop + 1 >=
    document.documentElement.scrollHeight;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollEnd) {
        // Window Height와 Scroll Top을 더한 값이 Scroll Height와 같아지는 지점이 스크롤이 맨 아래까지 당겨진 경우이다.
        // 이때 여기서 + 1을 해주는 이유는 몇몇 브라우저에서는 값이 일치하지 않을 수 있기 때문
        setPageNum(pageNum + 1);
      }
    };

    window.addEventListener("scroll", handleScroll); // scroll 이벤트가 감지되면 handleScroll 함수가 실행된다.

    return () => window.removeEventListener("scroll", handleScroll); // remove function
  }, [scrollEnd]);

  return (
    <Wrapper>
      <Container>
        {data.map((el) => (
          <Item>
            <img src={el.urls.regular} key={el.id} />
          </Item>
        ))}
      </Container>
      {loading && <Loading />}
      {/* loading이 true면 표시한다. */}
    </Wrapper>
  );
}
