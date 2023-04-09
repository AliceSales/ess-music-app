import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, ExpectedConditions } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");
import { HttpClient } from 'selenium-webdriver/http';

const base_url = "http://localhost:3000/";
const base_front_url = "http://localhost:4200";


defineSupportCode(function ({ Given, When, Then }) {

    Given(/^Estou na página de "Cadastrar novo álbum" do artista "([^\"]*)"$/, async (artist: string) => {
        await $("a[routerLink='/userAdmin']").click();
        await element(by.cssContainingText('a', 'Visualizar Artistas')).click();

        await expect(browser.getCurrentUrl()).to.eventually.equal(base_front_url + "/visualizar-artistas-admin");

        await element(by.cssContainingText('td p', artist))
            .element(by.xpath('..'))
            .element(by.xpath('..'))
            .element(by.buttonText('Cadastrar Novo Album'))
            .click();
        
        await expect(browser.getCurrentUrl()).to.eventually.include(base_front_url);
        await expect(browser.getCurrentUrl()).to.eventually.include("/cadastrar-album");
    })


    When(/^Preencho os campos "nome do álbum", "ano de lançamento" e "url_foto álbum" com os valores "([^\"]*)", "([^\"]*)" e "([^\"]*)"$/, async (name, year, url_photo) => {
        await $("#album-nome").sendKeys(<string> name);
        await $("#album-ano_lancamento").sendKeys(<string> year);
        await $("#album-url_foto_album").sendKeys(<string> url_photo);
    })

    Then(/^O campo "nome do álbum" fica realçado$/, async () => {
        await expect($(`#album-nome.ng-invalid`));
    })

    Then(/^O campo "ano de lançamento" fica realçado$/, async () => {
        await expect($(`#album-ano_lancamento.ng-invalid`));
    })

    Then(/^O campo "url_foto álbum" fica realçado$/, async () => {
        await expect($(`#album-ano_lancamento.ng-invalid`));
    })

})
