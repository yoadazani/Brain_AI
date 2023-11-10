import { createClient } from 'redis';

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

client.on('error', (err) => {
    console.log('Redis Client Error', err);
})

if (!client.isOpen) {
    client.connect().then(() => {
        console.log('Redis Client Connected');
    });
}

export { client };