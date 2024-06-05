const { SlashCommandBuilder } = require('discord.js');
const request = require('request');  
const apiKey = '2eb22a407b57db5169fe80512360beca';

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('get-wind-info')
        .setDescription('Provides information about the wind today.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city you would like the wind information for')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('country')
                .setDescription('Input your country code, for example CA for Canada∏')
                .setRequired(false) // Optional parameter
        ),

    async execute(interaction) {
        const city = interaction.options.getString('city');
        const country = interaction.options.getString('country');

        let location = city;
        if (country) {
            location += `,${country}`;
        }

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        request({ url: url, json: true }, function (error, response, body) {  
            if (error) {  
                console.log('Unable to connect to Forecast API');  
                return interaction.reply('Sorry, I could not fetch the temperature.');
            }  
              
            if (body.main && body.main.temp !== undefined) {  
                interaction.reply(`The wind speed in ${body.name}, ${body.sys.country} is ${body.wind.speed} kmph, it is directed at a bearing of ${body.wind.deg}. Gusts of ${body.wind.gust} are present`);
            } else {
                interaction.reply('Sorry, I could not fetch the temperature.');
            }
        });  
    },
};
