import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FormatPrice from "../Helpers/FormatPrice";
import { Button } from "../styles/Button";

const ListView = ({ products }) => {
  return (
    <Wrapper className="section">
      <div className="container grid">
        {products.map((curElem) => {
          const { id, city, province, land_size } = curElem; // Updated destructuring
          return (
            <div className="card grid grid-two-column">
              {/* Assuming there are no images for cities, you can remove the figure and img tags */}
              <div className="card-data">
                <h3>{city}</h3>
                <p>Province: {province}</p>
                <p>Land Size: {land_size}</p>

                <NavLink to={`/singleproduct/${id}`} className="btn-main">
                  <Button className="btn">Read More</Button>
                </NavLink>
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* Your styling remains the same */
`;

export default ListView;
