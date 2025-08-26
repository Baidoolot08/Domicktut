import React, { useState } from "react";
import "./Request.scss";
import requestImg from "../../../../assets/images/request.png";
import { toast, Slide, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Request = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cation, setCation] = useState("");
  const [modal, setModal] = useState(false);

  const clearForm = () => {
    setName("");
    setPhone("");
    setCation("");
  };

  const isEmpty = (val) => val.length === 0 || val.replaceAll(" ", "") === "";

  const sendToTelegram = () => {
    if (isEmpty(name) || isEmpty(phone) || isEmpty(cation)) {
      toast.error("Пожалуйста, заполните все поля!", {
        position: "bottom-right",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    const chat_id = "-1002708842759";
    const token = "7784579498:AAE4SwLV99YhzCxGvp8so-GaYdzWdQb7WrU";
    const api_url = `https://api.telegram.org/bot${token}/sendMessage`;

    const userData = {
      chat_id,
      parse_mode: "HTML",
      text: `
<b>🧾 Новый заказ</b>\n
<b>👤 Имя:</b> ${name}
<b>📞 Телефон:</b> ${phone}
<b>💬 Связь:</b> ${cation}
      `,
    };

    axios
      .post(api_url, userData)
      .then(() => {
        toast.success("✅ Заказ отправлен в Telegram!", {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
          transition: Slide,
        });
        clearForm();
        setModal(false);
      })
      .catch(() => {
        toast.error("❌ Ошибка отправки", {
          position: "bottom-right",
          autoClose: 4000,
          theme: "colored",
          transition: Slide,
        });
      });
  };

  return (
    <div
      id="request"
      style={{
        background: `url("${requestImg}") no-repeat top/cover`,
      }}
    >
      <div className="container">
        <div className="request">
          <h1>Хотите сдать дом?</h1>
          <p>
            Оставьте заявку и мы свяжемся <br /> с вами для уточнения деталей
          </p>
          <button onClick={() => setModal(true)}>Оставить заявку</button>
        </div>
      </div>

      {modal && (
        <div className="logout-modal">
          <div className="logout-modal__content">
            <div className="logout-modal__buttons">
              <button class="a" onClick={() => setModal(false)}>
                X
              </button>
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Способ связи"
                value={cation}
                onChange={(e) => setCation(e.target.value)}
              />
            </div>
            <button onClick={sendToTelegram}>Отправить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
