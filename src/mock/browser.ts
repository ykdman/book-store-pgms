import { setupWorker } from "msw/browser";
import { reviewsById } from "./reviews";

const handlers = [reviewsById];

export const worker = setupWorker(...handlers);
