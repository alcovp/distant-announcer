import {config} from "dotenv"
config({path: __dirname + '/./../.env'})

import {bot, launchBot, SUPER_USER_ID} from "./bot"
import express from 'express'
import {pushToQueue, startQueue} from "./queue";

const app = express()
const port = process.env.PORT || 3000

launchBot()
startQueue(messages => {
    if (SUPER_USER_ID) {
        bot.telegram.sendMessage(SUPER_USER_ID, messages.join('\n'))
            .catch(console.error)
    }
})

app.use(express.json())

app.post('/announce', (req, res) => {
    console.log('received message: ' + req.body.message)
    pushToQueue(req.body.message)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
})
