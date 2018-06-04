// Generated by BUCKLESCRIPT VERSION 3.1.5, PLEASE EDIT WITH CARE
'use strict';

var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var PlaygroundHtml = require("./Playground.html");

var myArray = /* array */[
  1,
  2,
  3,
  4,
  5
];

function intToBool(x) {
  return x !== 0;
}

var doubleArr = myArray.map((function (x) {
          return Caml_int32.imul(x, 3);
        })).filter((function (x) {
        return intToBool(x % 2);
      }));

console.log(doubleArr);

exports.myArray = myArray;
exports.intToBool = intToBool;
exports.doubleArr = doubleArr;
/*  Not a pure module */
