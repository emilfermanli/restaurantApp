import { configureStore } from "@reduxjs/toolkit";
import restaurantData from "./restaurantData"
import tablesData from "./tablesData";


export default configureStore({
  reducer: {
    restaurantData,
    tablesData
  },
});
