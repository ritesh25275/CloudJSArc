import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({ region: process.env.AWS_REGION });

export const uploadFile = async (fileContent, bucketName, key) => {
	try {
		const params = {
			Bucket: bucketName,
			Key: key,
			Body: fileContent,
		};
		const command = new PutObjectCommand(params);
		const response = await s3Client.send(command);
		console.log("File uploaded successfully:", response);
		return response;
	} catch (error) {
		console.error("Error uploading file:", error);
		throw error;
	}
};
