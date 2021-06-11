import { Schema } from 'mongoose'

export const event = new Schema({
  x: {
    type: Number,
    required: [true, 'all coordinates are required']
  },
  y: {
    type: Number,
    required: [true, 'all coordinates are required']
  },
  z: {
    type: Number,
    required: [true, 'all coordinates are required']
  },
  tick: {
    type: Number,
    required: [true, 'tick is required']
  }
})

export const hitgroups = [
  'HITGROUP_GENERIC',
  'HITGROUP_HEAD',
  'HITGROUP_CHEST',
  'HITGROUP_STOMACH',
  'HITGROUP_LEFTARM',
  'HITGROUP_RIGHTARM',
  'HITGROUP_LEFTLEG',
  'HITGROUP_RIGHTLEG'
]

const life = new Schema({
  hp: {
    // Health pierced
    type: Number,
    required: true
  },
  ap: {
    // Armour pierced
    type: Number,
    required: true
  }
})

export const dmg = new Schema({
  userID: {
    type: String,
    required: [true, 'userID is required']
  },
  attackerID: {
    type: String,
    required: [true, 'attackerID is required']
  },
  dmg: {
    type: life,
    required: [true, 'dmg to player is required']
  },
  life_left: {
    type: life,
    required: [true, 'hp/ap left after shooting is required']
  },
  attacker_pos: {
    type: event,
    required: [true, 'attacker position is required']
  },
  hit_group: {
    type: String,
    required: [true, 'hitgroup is required'],
    enum: {
      values: hitgroups,
      message: '{VALUE} is not supported'
    }
  }
})
