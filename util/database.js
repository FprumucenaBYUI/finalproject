const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://byuiUser:mg1UJztAC1ZNxZg5@cluster0.9q9ak.mongodb.net/CS341Store?retryWrites=true&w=majority";

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

const mongoConnect = callback => {
    MongoClient.connect(
            MONGODB_URL,
            options
        )
        .then(client => {
            console.info("MongoDB Connected!");
            _db = client.db();
            callback(client);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};


exports.mongoConnect = mongoConnect;
exports.getDb = getDb;