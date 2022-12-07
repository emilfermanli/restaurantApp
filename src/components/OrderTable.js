import React,{useState} from 'react'
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
import { useForm,Controller } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';
import { addTableData } from "../store/tablesData"
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





function OrderTable() {

  const restaurantData = useSelector(state => state.restaurantData)
  const { tableStatus } = useSelector(state => state.tablesData)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);





  const formSchema = Yup.object().shape({
    waiter: Yup.string().trim().required("* This field is required."),
    table: Yup.string().trim().required("* This field is required."),
  });

  const { control, reset, handleSubmit,  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const onSubmit = async data => { 
    
    dispatch(addTableData({ 
      ...data, 
      id: uid(24),
      status:0,
      orders:[],
      totalPrice:0
    }))

    reset()
    handleClose()
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



 
  
  return (
    <div className={style.orderTable}>
      <div className={style.orderPageHeader}>
        <h2>Masalar</h2>
        <Button variant="outlined" color="success" onClick={handleClickOpen}>
          Muştəri əlavə et
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">(S/S)</TableCell>
              <TableCell align="center">Masa</TableCell>
              <TableCell align="center">Xidmətçi</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Məbləğ</TableCell>
              <TableCell align="center">Sonlanma Tarixi</TableCell>
              <TableCell align="center">Ətraflı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            
            
            
              {tableStatus.map((index,key) => (
                 <TableRow key={index.id}>
                    <TableCell  align="center">{key + 1}</TableCell>
                    <TableCell  align="center">{index.table}</TableCell>
                    <TableCell  align="center">{index.waiter}</TableCell>
                  <TableCell align="center">{index.status == 0 ? "Sonlanmayan" : index.status == 1 ? "Sonlanan" : "Ləğv edilən"}</TableCell>
                    <TableCell  align="center">{index.totalPrice}AZN</TableCell>
                    <TableCell align="center">{index?.expireDate?.slice(0,16)?.replace("T"," ")}</TableCell>
                    <TableCell  align="center">
                      <Link to={`/home/${index.id}`}>
                      Bax
                      </Link>
                    </TableCell>
                </TableRow>
              ))}
            
            
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"md"}
        className={style.addProductDialog}
        
      >
        <DialogTitle>{"Sifariş məlumatlarını doldurun?"}</DialogTitle>
        <DialogContent >
          <form style={{
            padding:"15px 0px"
          }} onSubmit={handleSubmit(onSubmit)} className={style.addOrderForm}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="table"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      // labelId="table"

                      label="Table"
                      // variant="filled"
                      id="outlined-select-currency"
                      select
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    >
                      
                      {restaurantData.tables?.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                
                 
                
               
              </Grid>
              <Grid  item xs={12} sm={12} md={6}>

               
                <Controller
                  name="waiter"
                  control={control}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      label="Waiters"
                      // variant="filled"
                      id="outlined-select-currency"
                      select
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      fullWidth
                    >
                      {restaurantData.waiters?.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                

                
              </Grid>
            </Grid>

            <DialogActions sx={{
              marginTop:"30px"
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

export default OrderTable