'use strict';

var smallOne = ('smallone');
var smallTwo = ('smalltwo');
var smallThree = ('smallthree');
var smallWhite = ('smallwhite');

var bigOne = ('bigone');
var bigTwo = ('bigtwo');
var bigThree = ('bigthree');
var bigWhite = ('bigwhite');

var bronse = ('#cd7f32');
var silver = ('#C0C0C0');
var black = ('black');

exports.badge = function(Karma) {

  if ( Karma < 110 ) {
    return bronse

  } else if (Karma >= 110 && Karma < 370) {
    return silver

  } else if (Karma >= 370) {
    return black 

  };
};

exports.stars = function(Karma) {

  if ( Karma >= 20 && Karma < 40 ) {
    return (
      {
        star: smallOne,
        high: 40,
        low: 20,
      }
      )
  } else if( Karma >= 160 && Karma < 220 ) {
    return (
      {
        star: smallOne,
        high: 220,
        low: 160,
      }
      )
  } else if ( Karma >= 460 && Karma < 560 ) {
    return (
      {
        star: smallOne,
        high: 560,
        low: 460,
      }
      )
  } else if( Karma >= 40 && Karma < 70 ) {
    return (
      {
        star: smallTwo,
        high: 70,
        low: 40,
      }
      )
  } else if( Karma > 50 && Karma < 100) {
    return (
      {
        star: smallThree,
        high: 100,
        low: 50,
      }
      )    
  } else if ( Karma > 70 && Karma < 110 ) { 
    return (
      {
        star: smallThree,
        high: 110,
        low: 70,
      }
      )    
  } else if ( Karma > 290 && Karma < 370 ) {
    return (
      {
        star: smallThree,
        high: 370,
        low: 290,
      }
      )    
  } else if (Karma > 600) {
    return smallThree
  } else if ( Karma < 20 ) {
    return smallWhite
  } else if( Karma < 160 && Karma > 110 ){
    return (
      {
        star: smallWhite,
        high: 160,
        low: 110,
      }
      )    
  } else if( Karma < 460 && Karma > 370 ) {
    return smallWhite
  };
};

exports.bigStars = function(Karma) {

  if ( Karma >= 20 && Karma < 40 ) {
    return bigOne
  } else if( Karma >= 160 && Karma < 220 ) {
    return bigOne
  } else if ( Karma >= 460 && Karma < 560 ) {
    return bigOne
  } else if( Karma >= 40 && Karma < 70 ) {
    return bigTwo
  } else if( Karma > 50 && Karma < 100) {
    return bigThree
  } else if( Karma > 700 ) {
    return bigThree
  } else if ( Karma < 20 ) {
    return bigWhite
  } else if( Karma < 160 && Karma > 110 ){
    return bigWhite
  } else if( Karma < 460 && Karma > 370 ) {
    return bigWhite
  };
};

exports.ratio = function(Karma) {

  return (Karma - this.stars.low / this.stars.high - this.stars.low)

};