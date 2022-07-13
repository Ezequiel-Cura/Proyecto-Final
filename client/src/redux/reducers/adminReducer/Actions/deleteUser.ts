import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const deleteUser: any = createAsyncThunk("admin/deleteUser",
async (id) => {
    await axios.delete(`/admin/deleteUser/?id=${id}`)
})

export default deleteUser;