import { connect, Connection } from "mongoose";

/**
 * @param {String} mongoConnectionString
 */
export async function MongoConnect(mongoConnectionString) {
    const mongoose = await connect(mongoConnectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
    console.log(`Conexión mongodb ON`);
    return mongoose.connection;
}

/**
 *
 * @param {Connection} connection
 * @param {Function=} err
 */
export async function MongoCloseConnection(connection, err) {
    if (err == null) err = (err) => console.log(`Conexión mongo cerrada`);
    if (connection && connection.readyState === 1) {
        await connection.close(err);
    }
}
