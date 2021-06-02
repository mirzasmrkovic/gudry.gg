import { Schema, model, Model } from 'mongoose'
import { event } from '../common/common.schema'

const grenadeTypes = ['FB', 'HE', 'SM', 'MO', 'DC']

const flashedSchema = new Schema({
  victimID: {
    // SteamID of the player flashed
    type: String,
    required: true
  },
  duration: {
    // Duration of the flash
    type: Number,
    required: true
  }
})

const grenadeSchema = new Schema({
  ownerID: {
    // steamid of the thrower
    type: String,
    required: true
  },
  thrown: {
    type: event,
    required: true
  },
  exploded: {
    type: event
  },
  type: {
    type: String,
    enum: grenadeTypes,
    required: true
  },
  // Flash-related properties
  flashed: {
    type: [flashedSchema],
    default: function () {
      if (this.type === 'FB') return {}
    }
  }
})

const isFlashbang = () => {
  if (this.type === 'FB') return true
  return false
}

export const Grenade = model('Grenade', grenadeSchema)
