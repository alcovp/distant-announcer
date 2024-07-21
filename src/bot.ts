import {Telegraf} from "telegraf";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
export const SUPER_USER_ID = process.env.SUPER_USER_TELEGRAM_CHAT_ID

if (TOKEN === undefined) {
    throw new Error('Bot token is not defined')
}
if (SUPER_USER_ID === undefined) {
    throw new Error('SU id is not defined')
}

export const bot = new Telegraf(TOKEN)
bot.start((ctx) => {
    const message = 'Welcome! See /help'
    return ctx.reply(message, {parse_mode: 'HTML'})
})
bot.hears('ping', (ctx) => {
    if (ctx.message.chat.id === +SUPER_USER_ID){
        ctx.reply('pong')
    }
})

export const launchBot = () => {
    console.log('Launching bot...')

    bot.launch()
        .catch(console.error)

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}
