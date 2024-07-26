import BookReviewItem from "@/features/books/ui/BookReviewItem";
import { BookReviewItem as IBookReviewItem } from "@/shared/models";
import styled from "styled-components";

// slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Props {
  reviews: IBookReviewItem[];
}

function MainReview({ reviews }: Props) {
  const { isMobile } = useMediaQuery();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1 : 3,
    gap: 16,
  };

  return (
    <MainReviewStyle>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <BookReviewItem key={review.id} review={review} />
        ))}
      </Slider>
    </MainReviewStyle>
  );
}

const MainReviewStyle = styled.div`
  padding: 0 0 24px 0;

  .slick-track {
    padding: 12px 0;
  }

  .slick-slide > div {
    margin: 0 12px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
  @media screen AND (${({ theme }) => theme.mediaQuery.mobile}) {
    .slick-prev {
      left: 0;
    }

    .slick-next {
      right: 0;
    }
  }
`;

export default MainReview;
