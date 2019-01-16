const supertest = require('supertest')
const server = require('../server/server')
const knex = require('../database/dbConfig')
const uuid = require('uuid/v4')
const { generateTeamData } = require('../database/utils/generateData')

const request = supertest(server)

describe('test get user id route /:id', () => {
  it('should return 404 if no users found', async () => {
    const badId = uuid()

    // verify id is not in database
    const verifyBadID = await knex('availabilities')
      .where('id', badId)
      .first()

    expect(verifyBadID).toBeUndefined()

    const response = await request
      .get(`/availabilities/${badId}`)
      .set('authorization', 'token')

    expect(response.type).toEqual('application/json')
    expect(response.status).toEqual(404)
  })

  it('gets availability based on id', async () => {
    // populates database with team data
    const { team, cleanup } = await generateTeamData(knex)
    const target = team.users[1]
    const avails = team.availabilities.filter(
      item => item.user_id === target.id
    )
    const response = await request
      .get(`/availabilities/${target.id}`)
      .set('authorization', 'token')

    expect(response.status).toBe(200)
    expect(response.body).toEqual(avails)
    // cleans up unneeded team data after tests
    await cleanup()
  })
})
