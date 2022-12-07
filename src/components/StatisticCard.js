import React from 'react'
import style from "./statisticcard.module.scss"


function StatisticCard({ icon, title, dailyStatus, statisticsData,bgColor }) {
  return (
    <div className={style.cards}>
      <div className={style.statisticSide}>
        <h4>{title}</h4>
        <h2>{dailyStatus}</h2>
        <div>
          <span>
            {statisticsData}
          </span>
        </div>
      </div>
      <div>
        <div style={{
          backgroundColor: bgColor
        }} className={style.circleIconWrapper}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatisticCard