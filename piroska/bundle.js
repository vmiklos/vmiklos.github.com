(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var domready = require('domready');
var shuffle = require('shuffle-array');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

domready(function() {
    var text = '';
    text += '{Actor04} bort és kalácsot visz a beteg {Actor11}. Útközben összetalálkozik ';
    text += '{Actor22}, és az rábeszéli, hogy virágot is vigyen. Míg {Actor00} virágot szed, ';
    text += '{Actor20} elnyargal {Actor13}, megeszi és magára öltve hálóköntösét és ';
    text += 'hálósapkáját, befekszik az ágyába. Nemsokára megérkezik {Actor00}, és ';
    text += 'megkérdezi, hogy miért olyan nagy a füle, szeme, szája. {Actor24} válaszai: a) ';
    text += 'azért, hogy jobban halljalak, b) azért, hogy jobban lássalak, c) azért, hogy ';
    text += 'könnyebben bekaphassalak/vagy felszólítja, hogy feküdjön mellé. {Actor04} ';
    text += 'nekikészülődik, de irtózik és kérdéseket tesz fel: miért olyan nagy/vagy szőrös ';
    text += 'a lába, a keze, a szája stb., {Actor20} bekapja. Az arrajáró {Actor35} ';
    text += 'meghallja {Actor20} erős horkolását, bemegy, felvágja a hasát, és {Actor00} és ';
    text += '{Actor10} elevenen kisétál belőle. A hasat megtöltik kaviccsal. {Actor24} ';
    text += 'elpusztul.';

    var actors = [
        [
            'Piroska',
            'Piroskának',
            'Piroskával',
            'Piroskához',
            'Piroska',
            'Piroska'
        ],
        [
            'a nagymama',
            'nagymamának',
            'a nagymamával',
            'a nagymamához',
            'A nagymama',
            'nagymama'
        ],
        [
            'a farkas',
            'farkasnak',
            'a farkassal',
            'a farkashoz',
            'A farkas',
            'farkas'
        ],
        [
            'a vadász',
            'vadásznak',
            'a vadásszal',
            'a vadászhoz',
            'A vadász',
            'vadász'
        ]
    ];

    // Maps original actors to actors in the current run.
    // TODO duplication
    var currentActors = [0, 1, 2, 3];

    shuffle(currentActors);

    for (var actor = 0; actor < actors.length; actor += 1)
    {
        for (var variant = 0; variant < actors[0].length; variant += 1)
        {
            var fro = '{Actor' + actor.toString() + variant.toString() + '}';
            var to = actors[currentActors[actor]][variant];
            text = text.replaceAll(fro, to);
        }
    }

    // Create our page.
    var body = document.getElementsByTagName('body')[0];
    var paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(text));
    body.appendChild(paragraph);
});

// vim: shiftwidth=4 softtabstop=4 expandtab:

},{"domready":2,"shuffle-array":3}],2:[function(require,module,exports){
/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Randomize the order of the elements in a given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Boolean} [options.copy] - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Array}
 */
function shuffle(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle expect an array as parameter.');
  }

  options = options || {};

  var collection = arr,
      len = arr.length,
      rng = options.rng || Math.random,
      random,
      temp;

  if (options.copy === true) {
    collection = arr.slice();
  }

  while (len) {
    random = Math.floor(rng() * len);
    len -= 1;
    temp = collection[len];
    collection[len] = collection[random];
    collection[random] = temp;
  }

  return collection;
};

/**
 * Pick one or more random elements from the given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Number} [options.picks] - Specifies how many random elements you want to pick. By default it picks 1.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Object}
 */
shuffle.pick = function(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle.pick() expect an array as parameter.');
  }

  options = options || {};

  var rng = options.rng || Math.random,
      picks = options.picks || 1;

  if (typeof picks === 'number' && picks !== 1) {
    var len = arr.length,
        collection = arr.slice(),
        random = [],
        index;

    while (picks && len) {
      index = Math.floor(rng() * len);
      random.push(collection[index]);
      collection.splice(index, 1);
      len -= 1;
      picks -= 1;
    }

    return random;
  }

  return arr[Math.floor(rng() * arr.length)];
};

/**
 * Expose
 */
module.exports = shuffle;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy5sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm1haW4uanMiLCJub2RlX21vZHVsZXMvZG9tcmVhZHkvcmVhZHkuanMiLCJub2RlX21vZHVsZXMvc2h1ZmZsZS1hcnJheS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qXG4gKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuICovXG5cbnZhciBkb21yZWFkeSA9IHJlcXVpcmUoJ2RvbXJlYWR5Jyk7XG52YXIgc2h1ZmZsZSA9IHJlcXVpcmUoJ3NodWZmbGUtYXJyYXknKTtcblxuU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlQWxsID0gZnVuY3Rpb24oc2VhcmNoLCByZXBsYWNlbWVudCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIHJldHVybiB0YXJnZXQucmVwbGFjZShuZXcgUmVnRXhwKHNlYXJjaCwgJ2cnKSwgcmVwbGFjZW1lbnQpO1xufTtcblxuZG9tcmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRleHQgPSAnJztcbiAgICB0ZXh0ICs9ICd7QWN0b3IwNH0gYm9ydCDDqXMga2Fsw6Fjc290IHZpc3ogYSBiZXRlZyB7QWN0b3IxMX0uIMOadGvDtnpiZW4gw7Zzc3pldGFsw6Fsa296aWsgJztcbiAgICB0ZXh0ICs9ICd7QWN0b3IyMn0sIMOpcyBheiByw6FiZXN6w6lsaSwgaG9neSB2aXLDoWdvdCBpcyB2aWd5ZW4uIE3DrWcge0FjdG9yMDB9IHZpcsOhZ290IHN6ZWQsICc7XG4gICAgdGV4dCArPSAne0FjdG9yMjB9IGVsbnlhcmdhbCB7QWN0b3IxM30sIG1lZ2Vzemkgw6lzIG1hZ8OhcmEgw7ZsdHZlIGjDoWzDs2vDtm50w7Zzw6l0IMOpcyAnO1xuICAgIHRleHQgKz0gJ2jDoWzDs3NhcGvDoWrDoXQsIGJlZmVrc3ppayBheiDDoWd5w6FiYS4gTmVtc29rw6FyYSBtZWfDqXJrZXppayB7QWN0b3IwMH0sIMOpcyAnO1xuICAgIHRleHQgKz0gJ21lZ2vDqXJkZXppLCBob2d5IG1pw6lydCBvbHlhbiBuYWd5IGEgZsO8bGUsIHN6ZW1lLCBzesOhamEuIHtBY3RvcjI0fSB2w6FsYXN6YWk6IGEpICc7XG4gICAgdGV4dCArPSAnYXrDqXJ0LCBob2d5IGpvYmJhbiBoYWxsamFsYWssIGIpIGF6w6lydCwgaG9neSBqb2JiYW4gbMOhc3NhbGFrLCBjKSBhesOpcnQsIGhvZ3kgJztcbiAgICB0ZXh0ICs9ICdrw7ZubnllYmJlbiBiZWthcGhhc3NhbGFrL3ZhZ3kgZmVsc3rDs2zDrXRqYSwgaG9neSBmZWvDvGRqw7ZuIG1lbGzDqS4ge0FjdG9yMDR9ICc7XG4gICAgdGV4dCArPSAnbmVraWvDqXN6w7xsxZFkaWssIGRlIGlydMOzemlrIMOpcyBrw6lyZMOpc2VrZXQgdGVzeiBmZWw6IG1pw6lydCBvbHlhbiBuYWd5L3ZhZ3kgc3rFkXLDtnMgJztcbiAgICB0ZXh0ICs9ICdhIGzDoWJhLCBhIGtlemUsIGEgc3rDoWphIHN0Yi4sIHtBY3RvcjIwfSBiZWthcGphLiBBeiBhcnJhasOhcsOzIHtBY3RvcjM1fSAnO1xuICAgIHRleHQgKz0gJ21lZ2hhbGxqYSB7QWN0b3IyMH0gZXLFkXMgaG9ya29sw6Fzw6F0LCBiZW1lZ3ksIGZlbHbDoWdqYSBhIGhhc8OhdCwgw6lzIHtBY3RvcjAwfSDDqXMgJztcbiAgICB0ZXh0ICs9ICd7QWN0b3IxMH0gZWxldmVuZW4ga2lzw6l0w6FsIGJlbMWRbGUuIEEgaGFzYXQgbWVndMO2bHRpayBrYXZpY2NzYWwuIHtBY3RvcjI0fSAnO1xuICAgIHRleHQgKz0gJ2VscHVzenR1bC4nO1xuXG4gICAgdmFyIGFjdG9ycyA9IFtcbiAgICAgICAgW1xuICAgICAgICAgICAgJ1Bpcm9za2EnLFxuICAgICAgICAgICAgJ1Bpcm9za8OhbmFrJyxcbiAgICAgICAgICAgICdQaXJvc2vDoXZhbCcsXG4gICAgICAgICAgICAnUGlyb3Nrw6Fob3onLFxuICAgICAgICAgICAgJ1Bpcm9za2EnLFxuICAgICAgICAgICAgJ1Bpcm9za2EnXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhIG5hZ3ltYW1hJyxcbiAgICAgICAgICAgICduYWd5bWFtw6FuYWsnLFxuICAgICAgICAgICAgJ2EgbmFneW1hbcOhdmFsJyxcbiAgICAgICAgICAgICdhIG5hZ3ltYW3DoWhveicsXG4gICAgICAgICAgICAnQSBuYWd5bWFtYScsXG4gICAgICAgICAgICAnbmFneW1hbWEnXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhIGZhcmthcycsXG4gICAgICAgICAgICAnZmFya2FzbmFrJyxcbiAgICAgICAgICAgICdhIGZhcmthc3NhbCcsXG4gICAgICAgICAgICAnYSBmYXJrYXNob3onLFxuICAgICAgICAgICAgJ0EgZmFya2FzJyxcbiAgICAgICAgICAgICdmYXJrYXMnXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhIHZhZMOhc3onLFxuICAgICAgICAgICAgJ3ZhZMOhc3puYWsnLFxuICAgICAgICAgICAgJ2EgdmFkw6Fzc3phbCcsXG4gICAgICAgICAgICAnYSB2YWTDoXN6aG96JyxcbiAgICAgICAgICAgICdBIHZhZMOhc3onLFxuICAgICAgICAgICAgJ3ZhZMOhc3onXG4gICAgICAgIF1cbiAgICBdO1xuXG4gICAgLy8gTWFwcyBvcmlnaW5hbCBhY3RvcnMgdG8gYWN0b3JzIGluIHRoZSBjdXJyZW50IHJ1bi5cbiAgICAvLyBUT0RPIGR1cGxpY2F0aW9uXG4gICAgdmFyIGN1cnJlbnRBY3RvcnMgPSBbMCwgMSwgMiwgM107XG5cbiAgICBzaHVmZmxlKGN1cnJlbnRBY3RvcnMpO1xuXG4gICAgZm9yICh2YXIgYWN0b3IgPSAwOyBhY3RvciA8IGFjdG9ycy5sZW5ndGg7IGFjdG9yICs9IDEpXG4gICAge1xuICAgICAgICBmb3IgKHZhciB2YXJpYW50ID0gMDsgdmFyaWFudCA8IGFjdG9yc1swXS5sZW5ndGg7IHZhcmlhbnQgKz0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgdmFyIGZybyA9ICd7QWN0b3InICsgYWN0b3IudG9TdHJpbmcoKSArIHZhcmlhbnQudG9TdHJpbmcoKSArICd9JztcbiAgICAgICAgICAgIHZhciB0byA9IGFjdG9yc1tjdXJyZW50QWN0b3JzW2FjdG9yXV1bdmFyaWFudF07XG4gICAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlQWxsKGZybywgdG8pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIG91ciBwYWdlLlxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXTtcbiAgICB2YXIgcGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIHBhcmFncmFwaC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xufSk7XG5cbi8vIHZpbTogc2hpZnR3aWR0aD00IHNvZnR0YWJzdG9wPTQgZXhwYW5kdGFiOlxuIiwiLyohXG4gICogZG9tcmVhZHkgKGMpIER1c3RpbiBEaWF6IDIwMTQgLSBMaWNlbnNlIE1JVFxuICAqL1xuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxuXG59KCdkb21yZWFkeScsIGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZm5zID0gW10sIGxpc3RlbmVyXG4gICAgLCBkb2MgPSBkb2N1bWVudFxuICAgICwgaGFjayA9IGRvYy5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGxcbiAgICAsIGRvbUNvbnRlbnRMb2FkZWQgPSAnRE9NQ29udGVudExvYWRlZCdcbiAgICAsIGxvYWRlZCA9IChoYWNrID8gL15sb2FkZWR8XmMvIDogL15sb2FkZWR8Xml8XmMvKS50ZXN0KGRvYy5yZWFkeVN0YXRlKVxuXG5cbiAgaWYgKCFsb2FkZWQpXG4gIGRvYy5hZGRFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyID0gZnVuY3Rpb24gKCkge1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKGRvbUNvbnRlbnRMb2FkZWQsIGxpc3RlbmVyKVxuICAgIGxvYWRlZCA9IDFcbiAgICB3aGlsZSAobGlzdGVuZXIgPSBmbnMuc2hpZnQoKSkgbGlzdGVuZXIoKVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiAoZm4pIHtcbiAgICBsb2FkZWQgPyBzZXRUaW1lb3V0KGZuLCAwKSA6IGZucy5wdXNoKGZuKVxuICB9XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJhbmRvbWl6ZSB0aGUgb3JkZXIgb2YgdGhlIGVsZW1lbnRzIGluIGEgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBUaGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jb3B5XSAtIFNldHMgaWYgc2hvdWxkIHJldHVybiBhIHNodWZmbGVkIGNvcHkgb2YgdGhlIGdpdmVuIGFycmF5LiBCeSBkZWZhdWx0IGl0J3MgYSBmYWxzeSB2YWx1ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnJuZ10gLSBTcGVjaWZpZXMgYSBjdXN0b20gcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHNodWZmbGUoYXJyLCBvcHRpb25zKSB7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NodWZmbGUgZXhwZWN0IGFuIGFycmF5IGFzIHBhcmFtZXRlci4nKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBjb2xsZWN0aW9uID0gYXJyLFxuICAgICAgbGVuID0gYXJyLmxlbmd0aCxcbiAgICAgIHJuZyA9IG9wdGlvbnMucm5nIHx8IE1hdGgucmFuZG9tLFxuICAgICAgcmFuZG9tLFxuICAgICAgdGVtcDtcblxuICBpZiAob3B0aW9ucy5jb3B5ID09PSB0cnVlKSB7XG4gICAgY29sbGVjdGlvbiA9IGFyci5zbGljZSgpO1xuICB9XG5cbiAgd2hpbGUgKGxlbikge1xuICAgIHJhbmRvbSA9IE1hdGguZmxvb3Iocm5nKCkgKiBsZW4pO1xuICAgIGxlbiAtPSAxO1xuICAgIHRlbXAgPSBjb2xsZWN0aW9uW2xlbl07XG4gICAgY29sbGVjdGlvbltsZW5dID0gY29sbGVjdGlvbltyYW5kb21dO1xuICAgIGNvbGxlY3Rpb25bcmFuZG9tXSA9IHRlbXA7XG4gIH1cblxuICByZXR1cm4gY29sbGVjdGlvbjtcbn07XG5cbi8qKlxuICogUGljayBvbmUgb3IgbW9yZSByYW5kb20gZWxlbWVudHMgZnJvbSB0aGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBUaGUgZ2l2ZW4gYXJyYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbiBvcHRpb25zLlxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnBpY2tzXSAtIFNwZWNpZmllcyBob3cgbWFueSByYW5kb20gZWxlbWVudHMgeW91IHdhbnQgdG8gcGljay4gQnkgZGVmYXVsdCBpdCBwaWNrcyAxLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMucm5nXSAtIFNwZWNpZmllcyBhIGN1c3RvbSByYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbnNodWZmbGUucGljayA9IGZ1bmN0aW9uKGFyciwgb3B0aW9ucykge1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzaHVmZmxlLnBpY2soKSBleHBlY3QgYW4gYXJyYXkgYXMgcGFyYW1ldGVyLicpO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZyA9IG9wdGlvbnMucm5nIHx8IE1hdGgucmFuZG9tLFxuICAgICAgcGlja3MgPSBvcHRpb25zLnBpY2tzIHx8IDE7XG5cbiAgaWYgKHR5cGVvZiBwaWNrcyA9PT0gJ251bWJlcicgJiYgcGlja3MgIT09IDEpIHtcbiAgICB2YXIgbGVuID0gYXJyLmxlbmd0aCxcbiAgICAgICAgY29sbGVjdGlvbiA9IGFyci5zbGljZSgpLFxuICAgICAgICByYW5kb20gPSBbXSxcbiAgICAgICAgaW5kZXg7XG5cbiAgICB3aGlsZSAocGlja3MgJiYgbGVuKSB7XG4gICAgICBpbmRleCA9IE1hdGguZmxvb3Iocm5nKCkgKiBsZW4pO1xuICAgICAgcmFuZG9tLnB1c2goY29sbGVjdGlvbltpbmRleF0pO1xuICAgICAgY29sbGVjdGlvbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgbGVuIC09IDE7XG4gICAgICBwaWNrcyAtPSAxO1xuICAgIH1cblxuICAgIHJldHVybiByYW5kb207XG4gIH1cblxuICByZXR1cm4gYXJyW01hdGguZmxvb3Iocm5nKCkgKiBhcnIubGVuZ3RoKV07XG59O1xuXG4vKipcbiAqIEV4cG9zZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHNodWZmbGU7XG4iXX0=
