const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.get('/watch', async (req, res) => {
  try {
    console.log('🔵 بدأ مشاهدة الإعلان');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto('https://billing.freeminecrafthost.com/login', { waitUntil: 'networkidle2' });

    await page.type('input[name="email"]', process.env.EMAIL);
    await page.type('input[name="password"]', process.env.PASSWORD);

    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);

    await page.goto('https://billing.freeminecrafthost.com/earn/coins', { waitUntil: 'networkidle2' });

    console.log('⏳ ينتظر 50 ثانية لمشاهدة الإعلان...');
    await page.waitForTimeout(50000);

    await browser.close();

    console.log('✅ تم الانتهاء من مشاهدة الإعلان');
    res.send('تمت مشاهدة الإعلان بنجاح!');
  } catch (error) {
    console.error('❌ خطأ أثناء مشاهدة الإعلان:', error);
    res.status(500).send('حدث خطأ: ' + error.message);
  }
});

app.listen(port, () => {
  console.log(`🚀 السيرفر شغال على بورت ${port}`);
});
