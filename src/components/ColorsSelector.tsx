import styled from "styled-components";
const ColorsSelector = ({
  colors,
  colorActive,
  setColorActive,
}: {
  colors: string[];
  colorActive: number;
  setColorActive: (index: number) => void;
}) => {
  return (
    <ColorsContainer>
      <div className="colors">
        {colors.map((color, index) => {
          return (
            <div
              onClick={() => setColorActive(index)}
              className={`color ${index === colorActive && "active"}`}
              style={{ backgroundColor: color }}
              key={index}
            ></div>
          );
        })}
      </div>
    </ColorsContainer>
  );
};

export default ColorsSelector;

const ColorsContainer = styled.div`
  .color {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
  //color active
  .color.active {
    transform: scale(1.2);
    box-shadow: 0 0 0 3px #242424;

    margin-top: -10px;
  }
`;
