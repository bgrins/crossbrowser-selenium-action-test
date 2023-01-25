
const {
  Builder,
  By,
  Key,
  until,
  Capabilities,
  logging,
} = require('selenium-webdriver');
const assert = require("assert");


async function test() {
  let capabilities;
  switch (process.env.BROWSER) {
    case 'safari':
      capabilities = Capabilities.safari();
      capabilities.set('safari.options', { technologyPreview: false });
      break;

    case 'firefox': {
      capabilities = Capabilities.firefox().setLoggingPrefs({ browser: 'ALL' });
      break;
    }
    case 'chrome': {
      capabilities = Capabilities.chrome().setLoggingPrefs({ browser: 'ALL' });
      // capabilities.set('chromeOptions', { });
      break;
    }
  }

  let driver = await new Builder().withCapabilities(capabilities).build();
  await driver.get(`http://example.com`);
  let text = await driver.findElement(By.css("h1")).getText();
  console.log(`Header is ${text}`);

  assert(text == "Example Domain");
  driver.quit();
}

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});
process.once('uncaughtException', err => {
  console.error(err);
  process.exit(1);
});
setImmediate(test);
