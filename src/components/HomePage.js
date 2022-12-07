import React from 'react'
import { Container, Grid } from '@mui/material'
import style from "./homepage.module.scss"
import Money from '../icons/Money'
import StatisticCard from './StatisticCard'
import SuccesBucket from "../icons/SuccesBucket"
import RemoveBucket from "../icons/RemoveBucket"
import PlusBucket from '../icons/PlusBucket'
import OrderTable from './OrderTable'
import {useSelector} from "react-redux"

function HomePage() {

  const { dailyCancellationOrder, dailySuccesOrder, dailyEarnMoney, dailyOrderCount } = useSelector(state => state.tablesData)

  return (
    <div className={style.homePage}>
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard icon={<Money />} title="Qazanc (Günlük)" dailyStatus={`${dailyEarnMoney} (azn)`} statisticsData={"4.35%"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard icon={<SuccesBucket />} bgColor={"#3abaf4"} title="Sonlanan sifarişlər" dailyStatus={dailySuccesOrder} statisticsData={"56.35%"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard icon={<RemoveBucket />} bgColor={"#fc544b"} title="Ləğv olunan sifarişlər" dailyStatus={dailyCancellationOrder} statisticsData={"17.35%"} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticCard icon={<PlusBucket />} bgColor={"#ffa426"} title={"Sifariş sayı"} dailyStatus={dailyOrderCount} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <OrderTable />
        </Grid>
      </Container>
    </div>
  )
}

export default HomePage