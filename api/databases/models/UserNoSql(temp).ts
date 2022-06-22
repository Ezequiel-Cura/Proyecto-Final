
'use strict'
import { Schema, model } from "mongoose"

interface IUser{
    _id?: string,
    userName: string,
    lastName?: string,
    email: string,
    password: string,
    avatar?: string,
    Account?: any
}

const UserSQLessSchema = new Schema<IUser>({
  userName: {type: String, required: true},
  lastName: String,
  
  email: {type: String, unique: true, lowercase: true, required: true},
  avatar: String,

  Account: {
    monthlyInput:[{ // Array de ingresos mensuales, aplicado todos los meses
      name: String,
      category: String,
      amount: Number
    }],
    extraInput:[{ // Ingresos adicionales, aplicados a demanda del usuario
      name: String,
      category: String,
      amount: Number
    }],

    monthlyExpenses: [{ // Gastos mensuales; incluyen cuotas, servicios, etc; descontados de los ingresos totales cada mes
      name: String,
      amount: Number,
      createdAt: Date,
      end: String
    }],
    variableExpenses:[{ // Gastos adicionales, se aplican a demanda del usuario
      date: String, // Un array con el registro de todos los gastos del mes, se pushea uno nuevo cada mes
      entries:[ 
        {
          id: Schema.Types.ObjectId,
          name: String,
          category: String,
          amount: Number
        }
      ]
    }]

  }
})

export default model<IUser>('UserNoSql-temp', UserSQLessSchema);

