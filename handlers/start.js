const{ Markup } = require('telegraf')
const path = require('path')

const CONTENT = require('../content')
const { registerUser } = require('../db/users')

function getMainMenu() {
    return Markup.inlineKeyboard([
        [
            Markup.button.callback(
                'Забрать материалы',
                'materials'
            )
        ],
        [
            Markup.button.url(
                'Telegram',
                'https://t.me/parallax_aep'
            ),
            Markup.button.url(
                'Сотрудничество',
                'https://t.me/parallaxsizm'
            )
        ],
        [
            Markup.button.url(
                'Тех. помощь',
                'https://t.me/nscapedev'
            )
        ]
    ]);
}

async function startHandler(ctx) {
    try {
        await registerUser(ctx);
    } catch (error) {
        console.error('REGISTER USER ERROR:', error);
    }

    await ctx.replyWithPhoto(
        {
        source: path.join(__dirname,'..', CONTENT.cover)
        },
        {
            caption: CONTENT.description,
            ...getMainMenu(),
        }
    )
}

module.exports = {
    startHandler,
    getMainMenu
}