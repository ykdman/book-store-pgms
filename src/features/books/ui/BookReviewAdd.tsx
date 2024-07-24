import Button from "@/shared/components/Button";
import { BookReviewItemWrite } from "@/shared/models/book.model";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface Props {
  onAdd: (data: BookReviewItemWrite) => void;
}

function BookReviewAdd({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea {...register("content", { required: true })}></textarea>
          {errors.content && (
            <p className="error-text">리뷰 내용을 입력해 주세요.</p>
          )}
        </fieldset>

        <div className="submit">
          <fieldset>
            <select
              {...register("score", { required: true, valueAsNumber: true })}
            >
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
            </select>
          </fieldset>
          <Button size="medium" scheme="primary">
            작성하기
          </Button>
        </div>
      </form>
    </BookReviewAddStyle>
  );
}

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 12px;
      justify-content: end;
      flex-direction: column;
      .error-text {
        color: red;
        margin: 0;
        padding: 0;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      resize: none;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 12px;
    }
  }

  .submit {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    gap: 4px;
  }
`;

export default BookReviewAdd;
