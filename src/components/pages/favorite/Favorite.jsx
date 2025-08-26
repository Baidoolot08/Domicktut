import React from "react";
import "./Favorite.scss";
import { useSelector } from "react-redux";
import ProductCard from "../../ui/productCard/ProductCard";

const Favorite = () => {
  const { Favorite } = useSelector((s) => s.mainReducer);

  return (
    <div id="favorite">
      <div className="container">
        <h1>Избранное</h1>
        <div className="favorite">
          {Favorite.map((el) => (
            <ProductCard el={el} key={el} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
