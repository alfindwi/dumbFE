import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import { RegisterSchema } from "../../validations/registerSchema";


export const loginAsync = createAsyncThunk<
   string,
   { username: string; password: string }
>("auth/login", async (data, thunkAPI) => {
   try {
      const res = await api.post("/auth/login", data);
      console.log(res.data);
      localStorage.setItem("token", res.data.token);
      return res.data.token;
   } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue((error as Error).message);
   }
});

export const registerAsync = createAsyncThunk<void, RegisterSchema>(
    "auth/register",
    async (data, thunkAPI) => {
       try {
          const res = await api.post("/auth/register", data);
          console.log(res.data);
 
       } catch (error) {
          console.log(error);
          if (error instanceof Error) {
             return thunkAPI.rejectWithValue(error.message);
          }
       }
    }
 );