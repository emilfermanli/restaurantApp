import React, { useState,useEffect } from 'react'
import style from "./ordertable.module.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { uid } from 'uid';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { addTableFood, changeOrderStatus, removeTableStatus, deleteOrderStatus, earnMoney, cancelOrder, changeTableStatus } from "../store/tablesData"
import { useParams,useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};


function AddProduct() {

  const navigate = useNavigate()


  const params = useParams()


  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  

  const [currentTableData,setCurrentTableData] = useState([])

  const [productPrice,setProductPrice] = useState(0)
  
  
  

  const dispatch = useDispatch()
  const restaurantData = useSelector(state => state.restaurantData)
  const { tableStatus } = useSelector(state => state.tablesData)
  const [count, setCount] = useState(1);

  const [orderData,setOrderData] = useState({})


  useEffect(() => {

    
    
    let getTableData = tableStatus.find(index => index.id == params.id)
    
    
    if (!getTableData) navigate("/home")
    
    setCurrentTableData(getTableData)

  }, [params, tableStatus]);

  const formSchema = Yup.object().shape({
    food: Yup.string().required("* This field is required."),
  });
  


  const [open, setOpen] = useState(false);

  const { control,  handleSubmit,reset } = useForm({
    resolver: yupResolver(formSchema)
  });



  const onSubmit = () => {

    

    dispatch(addTableFood({ 
      ...orderData, 
      id: uid(24),
      count: count, 
      tableId: params.id,
      date: new Date().toJSON(), 
      status: 0
    }))

    reset()
    setProductPrice(0)
    setCount(1)
    
    handleClose()
  };


  
  
  


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProductPrice(0)
  };



  const IncNum = () => {
    setCount(count + 1);
  };


  const DecNum = () => {
    if (count > 1) setCount(count - 1);
    else return;
  };



  const verifyOrder = (index) => {
    dispatch(changeOrderStatus({ orderId: index.id, tableId: params.id }))
    dispatch(earnMoney(index.count * index.price))
    
  
  }

  const deleteOrder = (index) => {
    dispatch(deleteOrderStatus({ orderId: index.id, tableId: params.id }))
    dispatch(cancelOrder(1))
    
    
  }


  const tableExpireTime = () => {

    if (currentTableData.orders.length > 0) {
      dispatch(changeTableStatus(currentTableData.id))
      navigate("/home")
    } else {
      dispatch(removeTableStatus(currentTableData.id))
      navigate("/home")
    }
   
  }

  
  const addOrder = (item) => {
    setProductPrice(item.price)
    setOrderData(item)
  }

  return (
    <div className={`${style.orderTable} ${style.addproductTable}`}>
      <div className={style.orderPageHeader}>
        <h2>{currentTableData?.table} total qiymət:{currentTableData?.totalPrice}</h2>
        {currentTableData.status !== 0 ? <></> : <Button variant="outlined" color="success" onClick={handleClickOpen}>
          Sifariş əlavə et
        </Button>}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">(S/S)</TableCell>
              <TableCell align="center">Adı</TableCell>
              <TableCell align="center">Miqdarı</TableCell>
              <TableCell align="center">Məbləğ</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Sifariş saatı</TableCell>
              <TableCell align="center">Gözləmə müddəti</TableCell>
              <TableCell align="center">Ətraflı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {
              currentTableData?.orders?.map((index,key) => (
                <TableRow key={key}>
                  <TableCell align="center">{key + 1}</TableCell>
                  <TableCell align="center">{index?.name}</TableCell>
                  <TableCell align="center">{index?.count}</TableCell>
                  <TableCell align="center">{index?.count * index?.price}AZN</TableCell>
                  <TableCell align="center">{index.status == 0 ? "Gözləmədə" : index.status == 1 ? "Verildi" : "Ləğv edildi"}</TableCell>
                  <TableCell align="center">{index?.date.slice(0, 16).replace("T", " ")}</TableCell>
                  <TableCell align="center">{index.expireDate ? index.expireDate + "dəqiqə" : 0 + " " + "dəqiqə"}</TableCell>
                  
                  
                  <TableCell align="center">
                    {!index.status ? <>
                      <Button onClick={() => verifyOrder(index)} variant="contained" color="success">Verildi</Button>
                      {" "}
                      <Button onClick={() => deleteOrder(index)} variant="outlined" color="error">Ləğv et</Button>
                    </> : <></>}  
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        {currentTableData.status !== 0 ? <></> : <div className={style.endOrders}>

          <Button variant="outlined" color="error" onClick={() => handleOpen()}>
            Sonlandır
          </Button>
        </div>}
        
      </TableContainer>
      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Əminsinizmi?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2,
            display:"flex",
            justifyContent:"flex-end"
            }}>
          
         
            <Button onClick={handleCloseModal} variant="outlined" color="error"  >
              Xeyr
            </Button>
            <Button onClick={tableExpireTime} variant="contained" color="success" sx={{ marginLeft: "10px" }}>
              Bəli
            </Button>
          </Typography>
        </Box>
      </Modal>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>{"Sifariş məlumatlarını doldurun"}</DialogTitle>
        <DialogContent >
          <form style={{
            padding: "15px 0px"
          }} onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={4}>
              <Grid item xs={12} >
                <Controller
                  name="food"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Food"
                      id="outlined-select-currency"
                      select
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    >
                      {restaurantData.foods?.map((option) => (
                        <MenuItem key={option.id} value={option.name} onClick={() => addOrder(option)}>
                          {option.name}
                        </MenuItem>
                      ))}
                      
                    </TextField>
                  )}
                />


                <div className={style.counterBox}>
                  <label>Miqdarı</label>
                  <div className={style.counter}>
                    <Button onClick={DecNum} variant="outlined">
                      -
                    </Button>
                    <h4>{count}</h4>
                    <Button onClick={IncNum} variant="outlined">
                      +
                    </Button>
                  </div>
                </div>
                <div className={style.priceInfo}>
                  <h4>Qiyməti</h4>
                  <span>{count * productPrice}AZN</span>
                </div>
                
              </Grid>
              
          
            </Grid>

            <DialogActions sx={{
              marginTop: "30px"
            }}>
              <Button onClick={handleClose}>Bağla</Button>
              <Button type='submit'>Əlavə et</Button>
            </DialogActions>

          </form>
        </DialogContent>

      </Dialog>
    </div>
  )
}

export default AddProduct