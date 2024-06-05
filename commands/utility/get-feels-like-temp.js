const { SlashCommandBuilder } = require('discord.js');
const request = require('request');  
const apiKey = '2eb22a407b57db5169fe80512360beca';

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('get-feels-like-temp')
        .setDescription('Provides information about the current temperature feels like.')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('The city you would like the temperature for')
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
                interaction.reply(`It feels like ${body.main.feels_like} degrees Celsius in ${body.name}, ${body.sys.country}.`);
            } else {
                interaction.reply('Sorry, I could not fetch the temperature.');
            }
        });  
    },
};
