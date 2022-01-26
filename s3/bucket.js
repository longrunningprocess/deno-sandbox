import { config as env } from 'https://deno.land/x/dotenv/mod.ts' // https://github.com/pietvanzoen/deno-dotenv
import { S3Client, ListObjectsV2Command, PutObjectCommand } from 'https://cdn.skypack.dev/@aws-sdk/client-s3' // https://github.com/aws/aws-sdk-js-v3

const {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = env()
const Bucket = 'deno-s3-poc'

const client = new S3Client({
	region: 'us-east-1',
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
})

export async function list() {
	const cmd = new ListObjectsV2Command({
		Bucket,
	})
	
	return await client.send(cmd)
}

/**
 * @param {FormDataFile} file
 * @param {string} file.originalName - The name of the file as it was uploaded
 * @param {string} file.filename - The fully qualified path to the file (Deno's temp location)
 * 
 * @returns {Promise<PutObjectCommandOutput>}
 * */
export async function store({originalName: Key, filename}) {
	const Body = await Deno.readFile(filename)

	const cmd = new PutObjectCommand({
		Bucket,
		Key,
		Body,
	}
)

	return await client.send(cmd)
}