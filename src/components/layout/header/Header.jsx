import React, { useState } from "react";
import "./Header.scss";
import logo from "../../../assets/images/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { GoSearch } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";
const Header = () => {
  const [name, setName] = useState("");
  const nav = useNavigate();
  const { user } = useSelector((s) => s.userReducer);

  return (
    <header id="header">
      <div className="container">
        <div className="header">
          <div className="header--logo">
            <img src={logo} alt="img" onClick={() => nav("/")} />
            <button>Каталог</button>
          </div>
          <div className="header--nav">
            <NavLink to={"/"}>Частые вопросы</NavLink>
            <NavLink to={"/"}>Сотрудничество</NavLink>
          </div>
          <div className="header--contact">
            <a onClick={() => nav("/auth")}>
              <CiUser />
            </a>
            <a onClick={() => nav(user ? "/admin" : "/")}>
              <MdOutlineAdminPanelSettings />
            </a>
            <a onClick={() => nav(user ? "/favorite" : "/")}>
              <CiHeart />
            </a>
            <div className="header--search ">
              <a
                onClick={() => {
                  if (name.trim()) {
                    nav(`/search/${name}`);
                  }
                }}
              >
                <GoSearch />
              </a>
              <input
                type="text"
                placeholder="Поиск по названию"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
