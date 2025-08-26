import React from "react";
import "./ProductCard.scss";
import {
  FaBed,
  FaTableTennis,
  FaSpa,
  FaSwimmingPool,
  FaUser,
  FaHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite } from "../../../redux/CreateProductSlice";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiHeart } from "react-icons/ci";

const ProductCard = ({ el }) => {
  const dispatch = useDispatch();
  const favorite = useSelector((s) => s.mainReducer.Favorite);
  const { user } = useSelector((s) => s.userReducer);
  const isInFavorite = favorite.some((item) => item._id === el._id);

  const handleToggleFavorite = () => {
    dispatch(getFavorite(el));

    toast[isInFavorite ? "info" : "success"](
      isInFavorite ? "Удалено из избранного 💔" : "Добавлено в избранное 🧡",
      {
        position: "bottom-right",
        autoClose: 2500,
        transition: Slide,
      }
    );
  };

  return (
    <div className="card">
      <div className="card__image">
        <img src={el.image} alt="Домик" />
        <div className="card__capacity">
          <FaUser /> до {el.people}
        </div>
        {user ? (
          <button className="card__like" onClick={handleToggleFavorite}>
            {isInFavorite ? (
              <FaHeart style={{ color: "#f4673f", fontSize: "22px" }} />
            ) : (
              <CiHeart style={{ fontSize: "22px" }} />
            )}
          </button>
        ) : null}
      </div>

      <div className="card__content">
        <h2 className="card__title">{el.title}</h2>
        <ul className="card__features">
          <li>
            <FaBed /> 5 спальных мест
          </li>
          <li>
            <FaTableTennis /> Настольный теннис
          </li>
          <li>
            <FaSpa /> Баня
          </li>
          <li>
            <FaSwimmingPool /> Бассейн
          </li>
        </ul>

        <div className="card__footer">
          <span className="card__price">
            от <strong>{el.price}₽</strong> / сутки
          </span>
          <a href="#" className="card__link">
            Подробнее
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
