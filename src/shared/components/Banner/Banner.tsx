import { Banner as IBanner } from "@/shared/models/banner.model";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import Slider from "react-slick";
import { useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
  banners: IBanner[];
}

function Banner({ banners }: Props) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);

  const handlePrev = () => {
    if (currentBannerIndex === 0) return;
    setCurrentBannerIndex((prev) => prev - 1);
  };
  const handleNext = () => {
    if (currentBannerIndex === banners.length - 1) return;
    setCurrentBannerIndex((prev) => prev + 1);
  };

  const transFromValue = useMemo(() => {
    return currentBannerIndex * -100;
  }, [currentBannerIndex]);

  const handleIndicatorClick = (index: number) => {
    setCurrentBannerIndex(index);
  };

  return (
    <BannerStyle>
      <BannerContainerStyle $transFromValue={transFromValue}>
        {banners.map((banner) => (
          <BannerItem key={banner.id} banner={banner} />
        ))}
      </BannerContainerStyle>

      <BannerButtonStyle>
        <button onClick={handlePrev} className="prev">
          <FaAngleLeft />
        </button>
        <button onClick={handleNext} className="next">
          <FaAngleRight />
        </button>
      </BannerButtonStyle>

      {/* 페이지네이션 */}

      <BannerIndicatorStyle>
        {banners.map((banner, index) => (
          <span
            className={index === currentBannerIndex ? "active" : ""}
            onClick={() => handleIndicatorClick(index)}
          ></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
}

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transFromValue: number;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transFromValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    position: absolute;
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 50%;
    transform: translateY(-50%);
    svg {
      fill: #fff;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default Banner;
