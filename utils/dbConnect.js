const{ MongoClient } = require('mongodb') ;

const connectToDatabase = async() => {
	const client = await MongoClient.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}

module.exports = connectToDatabase