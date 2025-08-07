const puppeteer = require('puppeteer');

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  await page.goto('https://billing.freeminecrafthost.com/login', { waitUntil: 'networkidle2' });

  await page.type('input[name="email"]', EMAIL);
  await page.type('input[name="password"]', PASSWORD);

  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  await page.goto('https://billing.freeminecrafthost.com/earn/coins', { waitUntil: 'networkidle2' });

  console.log('🟡 يشاهد الإعلان 50 ثانية...');
  await page.waitForTimeout(50000);

  await browser.close();
  console.log('✅ انتهى.');
})();
