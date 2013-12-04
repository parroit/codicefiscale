/*
 * codicefiscale
 * https://github.com/parroit/codicefiscale
 *
 * Copyright (c) 2013 parroit
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (cf) {


    var validi, i, s, set1, set2, setpari, setdisp;
    if (!cf)  return false;

    cf = cf.toUpperCase();
    if (cf.length != 16)
        return "La lunghezza del codice fiscale non è corretta.";

    validi = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (i = 0; i < 16; i++) {
        if (validi.indexOf(cf.charAt(i)) == -1)
            return "Il codice fiscale contiene un carattere non valido: '" + cf.charAt(i) +"'";
    }
    set1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    set2 = "ABCDEFGHIJABCDEFGHIJKLMNOPQRSTUVWXYZ";
    setpari = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    setdisp = "BAKPLCQDREVOSFTGUHMINJWZYX";

    s = 0;
    for (i = 1; i <= 13; i += 2)
        s += setpari.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));

    for (i = 0; i <= 14; i += 2)
        s += setdisp.indexOf(set2.charAt(set1.indexOf(cf.charAt(i))));

    if (s % 26 != cf.charCodeAt(15) - 'A'.charCodeAt(0))
        return "Il codice fiscale non è corretto:il codice di controllo non corrisponde.";
    return null;
};

