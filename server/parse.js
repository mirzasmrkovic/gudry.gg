import * as fs from 'fs'
import fsPromise from 'fs/promises'
import { DemoFile } from 'demofile'

// export const parse = buffer => {
//   const demofile = new DemoFile()
//   demofile.on('start', () => {
//     const header = demofile.header
//     console.log('Demo header:', header)

//     const tickRate = demofile.tickRate
//     console.log(tickRate)
//   })
// }

// const parseGrenade = (buffer, demo, grenade) => {
//   const getGrenadeType = modelName => {
//     import { types as grenadeTypes } from './server/resources/grenade/grenade.model.js'
//     const model = modelName.split('models/Weapons/w_eq_')[1]
//     grenadeTypes.forEach(element => {
//       if (model.startsWith(element)) {
//         return element
//       }
//     })
//   }

//   const entID = grenade.entity.index
//   const start_pos = grenade.entity.position
//   const start_pos_tick = demo.currentTick
//   const type = getGrenadeType(grenade.entity.modelName)
// }

// demofile.on('start', () => {
//   const header = demofile.header
//   console.log('Demo header: ', header)
// })
const parse = async filename => {
  const demofile = new DemoFile()
  // const dump = fs.createWriteStream('./promisedump.txt')
  // const file = await fsPromises.open(filename)
  const file = fs.createReadStream(filename)
  const { size } = await fsPromise.stat(filename)
  console.log('size ' + size)
  // demofile.gameEvents.on('round_start', e => {
  //   console.log(e)
  // })

  demofile.on('start', ({ cancel }) => {
    const header = demofile.header
    console.log('Demo header: ', header)

    const tickRate = demofile.tickRate
    console.log('ricktate: ' + tickRate)
  })

  // demofile.gameEvents.on('player_connect', e => {
  //   console.log(
  //     `${e.name} (${e.userid}) connected with steamid: ${e.networkid}`
  //   )
  //   // cancel()
  // })

  demofile.parseStream(file)
  console.log('parsed')

  // for await (const chunk of file) {
  //   // console.log(chunk.toString('hex').match(/../g).join(' '))
  //   console.log(chunk)
  //   demofile.parseStream(chunk.buffer, size)
  // }

  // for (let i = 0; ; i++) {
  //   const jah = await file.read({
  //     buffer: Buffer.alloc(i ? 302682 : 1072)
  //   })
  //   console.log(jah)
  //   demofile.parseStream(jah.buffer)
  //   if (!jah.bytesRead) break
  // }
}
parse('uploads/match730_003447185702897320270_0941148171_193.dem')

const parselegal = filename => {
  const demofile = new DemoFile()
  fs.readFile(filename, (err, buff) => {
    demofile.gameEvents.on('smokegrenade_detonate', e => {
      console.log('smokegrenade_detonate')
      console.log({ e })
    })
    // demofile.on('start', () => {
    //   const header = demofile.header
    //   console.log('Demo header:', header)

    //   const tickRate = demofile.tickRate
    //   console.log(tickRate)
    // })

    demofile.parse(buff)
  })
}
// parselegal('uploads/match730_003447185702897320270_0941148171_193.dem')
// parselegal('uploads/match730_003464263392661864611_1235626822_132.dem')

// fs.readFile(
//   'uploads/match730_003447185702897320270_0941148171_193.dem',
//   (err, buff) => {
//     const demofile = new DemoFile()
//     console.log(buff)
//     demofile.parse(buff)
//   }
// )
// fs.readFile(
//   'uploads/match730_003447185702897320270_0941148171_193.dem',
//   (err, buffer) => {
//     const demofile = new DemoFile()
//     const dumpfile = fs.createWriteStream('./grenadedump.txt')
//     demofile.on('start', () => {
//       const header = demofile.header
//       console.log('Demo header:', header)

//       const tickRate = demofile.tickRate
//       console.log(tickRate)
//     })

//     demofile.entities.on('postcreate', e => {
//       if ('DT_BaseCSGrenadeProjectile' in e.entity.props) {
//         parseGrenade(buffer, demofile)
//       }
//       // if (!('DT_BaseCSGrenadeProjectile' in e.entity.props)) return
//       // console.log(
//       //   '------------------------------------------------------------------------------------------------'
//       // )
//       // console.log('grenade_thrown')
//       // console.log(e.entity.modelName)
//       // console.log({ e })
//       // console.log(e.entity.props)
//       // console.log(
//       //   '------------------------------------------------------------------------------------------------'
//       // )
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('grenade_thrown\n')
//       //   dumpfile.write(e.entity.modelName + '\n')
//       //   dumpfile.write(JSON.stringify(e.entity.props) + '\n')
//       //   dumpfile.write(JSON.stringify(e.entity.position) + '\n')
//       //   dumpfile.write(JSON.stringify(e.entity.index) + '\n')
//       //   dumpfile.write('classid: ' + JSON.stringify(e.entity.classId) + '\n')
//       //   dumpfile.write('tick: ' + demofile.currentTick + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )

//       //   // const projectileEntity = e.entity
//       //   // const thrower = projectileEntity.owner

//       //   // console.log(
//       //   //   '%s threw %s at:',
//       //   //   thrower ? thrower.name : '(someone)',
//       //   //   projectileEntity.modelName,
//       //   //   projectileEntity.position
//       //   // )
//       // })
//       // // Smoke events
//       // demofile.gameEvents.on('smokegrenade_detonate', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('smokegrenade_detonate')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // demofile.gameEvents.on('smokegrenade_expired', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('smokegrenade_expired')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // // Flash events
//       // demofile.gameEvents.on('flashbang_detonate', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('flashbang_detonate')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // demofile.gameEvents.on('player_blind', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('player_blind')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // // Molly events
//       // // demofile.gameEvents.on('molotov_detonate', e => {
//       // //   // Never fires
//       // //   dumpfile.write(
//       // //     '------------------------------------------------------------------------------------------------\n'
//       // //   )
//       // //   dumpfile.write('molotov_detonate')
//       // //   dumpfile.write(JSON.stringify(e) + '\n')
//       // //   dumpfile.write(
//       // //     '------------------------------------------------------------------------------------------------\n'
//       // //   )
//       // // })
//       // demofile.gameEvents.on('inferno_startburn', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('inferno_startburn')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // demofile.gameEvents.on('inferno_expire', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('inferno_expire')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // demofile.gameEvents.on('inferno_extinguish', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('inferno_extinguish')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // // HE events
//       // demofile.gameEvents.on('hegrenade_detonate', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('hegrenade_detonate')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })

//       // // Decoy events
//       // demofile.gameEvents.on('decoy_detonate', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('decoy_detonate')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // demofile.gameEvents.on('decoy_started', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('decoy_started')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // demofile.gameEvents.on('decoy_firing', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('decoy_firing')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       // })
//       // demofile.gameEvents.on('player_hurt', e => {
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//       //   dumpfile.write('player_hurt')
//       //   dumpfile.write(JSON.stringify(e) + '\n')
//       //   dumpfile.write(
//       //     '------------------------------------------------------------------------------------------------\n'
//       //   )
//     })

//     // const demofile = new DemoFile()
//     // demofile.on('start', () => {
//     //   const header = demofile.header
//     //   console.log('Demo header:', header)

//     //   const tickRate = demofile.tickRate
//     //   console.log(tickRate)
//     // })
//     // const userMessages = demofile.userMessages
//     // userMessages.on('message', j => console.log(j))

//     // console.log({ header })
//     // console.log(demofile.currentTick)
//     // demofile.on('tickstart', tick => dump.write(tick + '\n'))
//     // demofile.on('progress', progress => dump.write(progress + '\n'))
//     // let roundNumber = 0

//     // demofile.gameEvents.on("player_connect", e => {
//     //   console.log(`${e.name} (${e.userid}) connected with steamid: ${e.networkid}`)
//     // })

//     // demofile.gameEvents.on('round_start', e => {
//     //   if (e.timelimit !== 115) {
//     //     dump.write('Warmup starting' + '\n')
//     //     // dump.write({e})
//     //     roundNumber++
//     //     return
//     //   }
//     //   dump.write('\n')
//     //   dump.write(
//     //     '------------------------------------------------------------------------------------------------' +
//     //       '\n'
//     //   )
//     //   dump.write(`Round number ${roundNumber++}. starting` + '\n')
//     //   // dump.write({ e })
//     //   dump.write(
//     //     '------------------------------------------------------------------------------------------------' +
//     //       '\n'
//     //   )
//     // })

//     // demofile.gameEvents.on("round_end", e => {
//     //   dump.write('round_end')
//     //   // dump.write({e})
//     // })

//     // demofile.gameEvents.on('round_officially_ended', e => {
//     //   dump.write('round_officially_ended' + '\n')
//     // })

//     // demofile.gameEvents.on('begin_new_match', e => {
//     //   dump.write('match started!' + '\n')
//     // })

//     // demofile.gameEvents.on('smokegrenade_detonate', e => {
//     //   const smokeOwner = demofile.entities.getByUserId(e.userid)
//     //   const name = smokeOwner ? smokeOwner.name : 'unnamed'
//     //   dump.write(`${name} threw a smoke at ${e.x}, ${e.y}, ${e.z}.` + '\n')
//     // })
//     // demofile.gameEvents.on('smokegrenade_expired', e => {
//     //   const smokeOwner = demofile.entities.getByUserId(e.userid)
//     //   const name = smokeOwner ? smokeOwner.name : 'unnamed'
//     //   dump.write(`${name}'s smoke dissipated at ${e.x}, ${e.y}, ${e.z}.` + '\n')
//     // })

//     // demofile.gameEvents.on('flashbang_detonate', e => {
//     //   const victim = demofile.entities.getByUserId(e.userid)
//     //   const name = victim ? victim.name : 'unnamed'
//     //   dump.write('\n')
//     //   dump.write(`${name}'s flash exploded at coordinates: ` + '\n')
//     //   dump.write(`X: ${e.x}, Y: ${e.y}, Z: ${e.z}` + '\n')
//     //   dump.write(
//     //     '------------------------------------------------------------------------------------------------------------------------------------------------------------------' +
//     //       '\n'
//     //   )
//     // })

//     // demofile.gameEvents.on('player_blind', e => {
//     //   dump.write('player_blind')
//     //   const victim = demofile.entities.getByUserId(e.userid)
//     //   const victimName = victim ? victim.name : 'unnamed'
//     //   const attacker = demofile.entities.getByUserId(e.attacker)
//     //   const attackerName = attacker ? attacker.name : 'unnamed'
//     //   dump.write(
//     //     `${victimName} was flashed by ${attackerName}, for ${e.blind_duration} seconds.` +
//     //       '\n'
//     //   )
//     // })

//     // demofile.gameEvents.on('bomb_beginplant', e => {
//     //   dump.write('bomb_beginplant' + '\n')
//     //   console.log({ e })
//     // })
//     // demofile.gameEvents.on('bomb_abortplant', e => {
//     //   dump.write('bomb_abortplant' + '\n')
//     //   console.log({ e })
//     // })
//     // demofile.gameEvents.on('bomb_planted', e => {
//     //   dump.write('bomb_planted' + '\n')
//     //   console.log({ e })
//     // })
//     // demofile.gameEvents.on('bomb_defused', e => {
//     //   dump.write('bomb_defused' + '\n')
//     //   console.log({ e })
//     // })
//     // demofile.gameEvents.on('bomb_exploded', e => {
//     //   dump.write('bomb_exploded' + '\n')
//     //   console.log({ e })
//     // })

//     // demofile.gameEvents.on('player_death', e => {
//     //   const victim = demofile.entities.getByUserId(e.userid)
//     //   const victimName = victim ? victim.name : 'unnamed'

//     //   // Attacker may have disconnected so be aware.
//     //   // e.g. attacker could have thrown a grenade, disconnected, then that grenade
//     //   // killed another player.
//     //   const attacker = demofile.entities.getByUserId(e.attacker)
//     //   const attackerName = attacker ? attacker.name : 'unnamed'

//     //   const headshotText = e.headshot ? ' HS' : ''

//     //   dump.write(
//     //     `${attackerName} [${e.weapon}${headshotText}] ${victimName}` + '\n'
//     //   )
//     // })

//     demofile.parse(buffer)
//   }
// )
