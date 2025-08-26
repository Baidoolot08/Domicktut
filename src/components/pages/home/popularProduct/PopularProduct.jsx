import React from "react";
import "./PopularProduct.scss";
import productImg from "../../../../assets/images/product.png";
import ProductCard from "../../../ui/productCard/ProductCard";
import { useEffect } from "react";
import { getProduct } from "../../../../redux/CreateProductSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

const PopularProduct = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((s) => s.mainReducer);

  async function getAllProduct() {
    try {
      let res = await axios.get(
        `https://api-crud.elcho.dev/api/v1/55ec7-d2f4e-c6620/dom`
      );
      let { data } = res.data;
      dispatch(getProduct(data));
    } catch (error) {
      console.log(error.message);
      
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div id="popular">
      <div className="container">
        <h1>Популярное в каталоге</h1>
        <div className="popular">
          {product.map((el) => (
            <ProductCard el={el} key={el._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
