const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

// beforeEach() is default function provided by jest
beforeEach(setupDatabase) // always start with empty user data

afterEach(() => {
    console.log('after each')
})

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Paul',
            email: 'paul@test.ll',
            password: '12345678'
        })
        .expect(201)

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    // expect(response.body.user.name).toBe('Paul')
    expect(response.body).toMatchObject({
        user: {
            name: 'Paul',
            email: 'paul@test.ll',
        },
        token: user.tokens[0].token
    })

    expect(user.password).not.toBe('12345678')
})

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)

    // fetch logged in user form database
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login with nonexistent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'suusu@kd.com',
            password: 'typoOOOO'
        })
        .expect(400)
})

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    response = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    // assert if user removed form db
    const user = await User.findById(response.body._id)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    // check if uploaded avatar is a buffer
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    const newUserName = 'Huk'
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: newUserName,
        })
        .expect(200)

    const user = await User.findById(response.body._id)
    expect(user.name).toBe(newUserName)
})

test('Should not update invalid user fields', async () => {
    const response = await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            dummyField: 'ratata',
        })
        .expect(400)
})