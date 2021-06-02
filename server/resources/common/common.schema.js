import { Schema } from 'mongoose'

export const event = new Schema({
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  },
  z: {
    type: Number,
    required: true
  },
  tick: {
    type: Number,
    required: true
  }
})
