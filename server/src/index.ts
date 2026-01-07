import { Hono } from 'hono'

import {usersRoute} from './routes/users-route'

const app = new Hono()

app.get('/', (c) => {return c.text('Hello Hono!')
})

app.route('/users', usersRoute)

export default {
  port: 3000,
  fetch: app.fetch,
}