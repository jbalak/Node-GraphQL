const express = require('express')
const graphHTTP = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
app.use(
	'/graphql',
	graphHTTP({
		schema,
		graphiql: true
	})
)

app.listen(9000, console.log('connected at 9000'))
