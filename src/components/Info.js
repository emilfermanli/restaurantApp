import React from 'react'
import { Link } from 'react-router-dom'
import RestaurantImg from "../images/res.jpg"
import style from "./info.module.scss"
import Lottie from "lottie-react";
import RestaurantAnimation from "../animations/21652-delivery-guy-waiting.json"



function Info() {
  return (
    <div className={style.infoPageContainer}>
      <div className={style.box}>
        <img src={RestaurantImg} alt="logo" />
      </div>
      <div className={`${style.box} ${style.infoPageInfoSide}`}>
        <div className={style.animationWrapperBox}>
          <Lottie animationData={RestaurantAnimation} />
        </div>
        <h1>
          Sushi Restaurant
        </h1>
        <p>
          A restaurant is a business that prepares and serves food and drinks to customers.[1] Meals are generally served and eaten on the premises, but many restaurants also offer take-out and food delivery services. Restaurants vary greatly in appearance and offerings, including a wide variety of cuisines and service models ranging from inexpensive fast-food restaurants and cafeterias to mid-priced family restaurants, to high-priced luxury establishments.
        </p>
        <Link to="/home">Giriş</Link>
      </div>
    </div>
  )
}

export default Info