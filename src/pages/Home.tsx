import { useMain } from "@/hooks/useMain";
import Banner from "@/shared/components/Banner/Banner";
import MainBest from "@/shared/components/Main/MainBest";
import MainNewBooks from "@/shared/components/Main/MainNewBooks";
import MainReview from "@/shared/components/Main/MainReview";
import Title from "@/shared/components/Title";
import styled from "styled-components";

function Home() {
  const { reviews, newBooks, bestBooks, banners } = useMain();
  console.log("배너", banners);

  return (
    <HomeStyle>
      {/* 배너 */}
      <Banner banners={banners} />
      {/* 베스트 셀러 */}
      <section className="section">
        <Title size="large">베스트 셀러</Title>
        <MainBest books={bestBooks} />
      </section>

      {/* 신간 */}
      <section className="section">
        <Title size="large">신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>

      {/* 리뷰 */}
      <section className="section">
        <Title size="large">리뷰</Title>

        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default Home;
