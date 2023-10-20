// import DOMPurify from "dompurify";
import { sanitize } from "isomorphic-dompurify";
export const ExtractStringByComma = (string: string) => {
  //extract string from string separated by comma
  let stringArray = string.split(",");
  return stringArray;
};
// console.log(
//   ExtractStringByComma(
//     "Albarella Dress - Mulberry Floral.webp,Albarella Dress White.webp,Albarella Dress - Kelly Green Floral.webp,Albarella Dress (1).webp,Albarella Dress.webp"
//   )[0]
// );
export const HtmlToText = (html: string) => {
  //desinfectamos el html
  // return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  const clean = sanitize(html, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br"],
  });
  return clean;
};

export const MaxWords = (text: string, max: number) => {
  if (text.length > max) {
    return text.substr(0, max) + "...";
  } else {
    return text;
  }
};
export const NumberSeparatorDot = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
