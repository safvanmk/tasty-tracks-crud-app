import { configureStore } from "@reduxjs/toolkit";
import  reciepDetail  from "./slices/reciepDetailSlice";






const store = configureStore({
  reducer: {
    app: reciepDetail
  }
})

export default store;