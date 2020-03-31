var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome");
var path = require("chromedriver").path;
const fs = require("fs");
const { By, until } = require("selenium-webdriver");

var timeout = 10000;

async function GloboLogin() {
  var driver = chrome.Driver.createSession(
    new chrome.Options(),
    new chrome.ServiceBuilder(path).build()
  );

  driver.get("https://minhaconta.globo.com");

  var login = await driver.wait(function() {
    return driver.wait(until.elementLocated(By.id("login")), timeout);
  });

  await login.sendKeys("joaovictor1c3003@gmail.com");

  var password = await driver.wait(function() {
    return driver.wait(until.elementLocated(By.id("password")), timeout);
  });

  await password.sendKeys("123456789");

  var button = await driver.wait(function() {
    return driver.wait(
      until.elementLocated(By.className("button ng-scope")),
      timeout
    );
  });
  await button.click();

  await driver.get(
    "https://gshow.globo.com/realities/bbb/bbb20/votacao/paredao-bbb20-quem-voce-quer-eliminar-felipe-manu-ou-mari-a9f49f90-84e2-4c12-a9af-b262e2dd5be4.ghtml"
  );
  var [, vote] = await driver.wait(function() {
    return driver.wait(
      until.elementsLocated(By.className("_2VB0COy4AGiYeUkFpM5Oam")),
      timeout
    );
  });
  await vote.click(vote);

  // var img = await driver.wait(function() {
  //   return driver.wait(
  //     until.elementsLocated(By.className("gc__3_EfD")),
  //     timeout
  //   );
  // });
  // console.log(img);
  // const img2 = await img.getAttribute("src");
  // console.log(img2);
}

GloboLogin();
