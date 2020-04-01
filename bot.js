var assert = require("assert"),
  webdriver = require("selenium-webdriver"),
  chrome = require("selenium-webdriver/chrome");
var path = require("chromedriver").path;
const fs = require("fs");
const { By, until } = require("selenium-webdriver");
var atob = require("atob");
const { extname, resolve } = require("path");
var base64Img = require("base64-img");
var timeout = 3000;

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
      until.elementsLocated(By.className("_2ICyLVqxrk-FasJQIpaNzv")),
      timeout
    );
  });
  await vote.click(vote);

  var [img] = await driver.wait(function() {
    return driver.wait(
      until.elementsLocated(By.className("gc__3_EfD")),
      timeout
    );
  });

  var img2 = await img.getAttribute("src");

  try {
    let base64Image = img2.split(";base64,").pop();
    var teste = await fs.writeFile(
      `image.png`,
      base64Image,
      { encoding: "base64" },
      function(err) {
        console.log("File created");
      }
    );
  } catch (err) {}

  try {
    var reload = await driver.wait(function() {
      return driver.wait(
        until.elementLocated(By.className("gc__1JSqe")),
        timeout
      );
    });

    await reload.click();
  } catch (err) {}
}

GloboLogin();
