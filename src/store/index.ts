import {useDispatch, useSelector} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import userReducer from "./user/slice";
import produtReducer from "./product/slice";
import categoryReducer from "./category/slice";
import cartReducer from "./cart/slice";
import orderReducer from "./order/slice";
import transactionOrder from "./transaction/slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        product: produtReducer,
        category: categoryReducer,
        cart: cartReducer,
        order: orderReducer,
        transaction: transactionOrder
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store