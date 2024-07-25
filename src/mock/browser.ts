import { setupWorker } from "msw/browser";
import { addReview, reviewsById, reviewForMain } from "./reviews";
import { bestBooks } from "./books";

const handlers = [reviewsById, addReview, reviewForMain, bestBooks];

export const worker = setupWorker(...handlers);
