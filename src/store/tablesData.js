import { createSlice,current } from "@reduxjs/toolkit";

export const tablesData = createSlice({
  name: "restaurantData",
  initialState: {
    tableStatus:[],
    dailyOrderCount: 0,
    dailyEarnMoney: 0,
    dailySuccesOrder:0,
    dailyCancellationOrder:0
  },
  reducers: {
    addTableData: (state,action) => {
      
      let allTables = current(state.tableStatus)
  
      let sortFilter = []
      
      for (let i = 0; i < allTables.length; i++) {
        if (allTables[i].status == 0){
          sortFilter.shift(allTables[i])
        } else {
          sortFilter.push(allTables[i])
        }
      }

      console.log(sortFilter)


      

      state.tableStatus = [...state.tableStatus,action.payload]

      
    },
    addTableFood:  (state,action) => {
      
      let tables = current(state)
      
      
      let currentTable = tables.tableStatus.find(index => index.id == action.payload.tableId)

      let anotherTables = tables.tableStatus.filter(index => index.id !== action.payload.tableId)

      delete action.payload.tableId
      

      let addTableData = {
        ...currentTable,
        orders: [...currentTable.orders,action.payload]
      }
      
      

      let result = [...anotherTables, addTableData]

   

      state.tableStatus = result

    },
    changeOrderStatus: (state,action) => {

      let tables = current(state)

      let currentTable = tables.tableStatus.find(index => index.id == action.payload.tableId)
      let currentOrder = currentTable.orders.find(index => index.id == action.payload.orderId)


      console.log(currentTable)
      console.log(currentOrder)

      let anotherTables = tables.tableStatus.filter(index => index.id !== action.payload.tableId)

      
      let expireDate = Math.floor((new Date() - new Date(currentOrder.date)) / 1000 / 60)



      let currentOrderData = { ...currentOrder, status: 1, expireDate: expireDate }

      let currentTableAllOrders = currentTable.orders.filter(index => index.id !== action.payload.orderId)
      
     
      

      let addTableData = {
        ...currentTable,
        totalPrice: currentTable.totalPrice + currentOrderData.price * currentOrderData.count,
        orders: [...currentTableAllOrders, currentOrderData]
      }



      let result = [...anotherTables, addTableData]

      state.tableStatus = result
    },
    deleteOrderStatus:(state,action) => {
      let tables = current(state)

      let currentTable = tables.tableStatus.find(index => index.id == action.payload.tableId)
      let currentOrder = currentTable.orders.find(index => index.id == action.payload.orderId)

      let anotherTables = tables.tableStatus.filter(index => index.id !== action.payload.tableId)


      let currentOrderData = { ...currentOrder, status: 2 }

      let currentTableAllOrders = currentTable.orders.filter(index => index.id !== action.payload.orderId)


      let addTableData = {
        ...currentTable,
        orders: [...currentTableAllOrders, currentOrderData]
      }

      let result = [...anotherTables, addTableData]

      state.tableStatus = result

    },
    earnMoney: (state,action) => {
      state.dailyEarnMoney += action.payload
      state.dailySuccesOrder += 1
      state.dailyOrderCount += 1
    },
    cancelOrder: (state, action) => {
      state.dailyCancellationOrder += action.payload
      state.dailyOrderCount += 1
    },
    changeTableStatus: (state,action) => {
      let tables = current(state)

      let currentTable = tables.tableStatus.find(index => index.id == action.payload)

      let anotherTables = tables.tableStatus.filter(index => index.id !== action.payload)




      let addTableData = {
        ...currentTable,
        expireDate: new Date().toJSON(),
        status: 1,
      }


      console.log(addTableData)

      let result = [...anotherTables, addTableData]



      state.tableStatus = result

    },
    removeTableStatus: (state,action) => {
      let tables = current(state)

      let currentTable = tables.tableStatus.find(index => index.id == action.payload)

      let anotherTables = tables.tableStatus.filter(index => index.id !== action.payload)




      let addTableData = {
        ...currentTable,
        expireDate: new Date().toJSON(),
        status: 3,
      }


      console.log(addTableData)

      let result = [...anotherTables, addTableData]



      state.tableStatus = result
    }
  },
});

export const { addTableData, removeTableStatus, addTableFood, changeOrderStatus, deleteOrderStatus, earnMoney, cancelOrder, changeTableStatus } = tablesData.actions;

export default tablesData.reducer;
