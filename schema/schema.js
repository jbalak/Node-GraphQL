const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

const _ = require('lodash')
let books = [
	{ name: 'Wings Of Fire', genre: 'Biography', id: 1, authorID: '1' },
	{ name: 'Truth Love and little Malice', genre: 'Biography', id: 2, authorID: '2' },
	{ name: 'A train To pakistan7', genre: 'Biography', id: 2, authorID: '2' },
	{ name: 'The Monk who sold his ferrari', genre: 'Biography', id: 3, authorID: '3' },
	{ name: 'Who will cry when you die', genre: 'Biography', id: 4, authorID: '3' },
	{ name: 'The 5 Am Club', genre: 'Biography', id: 5, authorID: '3' }
]

let authors = [
	{ name: 'A P J Abdul Kalam', age: 42, id: '1' },
	{ name: 'Khushwanth Singh', age: 58, id: '2' },
	{ name: 'Robin Sharma', age: 64, id: '3' }
]

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return _.find(authors, { id: parent.authorID })
			}
		}
	})
})

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(books, { authorID: parent.id })
			}
		}
	})
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				//code to get data from db or other source
				return _.find(books, { id: args.id })
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id })
			}
		},
		books: {
			type: new GraphQLList(BookType),

			resolve(parent, args) {
				return books
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),

			resolve(parent, args) {
				return authors
			}
		}
	}
})

module.exports = new GraphQLSchema({
	query: RootQuery
})
