import { setupWorker } from "msw/browser";
import { addReview, reviewsById, reviewForMain } from "./reviews";
import { bestBooks } from "./books";
import { banners } from "./banner";

const handlers = [reviewsById, addReview, reviewForMain, bestBooks, banners];

export const worker = setupWorker(...handlers);
