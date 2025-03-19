import { z } from 'zod'
import { createSqlTag } from 'slonik'
import Redis from 'ioredis'
import { createPool } from 'slonik'
import { createFieldNameTransformationInterceptor } from 'slonik-interceptor-field-name-transformation'

if (!process.env.REDIS_URL) {
	throw Error('REDIS_URL env not set')
}
export const redisClient = new Redis(process.env.REDIS_URL, {
	maxRetriesPerRequest: null,
})

const interceptors = [
	createFieldNameTransformationInterceptor({
		format: 'CAMEL_CASE',
	}),
]

const db = createPool(process.env.DB_URL!, {
	interceptors,
	// Only use SSL in production
	...(process.env.NODE_ENV === 'production'
		? {
				ssl: {
					rejectUnauthorized: false,
					require: false,
				},
		  }
		: {}),
})

export const sql = createSqlTag({
	typeAliases: {
		id: z.object({
			id: z.number(),
		}),
		void: z.object({}).strict(),
	},
})

export default db
