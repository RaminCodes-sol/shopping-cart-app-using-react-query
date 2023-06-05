import { configureStore } from "@reduxjs/toolkit"
import shoppingRuducer from './shoppingSlice'


const store = configureStore({
    reducer :{
        shopping: shoppingRuducer
    }
})

export default store