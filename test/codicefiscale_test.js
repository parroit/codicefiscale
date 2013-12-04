'use strict';

var expect = require("expect.js");
var codicefiscale = require("../lib/codicefiscale");


describe("codicefiscale", function () {
    it("is defined", function () {
        expect(codicefiscale).to.be.an('function');
    });

    it("check length", function () {
        expect(codicefiscale("DFFF")).to.be.equal('La lunghezza del codice fiscale non è corretta.');
    });

    it("check characters", function () {
        expect(codicefiscale("PRDNDR76A03D969:")).to.be.equal('Il codice fiscale contiene un carattere non valido: \':\'');
    });

    it("check code", function () {
        expect(codicefiscale("PRDNDR76A03D969R")).to.be.equal("Il codice fiscale non è corretto:il codice di controllo non corrisponde.");
    });

    it("return null on right code", function () {
        expect(codicefiscale("PRDNDR76A03D969Q")).to.be.equal(null);
    });
});
