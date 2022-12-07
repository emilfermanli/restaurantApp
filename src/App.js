import React,{useEffect} from "react"
import Header from "./components/Header"
import {Route, Routes} from "react-router-dom"
import Info from './components/Info';
import {useLocation} from "react-router-dom"
import HomePage from "./components/HomePage";
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import {getTables,getWaiters,getFoods} from "./store/restaurantData"
import {useDispatch} from "react-redux"
import AddProduct from "./components/AddProducts";

function App() {

  const dispatch = useDispatch()

  const location = useLocation()

  const getData = () => {
    axios.get("http://localhost:3000/data.json")
    .then(res => {
      if (res.status === 200) {
        dispatch(getTables(res.data.tables))
        dispatch(getWaiters(res.data.waiters))
        dispatch(getFoods(res.data.foods))
      }
    })
    .catch(err => {
      if (err.status) {
        toast.error("Something went wrong!",
          {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      }
    })
  }

  useEffect(() => {
    getData()
  }, []);
  

  return (
    <div className="App">

      {location.pathname !== "/info" ? <Header /> : <></>}
      

      <Routes>
        <Route path='/' element={<Info />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/home/:id' element={<AddProduct />} />
      </Routes>

      <ToastContainer  />
    </div>
  );
}

export default App;
