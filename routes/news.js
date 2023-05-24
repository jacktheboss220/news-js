require('dotenv').config();
const express = require('express');
const axios = require('axios');
const news = express.Router();
const api_key = process.env.news_api_key;

news.get('/', async (req, res) => {
    try {
        var url = 'http://newsapi.org/v2/top-headlines?' +
            'country=in&' + 'apiKey=' + api_key;
        const news_get = await axios.get(url);
        res.render('news', { articles: news_get.data.articles });
    } catch (error) {
        if (error.response) {
            console.log(error);
        }
    }
});

news.post('/search', async (req, res) => {
    const search = req.body.search;
    try {
        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=${api_key}`;
        const news_get = await axios.get(url);
        res.render('news', { articles: news_get.data.articles });
    } catch (error) {
        if (error.response) {
            console.log(error);
        }
    }
});

news.get('/news/:category', async (req, res) => {
    var category = req.params.category;
    try {
        var url = 'http://newsapi.org/v2/top-headlines?country=in&category='
            + category + '&apiKey=' + api_key;
        const news_get = await axios.get(url);
        res.render('category',
            { articles: news_get.data.articles }
        );
    } catch (error) {
        if (error.response) {
            console.log(error);
        }
    }
});

module.exports = news;