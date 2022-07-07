'use strict'

import { Schema, model } from "mongoose"
import jwt from "jsonwebtoken"

export interface IUser {
  firstName: string
  lastName?: string
  email: string
  password: string
  isGoogle: boolean
  verified: boolean
  verifyToken: string
  isEmailSubscripted: Boolean
  review?: string
  avatar: string
  premium: boolean
  role: string

  savings: any
  fees: Array<object>
  monthly: any
  extra: any

  categories: any,
  generateAuthToken: () => any
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  isGoogle: { type: Boolean, default: false },
  verified: { type: Boolean, default: false},
  verifyToken: { type: String },
  isEmailSubscripted: { type: Boolean, default: true},
  review: { type: String },
  avatar: String,
  premium: { type: Boolean, default: false },
  role: { type: String, default: 'user' },

  savings:[{
    name: { type: String, required: true },
    start: { type: Date, default: Date.now()},
    end: Date,
    goal: Number,
    currentAmount: Number,
    depositPlace: String,
    currency: { type: String, default: "Peso Argentino" },
  }],

  fees: [{
    start: Date,
    end: Date,
    name: String,
    category: String,
    amount: Number,
  }],

  monthly: {
    input: [{
      date: {type: String, required: true},
      end: Date,
      description: String,
      category: String,
      amount: Number,
    }],

    output: [{
      date: {type: String, required: true},
      end: Date,
      description: String,
      category: String,
      amount: Number,
    }]
  },

  extra: {
    input: [{
      date: String, 
      entries: [{
        date: { type:Date, default: Date.now() },
        description: String,
        category: String,
        amount: Number,
      }]
    }],

    output: [{
      date: String,
      entries: [{
        date: { type:Date, default: Date.now() },
        description: String,
        category: String,
        amount: Number,
      }]
    }],
  },

  categories: [{
    name: String,
    frequency: {
      type: String,
      enum:['monthly', 'extra'], 
      required: true},
    type: {
      type: String,
      enum: ['input', 'output'],
      required: true},
  }]
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" })
  return token
};

export default model<IUser>('user', userSchema);

