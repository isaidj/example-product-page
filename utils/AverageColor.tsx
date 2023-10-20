import { FastAverageColor } from "fast-average-color";
const getAverageColor = (imgurl: string) => {
  const image = new Image();
  // console.log(image);
  //replace https with http
  image.src = imgurl.replace("https", "http");
  //from all origins

  image.crossOrigin = "Anonymous";

  const fac = new FastAverageColor();
  //wait for the image to load and then get the average color
  image.onload = () => {
    fac
      .getColorAsync(image)
      .then((color: any) => {
        console.log(color);
        return color.rgba;
        CalFontColor(color.rgba, 90);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
};
const CalFontColor = (rgba: any, luminanceValue = 100) => {
  //convert rgba to object
  const rgb = {
    r: rgba.split("(")[1].split(",")[0],
    g: rgba.split("(")[1].split(",")[1],
    b: rgba.split("(")[1].split(",")[2].split(")")[0],
  };
  //calculate luminance
  const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;

  if (luminance < luminanceValue) {
    return "#ffffff";
  } else {
    return null;
  }
};
