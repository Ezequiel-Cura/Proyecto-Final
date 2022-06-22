'use strict'

import { Schema, model } from "mongoose"

interface ICategory{
    name: string,
}

const CategorySchema = new Schema<ICategory>({
    name: {type: String, required: true}
})


export default model<ICategory>('Category', CategorySchema);