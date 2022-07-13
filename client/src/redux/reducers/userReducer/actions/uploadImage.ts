import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uploadImage: any = createAsyncThunk("user/uploadImage",
  async (info: any) => {
    let formData = new FormData();
    formData.append("file", info.img)
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET as string | Blob)
    const result = await axios.post("https://api.cloudinary.com/v1_1/finanzas-personales/image/upload",
      formData, { withCredentials: false });
    const { data } = await axios.put("/user/update", { id: info.id, key: "avatar", value: result.data.url });
    return data
  })

export default uploadImage