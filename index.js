import express from 'express'
import bodyParser from 'body-parser'
import cron from 'node-cron';
import cors from 'cors'
import connectDB from './Database/dbConfig.js';
import fetchCryptoData from './fetchcryptoData/cryptoData.js';
import cryptoSchemaModel from './model/cryptoSchema.js';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors()) 

// connect DataBase
connectDB();


// Background Job Schedule

cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency data...');
  
    try {
      const data = await fetchCryptoData();
  
      const coins = [
        { id: 'bitcoin', name: 'Bitcoin' },
        { id: 'matic-network', name: 'Matic' },
        { id: 'ethereum', name: 'Ethereum' },
      ];
  
      for (const coin of coins) {
        const { usd: currentPrice, usd_market_cap: marketCap, usd_24h_change: change24h } = data[coin.id];
  
        const cryptoRecord = new cryptoSchemaModel({
          coinId: coin.id,
          name: coin.name,
          currentPrice,
          marketCap,
          change24h,
        });
  
        await cryptoRecord.save();
        console.log(`Saved data for ${coin.name}`);
      }
    } catch (error) {
      console.error('Failed to fetch or save data:', error.message);
    }
  });

app.listen(7000,(error)=>{
    if(!error)
    {
        console.log("Server is running on Port 7000 ")
    }
    })
