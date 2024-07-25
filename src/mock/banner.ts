import { Banner } from "@/shared/models/banner.model";
import { fakerKO as faker } from "@faker-js/faker";
import { http, HttpResponse } from "msw";

const bannersData: Banner[] = [
  {
    id: 1,
    title: "배너 1 제목",
    description: "Banner 1 description",
    image: "https://picsum.photos/id/111/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
  {
    id: 2,
    title: "배너 2 제목",
    description: "Banner 2 description",
    image: "https://picsum.photos/id/123/1200/400",
    url: "http://some.url",
    target: "_self",
  },
  {
    id: 3,
    title: "배너 3 제목",
    description: "Banner 3 description",
    image: "https://picsum.photos/id/153/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
];

export const banners = http.get("http://localhost:8888/banners", () => {
  return HttpResponse.json(bannersData, { status: 200 });
});
