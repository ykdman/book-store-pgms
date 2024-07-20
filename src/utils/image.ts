export const getImgSrc = (id: number, width?: number, height?: number) => {
  return `https://picsum.photos/id/${id}/${width ? width : "600"}/${
    height ? height : "600"
  }`;
};
