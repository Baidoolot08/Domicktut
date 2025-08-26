import React, { useEffect } from "react";
import "./Welcome.scss";
import bgHome from "../../../../assets/images/home-bg.png";
import Slider from "react-slick";
import { LiaYoutube } from "react-icons/lia";
import { IoLogoInstagram } from "react-icons/io";
import { BiLogoVk } from "react-icons/bi";
import { MdWhatsapp } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import welcomeImg1 from "../../../../assets/images/welcome1.svg";
import welcomeImg2 from "../../../../assets/images/welcome2.svg";
import welcomeImg3 from "../../../../assets/images/welcome3.svg";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../FireBase";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../../redux/userSlice";
import AuthContext, { useAuth } from "../../../../context/AuthContext";

const Welcome = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { logOut } = useAuth(AuthContext);
  const dispatsh = useDispatch();
  const [priceRange, setPriceRange] = useState([13000, 150000]);

  const { user } = useSelector((s) => s.userReducer);
  const handleRangeChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };
  const confirmLogout = async () => {
    await logOut();
    dispatsh(getUser({}));
    setModalVisible(false);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  async function handleLogOut() {
    await logOut();
    dispatsh(getUser({}));
  }
  const houseCategory = [
    {
      id: 1,
      image: welcomeImg1,
      title: "С бассейном",
    },
    {
      id: 2,
      image: welcomeImg2,
      title: "Семейные",
    },
    {
      id: 3,
      image: welcomeImg3,
      title: "Хиты продаж",
    },
  ];
  async function getPersonData() {
    return await onAuthStateChanged(auth, (data) => {
      return dispatsh(getUser(data));
    });
  }
  useEffect(() => {
    getPersonData();
  }, []);
  return (
    <div
      id="welcome"
      style={{
        background: `url("${bgHome}") no-repeat bottom/cover`,
      }}
    >
      <div className="container">
        <div className="welcome">
          <div className="welcome--left">
            <h1>
              Аренда коттеджей <br /> и домов в Казани
            </h1>
            <p>
              Найдите идеальный вариант сами <br /> или предоставьте это нам
            </p>
            <div className="welcome--left__category">
              <Slider {...settings}>
                {houseCategory.map((el) => (
                  <div className="welcome--left__category--card" key={el.id}>
                    <img src={el.image} alt="img" />
                    <h4>{el.title}</h4>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="welcome--left__icons">
              <a href="#">
                <LiaYoutube />
              </a>
              <a href="#">
                <IoLogoInstagram />
              </a>
              <a href="#">
                <BiLogoVk />
              </a>
              <a href="#">
                <MdWhatsapp />
              </a>
              <a href="#">
                <FaTelegramPlane />
              </a>
            </div>
          </div>
          <div className="booking-filter">
            <div className="booking-filter__field">
              <label>Въезд</label>
              <input type="text" placeholder="От" />
            </div>
            <div className="booking-filter__field">
              <label>Отъезд</label>
              <input type="text" placeholder="До" />
            </div>

            <div className="booking-filter__field">
              <label>Количество человек</label>
              <input type="number" min="1" placeholder="12" />
            </div>

            <div className="booking-filter__range">
              <input
                type="range"
                min="13000"
                max="150000"
                value={priceRange[0]}
                onChange={(e) => handleRangeChange(0, e.target.value)}
              />
              <input
                type="range"
                min="13000"
                max="150000"
                value={priceRange[1]}
                onChange={(e) => handleRangeChange(1, e.target.value)}
              />
              <div className="booking-filter__range-labels">
                <span>{priceRange[0].toLocaleString()} ₽</span>
                <span>{priceRange[1].toLocaleString()} ₽</span>
              </div>
            </div>

            <button className="booking-filter__submit">Найти</button>
          </div>
        </div>
        {user?.providerData?.map((el, idx) => (
          <div className="person" key={idx}>
            <img
              src={
                el.photoURL
                  ? el.photoURL
                  : "https://cdn-icons-png.freepik.com/512/4387/4387456.png"
              }
              alt="user"
            />
            <h3>{el.displayName || "User"}</h3>
            <button onClick={() => setModalVisible(true)}>X</button>
          </div>
        ))}
        ,
        {modalVisible && (
          <div className="logout-modal">
            <div className="logout-modal__content">
              <h3>Вы точно хотите выйти?</h3>
              <div className="logout-modal__buttons">
                <button onClick={confirmLogout}>Да</button>
                <button onClick={() => setModalVisible(false)}>Нет</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
