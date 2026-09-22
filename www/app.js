import {
  AdMob,
  AdmobConsentStatus,
  BannerAdSize,
  BannerAdPosition
} from '@capacitor-community/admob';

const P = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8]
};

let count = 2;
let rolling = false;
let vals = [1, 1];

const dice = document.querySelector('#dice');

function draw() {
  dice.innerHTML = vals.map(v =>
    `<div class="die ${rolling ? 'rolling' : ''}">
      ${[0,
