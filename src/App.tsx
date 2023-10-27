import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FastAverageColor } from "fast-average-color";
import { ShareIcon } from "./assets/Icons";
import { productMockup } from "../utils/mockupProduct";
import {
  ExtractStringByComma,
  HtmlToText,
  MaxWords,
  NumberSeparatorDot,
} from "../utils/FunctionsProducts";
import ColorsSelector from "./components/ColorsSelector";
import QuantitySelector from "./components/QuantitySelector";

function App() {
  const { colors, name_prod, price, desc_short, desc_long, img } =
    productMockup;
  // const [product, setProduct] = useState(productMockup);
  const mainImageRef = useRef(null);
  const [mainImage, setMainImage] = useState("");
  const colorsList = ExtractStringByComma(colors);
  const [colorActive, setColorActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [averageColorGradient, setAverageColorGradient] = useState<any>("");
  const [fontColor, setFontColor] = useState<string | null>(null);

  const getAverageColor = () => {
    const fac = new FastAverageColor();
    fac
      .getColorAsync("/images/" + mainImage)
      .then((color) => {
        setAverageColorGradient(color.rgba);
        calculateFontColor(color.rgba, 90);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const calculateFontColor = (rgba: any, luminanceValue = 100) => {
    const rgb = {
      r: rgba.split("(")[1].split(",")[0],
      g: rgba.split("(")[1].split(",")[1],
      b: rgba.split("(")[1].split(",")[2].split(")")[0],
    };
    const luminance = 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b;
    if (luminance < luminanceValue) {
      setFontColor("#ffffff");
    } else {
      setFontColor(null);
    }
  };

  const imageViewsHandler = (e: any) => {
    if (mainImage === e) {
      setMainImage(mainImage);
    } else {
      setMainImage(e);
    }
  };

  useEffect(() => {
    if (mainImage) {
      getAverageColor();
    }
  }, [mainImage]);

  useEffect(() => {
    if (productMockup) {
      document.title = name_prod;
      setMainImage(img[0]);
    }
  }, []);

  useEffect(() => {
    const handleWheel = () => {
      const container = document.getElementById("images");
      if (!container) return;
      container.addEventListener("wheel", function (e) {
        if (e.deltaY > 0) {
          container.scrollLeft += 100;
          e.preventDefault();
        } else {
          container.scrollLeft -= 100;
          e.preventDefault();
        }
      });
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <ProductContainer
      style={{ background: averageColorGradient }}
      showMore={showMore}
      fontColor={fontColor}
    >
      <div className="content">
        <header className="title-background-container">
          <h1 className="title-background">{name_prod}</h1>
        </header>
        <main className="principal-container">
          <div className="images-container">
            <ShareIcon className="share-icon" />
            <div className="principal-image-container">
              <motion.img
                src={"/images/" + mainImage}
                alt={name_prod}
                className="principal-img"
                id="principalImage"
                ref={mainImageRef}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
              <span className="wattermark">{name_prod}</span>
            </div>
            <div id="images" className="images">
              {productMockup.img.map((e: any, i) => {
                // console.log("./assets/product/" + e);
                return (
                  <motion.img
                    src={"/images/" + e}
                    alt="drone"
                    key={i}
                    onClick={() => imageViewsHandler(e)}
                  />
                );
              })}
            </div>
          </div>
          <div className="description-container">
            <span className="price">$ {NumberSeparatorDot(price)}</span>
            <h1 className="title">{name_prod}</h1>
            <p className="desc_short">{desc_short}</p>
            <br />

            <div
              className="desc_long"
              dangerouslySetInnerHTML={{
                __html: HtmlToText(MaxWords(desc_long, showMore ? 10000 : 300)),
              }}
            ></div>
            <span className="show-more" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show less" : "Show more"}
            </span>
            <span className="colors-title">Colors</span>
            <ColorsSelector
              colors={colorsList}
              colorActive={colorActive}
              setColorActive={setColorActive}
            />
            <div className="quantity-container">
              <span className="quantity-title">Quantity</span>
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>

            <div className="buttons">
              <button className="add-to-cart">Add to cart</button>
              <button className="buy-now">Buy now</button>
            </div>
          </div>
        </main>
      </div>
    </ProductContainer>
  );
}

export default App;

const ProductContainer = styled.div<{
  showMore: boolean;
  zoom?: boolean;
  fontColor: string | null;
}>`
  position: relative;
  width: 100vw;
  height: auto;
  min-height: 100vh;

  overflow-x: hidden;
  overflow-y: hidden;
  background: #ffffffdf;
  color: ${(props) => (props.fontColor ? props.fontColor : "#ffffff")};
  transition: background 0.5s ease-in-out;

  .title-background-container {
    display: flex;

    position: absolute;
    width: 100%;
  }
  .title-background {
    position: absolute;
    font-size: 10rem;
    color: rgba(255, 255, 255, 0.034);
    font-weight: 700;
    top: 50%;
    left: 0;
    font-family: "Oswald", sans-serif;
    line-height: 1;
    writing-mode: vertical-rl;

    transform: rotate(-180deg);
    user-select: none;
  }

  .principal-container {
    display: flex;
    width: 1000px;
    height: 100%;

    /* min-height: 600px; */
    margin: 0 auto;
    padding-top: 2rem;
    align-items: center;
    justify-content: center;
    /* transition: all 0.5s ease-in-out; */
    @media (max-width: 768px) {
      padding-top: 0px;
    }
    @media (max-width: 992px) {
      width: 100%;
    }
  }
  .images-container {
    position: relative;
    width: 70%;
    height: 90%;

    z-index: 1;
    box-shadow: 0 0 20px 20px #00000023;
    border-radius: 10px;
  }
  .share-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    color: #2121216e;
    cursor: pointer;
    background: #fff;
    border-radius: 50%;
    padding: 5px;

    z-index: 1;
  }
  .principal-image-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${(props) => (props.zoom ? "0px 10px 0 0" : "10px 0 0 0")};
    position: relative;

    //transition for image
  }
  .wattermark {
    position: absolute;
    font-family: "Oswald", sans-serif;
    font-size: 8rem;
    font-weight: 700;
    color: #ffffff11;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    line-height: 1;
    z-index: 1;
    user-select: none;
  }
  .principal-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: ${(props) => (props.zoom ? "zoom-out" : "zoom-in")};
  }
  .images {
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;

    width: 100%;
    height: auto;
    z-index: 0;
    border-radius: 0 0 10px 10px;
    & > img {
      width: 100%;
      height: 100px;
      object-fit: cover;
      cursor: pointer;
      transition: all 0.25s ease;
      &:hover {
        /* transform: scale(1.1); */
        transform: translateY(-10px);
      }
    }
  }

  .description-container {
    width: 50%;
    height: fit-content;
    min-height: 600px;
    /* max-height: auto; */
    background: rgba(255, 255, 255, 0.24);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-shadow: -10px -10px 20px 20px #00000023;
    //blur
    backdrop-filter: blur(10px) saturate(100%);
    -webkit-backdrop-filter: blur(10px) saturate(100%);
    border-radius: 10px;

    border: 1px solid rgba(255, 255, 255, 0.18);
    border-top: 1px solid rgba(255, 255, 255, 0.298);
    border-right: 1px solid rgba(255, 255, 255, 0.18);
    border-bottom: none;
    border-left: none;

    z-index: 1;
    padding: 20px;
  }
  .price {
    font-size: 2rem;
    font-weight: 700;
    color: #212121;
    align-self: flex-end;
    margin-right: 20px;
    padding: 0px;
    margin-bottom: 0px;
  }
  .title {
    font-family: "Oswald", sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #0a0a0a;
  }
  .desc_short {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    color: #212121;
  }
  .desc_long {
    font-size: 1rem;
    font-weight: 400;
    color: #212121;
  }
  .show-more {
    text-align: end;
    font-size: 1rem;
    font-weight: 700;
    color: #212121;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .colors {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    height: 50px;
  }

  .colors-title {
    font-size: 1rem;
    font-weight: 700;
    color: #212121;
  }

  .quantity-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  .quantity-title {
    font-size: 1rem;
    font-weight: 700;
    color: #212121;
  }
  .quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    height: 100%;

    /* gap: 10px; */
  }
  .quantity-btn {
    /* color: #212121; */

    width: 30px;
    height: 30px;
    border-radius: 50%;
    /* border: 1px solid #212121; */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    //prevent selection
    user-select: none;

    transition: all 0.3s ease;
    &:hover {
      background: #ffffff;
      color: #00aeff;
      transform: scale(1.1);
    }
  }
  .quantity-input {
    font-family: "Montserrat", sans-serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: #212121;
    text-align: center;
    border: none;
    outline: none;
    background: transparent;
    width: 2.4rem;
  }
  .quantity-input::-webkit-outer-spin-button,
  .quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .add-to-cart {
    width: 80%;
    height: 50px;
    font-size: 1rem;
    font-weight: 700;
    background: #212121;
    color: #ffffff;
    transition: all 0.3s ease;
    &:hover {
      background: #ffffff;
      color: #212121;
      border: 1px solid #212121;
    }
  }
  .buy-now {
    color: #212121;
    background: #ffffff;
    width: 50%;
    height: 50px;
    font-size: 1rem;
    font-weight: 700;
    margin-top: 10px;
    transition: all 0.3s ease;
    &:hover {
      color: #5a5a5a;

      border: 1px solid #212121;
    }
  }

  @media (max-width: 768px) {
    background: #ffffffdf;
    padding: 0px;
    height: auto;
    .content {
      padding-top: 0px;
    }
    .principal-container {
      flex-direction: column;
      width: 100%;
      height: auto;
    }
    .images-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .principal-image-container {
      border-radius: 0;
    }
    .principal-img {
      width: 100%;
      height: 100%;
    }
    .images {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
    .description-container {
      width: 100%;
      height: 100%;
      /* background: white; */
      border-radius: 0;
    }
    .title-background-container {
      display: none;
    }
  }
`;
