import { Schema, model } from 'mongoose'
import { event } from '../common/common.schema'

const types = ['HE', 'FB', 'SM', 'MO', 'DC']

const flashedSchema = new Schema({
  victimID: {
    // SteamID of the player flashed
    type: String,
    required: true
  },
  duration: {
    // Duration of the flash in ms
    type: Number,
    default: 0
  },
  died: {
    // Died as a result of the flash
    type: Boolean,
    default: false
  }
})

const grenadeSchema = new Schema({
  entID: {
    type: String,
    required: [true, 'entityID is required']
  },
  userID: {
    // steamid of the thrower
    type: String,
    required: [true, 'userID is required']
  },
  type: {
    type: String,
    enum: {
      values: types,
      message: '{VALUE} is not supported'
    },
    required: [true, 'grenade type is required']
  },
  damage: {
    type: Number,
    default: 0,
    required: [true, 'grenade damage is required']
  },
  thrown_at: event,
  thrown_to: event,
  // Flash-related properties
  flashed: {
    type: [flashedSchema],
    default: function () {
      if (this.type === types[1]) return []
      else return undefined
    }
  },
  // Smoke-related properties
  dissipated: {
    type: event,
    default: function () {
      if (this.type !== types[2]) return undefined
    }
  },
  // Molly-related properties
  inferno_stop: {
    type: event,
    default: function () {
      if (this.type !== types[3]) return undefined
    }
  }
})

export const Grenade = model('Grenade', grenadeSchema)
