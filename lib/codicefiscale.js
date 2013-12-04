/*
 * codicefiscale
 * https://github.com/parroit/codicefiscale
 *
 * Copyright (c) 2013 parroit
 * Licensed under the MIT license.
 */

'use strict';

var validi = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ",
    setEven = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    setOdd = "BAKPLCQDREVOSFTGUHMINJWZYX";

function mapCodeEven(character) {
    return setEven.indexOf(set2.charAt(set1.indexOf(character)));
}
function mapCodeOdd(character) {
    return setOdd.indexOf(set2.charAt(set1.indexOf(character)));
}
function checkCharacters(codiceFiscale) {
    for (var i = 0; i < 16; i++) {
        var character = codiceFiscale.charAt(i);
        if (validi.indexOf(character) === -1) {
            return character;
        }
    }
    return null;

}
function calculateCheckCode(codiceFiscale) {
    var checkCode = 0,
        i;

    for (i = 1; i <= 13; i += 2) {
        checkCode += mapCodeEven(codiceFiscale.charAt(i));
    }

    for (i = 0; i <= 14; i += 2) {
        checkCode += mapCodeOdd(codiceFiscale.charAt(i));
    }
    return checkCode % 26;
}

function codiceFiscaleValid(codiceFiscale) {

    if (!codiceFiscale) {
        return "Il codice fiscale \u00E8 vuoto.";
    }

    if (codiceFiscale.length !== 16) {
        return "La lunghezza del codice fiscale non \u00E8 corretta.";
    }

    codiceFiscale = codiceFiscale.toUpperCase();

    var badCharacter = checkCharacters(codiceFiscale);
    if (badCharacter !== null) {
        return "Il codice fiscale contiene un carattere non valido: '" + badCharacter + "'";
    }

    var expectedCheckCode = calculateCheckCode(codiceFiscale);
    var actualCheckCode = codiceFiscale.charCodeAt(15) - 'A'.charCodeAt(0);

    if (expectedCheckCode !== actualCheckCode) {
        return "Il codice fiscale non \u00E8 corretto:il codice di controllo non corrisponde.";
    }

    return null;
}

module.exports = codiceFiscaleValid;