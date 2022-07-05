'use strict'

import { Schema, model } from "mongoose"
import jwt from "jsonwebtoken"

interface savingProps{
  name: string,
  start: string,
  end?: string,
  goal: number
}
interface IUser {
  _id?: string,
  userName: string,
  lastName?: string,
  email: string,
  password: string,
  avatar?: string,
  Account?: any,
  Saving: savingProps[],
  CategoriesExpenses: string[],
  CategoriesInputs: string[],
  premium: boolean,
  generateAuthToken: () => any
}

const userSchema = new Schema<IUser>({
  userName: { type: String, required: true },
  lastName: String,
  email: { type: String, unique: true, lowercase: true, required: true },
  password: {type: String, required: true},
  avatar: String,
  premium: {type: Boolean, default: false},
  Saving: [{
    name: { type: String, required: true },
    start: { type: Date, required: true, default: Date.now()},
    end: Date,
    goal: Number,
    place: String
  }],
  CategoriesExpenses: { type: [String], default: ["Alimentos", "Transporte", "Gimnasio", "Salud", "Viaje", "Ocio", "Alquiler", "Combustible", "Deuda", "Impuestos", "Otros" ]},
  CategoriesInputs: { type: [String], default: ["Herencia", "Salario", "Regalo", "Aguinaldo", "Changa", "Préstamo", "Otros"]},
  Account: {
    // La cuenta de cada User tiene 4 props: 
    // 1- Es un arreglo de obj/ingresos mensuales.
    // 2- Es un arreglo de obj/ingresos extras.
    // 3- Es un arreglo de obj/gastos mensuales.
    // 4- Es un arreglo de obj/gastos variados.
    // All obj tiene una fecha(la actual si la ingresan sin especificar)
    // una descripcion y un monto específico
    // y una relacion con el modelo de categorias a través de su Id.

    // INGRESOS

    monthlyInput: [{
      // Array de ingresos mensuales, aplicado todos los meses  
      date: { type: Date, default: Date.now(), required: true },
      end: Number,
      description: {type: String, required:true},
      amount: {type: Number, required: true},
      category: String,

      source: {type: String, default: 'monthlyInput' }
    }],
    
    extraInput: [{
      // Ingresos adicionales, aplicados a demanda del usuario
      date: { type: Date, default: Date.now()},
      description: {type: String, required:true},
      amount: {type: Number, required: true},
      category: String,
      source: {type: String, default: 'extraInput' }
    }],
    
    // GASTOS
    
    monthlyExpenses: [{
      // Gastos mensuales; incluyen cuotas, servicios, etc; descontados de los ingresos totales cada mes
      date: { type: Date, default: Date.now(), required: true },
      end: Number,
      description: {type: String, required:true},
      amount: {type: Number, required: true},
      category: String,
      source: {type: String, default: 'monthlyExpenses' }
    }],
    
    variableExpenses: [{
      // Gastos adicionales, se aplican a demanda del usuario 
      // es un array de obj con el registro de todos los gastos del mes, se pushea uno nuevo cada mes
      // cada obj tiene la fecha en la que se realizó, su id, su descripcion, category y amount 

      date: { type: Date, default: Date.now() },
      // id: {type: Schema.Types.ObjectId, default: new ObjectId()},
      category: String,
      description: {type: String, required: true},
      amount: {type:Number, required: true},
      source: {type: String, default: 'variableExpenses' }
    }]
  }
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn:"7d"})
  return token
};

export default model<IUser>('user', userSchema);

