/**
 * psycho-type
 * Copyright(c) 2020 Dmitry Kokhanevych
 * MIT Licensed
 */

'use strict';

/**
 * Module exports.
 */

var type = module.exports = {};

/**
 * Allow any type.
 * 
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.any = () => {
  return () => true;
};

/**
 * Allow string.
 * Works with both " 'string' " and " new String() ".
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.string = () => {
  return object => typeof object === 'string' ||
                   object instanceof String;
};

/**
 * Allow number.
 * Works with all numeric type object: Number and Bigint,
 * and they can be created at any way.
 *
 * ! NaN is a valid number in this type !
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.anyNumber = () => {
  return object => typeof object === 'number' ||
                   typeof object === 'bigint' ||
                   object instanceof Number;
};

/**
 * Only allow small number type.
 * Works with both " 3 " and " new Number() ".
 * Doesn't works for BigInt and NaN.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.number = () => {
  return object => !Number.isNaN( object ) && (
                     typeof object === 'number' ||
                     object instanceof Number
                   );
};

/**
 * Only allow big number type.
 * Works with both " 9007199254740991n " and " new BigInt() ".
 * Doesn't works for regular numbers and NaN.
 *
 * Alias: type.bigInt
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.bigInt =
type.bigNumber = () => {
  return object => typeof object === 'bigint';
};

/**
 * Allow symbol type.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.symbol = () => {
  return object => typeof object === 'symbol';
};

/**
 * Allow boolean type.
 * Works with both " true " and " new Boolean( 1 ) ".
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.bool =
type.boolean = () => {
  return object => typeof object === 'boolean' ||
                   object instanceof Boolean;
};

/**
 * Allow object type.
 * Works only with objects, that not used for
 * standart data types.
 *
 * Examples:
 *
 *     type.object()( new String( 'something' ) )'
 *     // => false
 *
 *     type.object()( { "param": "value" } )'
 *     // => true
 *
 *     type.object()( {} )'
 *     // => true
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.object = () => {
  return object => !!(
    object &&
    object.constructor &&
    object.constructor === Object
  );
};

/**
 * Allow functions.
 *
 * ! Any class/constructor will return true on check !
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.function = () => {
  return object => typeof object === 'function';
};

/**
 * Allow undefined type.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.undefined = () => {
  return object => object === undefined;
};

/**
 * Only allow null.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.null = () => {
  return object => object === null;
};

/**
 * Only allow NaN.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.NaN =
type.nan = () => {
  return object => Number.isNaN( object );
};

/**
 * Allow " no value " types.
 * Works with undefined, null and NaN.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.noValue = () => {
  return object => object == undefined ||
                   Number.isNaN( object );
};

/**
 * Only allow " empty " values.
 * Works with {}, [], '' and 0.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.empty = () => {
  return object => {
    const type = typeof object;

    // Strings and Arrays have valid length property. 
    if ( type === 'string' || object instanceof Array ) {
      return object.length === 0;
    }

    // Because " new Date() " have zero keys --
    // we need to check constructor of the object.
    if ( object && object.constructor && object.constructor === Object ) {
      return Object.keys( object ).length === 0;
    }

    if ( type === 'number' ) {
      return object === 0;
    }

    return false;
  };
};

/**
 * Allow array with any types inside.
 *
 * @return {Function}:
 *     @param {Any} object
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.array = () => {
  return object => object instanceof Array;
};

/**
 * Allow array with specified types.
 *
 * Examples:
 *
 *     // Valid types
 *     type.arrayOf( type.string(), type.number() );
 *     type.arrayOf( [ type.string(), type.number() ] );
 *     // => function([ 3, 'string' ]);
 *           // => true
 *
 *     // Invalid types
 *     type.arrayOf( type.string(), type.number() );
 *     type.arrayOf( [ type.string(), type.number() ] );
 *     // => function([ { }, [ ] ]);
 *           // => false
 *
 * @param {Function} ...types
 * @return {Function}:
 *     @param {Array}
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.arrayOf = ( ...types ) => {
  return array => array instanceof Array &&
                  array.every( v => types.some( t => t( v ) ) );
};

/**
 * Only allow some values.
 *
 * Example:
 *
 *     // Valid data
 *     type.enum( 'foo', 'bar' );
 *     type.enum( [ 'foo', 'bar' ] );
 *     // => function( 'foo' );
             function( 'bar' );
 *           // => true
 *
 *     // Invalid data
 *     type.enum( 'foo', 'bar' );
 *     type.enum( [ 'foo', 'bar' ] );
 *     // => function( 'not foo' );
 *           // => false
 *
 * @param {Any} ...values
 * @return {Function}:
 *     @param {Any}
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.enum = ( ...values ) => {
  return object => values.includes( object ); // TODO: fix 'new Object()' issue
};

/**
 * Only allow some types.
 *
 * Example:
 *
 *     // Valid types
 *     type.someOf( type.string(), type.boolean() );
 *     type.someOf( [ type.string(), type.boolean() ] );
 *     // => function( 'foo' );
             function( false );
 *           // => true
 *
 *     // Invalid types
 *     type.someOf( type.string(), type.boolean() );
 *     type.someOf( [ type.string(), type.boolean() ] );
 *     // => function( 3 );
 *           // => false
 *
 * @param {Function} ...types
 * @return {Function}:
 *     @param {Any}
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.someOf = ( ...types ) => {
  return object => types.some( t => t( object ) );
};

/**
 * Only disallow some types.
 *
 * Example:
 *
 *     // Valid types
 *     type.not( type.string(), type.boolean() );
 *     type.not( [ type.string(), type.boolean() ] );
 *     // => function( 3 );
             function( {} );
 *           // => true
 *
 *     // Invalid types
 *     type.not( type.string(), type.boolean() );
 *     type.not( [ type.string(), type.boolean() ] );
 *     // => function( 'foo' );
             function( true );
 *           // => false
 *
 * @param {Function} ...types
 * @return {Function}:
 *     @param {Any}
 *     @return {Boolean}
 *     @private
 *
 * @public
 */

type.not = ( ...types ) => {
  return object => !types.some( t => t( object ) );
};

/**
 * Check if input have valid type relying on reference.
 * Input|Reference can be ( nested ) objects or
 * just pair type|value respectively.
 * 
 * Example:
 *
 *     type.check(
 *       {                         // Reference
 *         'foo': type.string(),   //
 *         'bar': type.boolean()   //
 *       },
 *       {                         // Input
 *         'foo': 'String',        //
 *         'bar': false            //
 *       }
 *     );
 *     // => true
 *
 *     type.check(
 *       {                         // Reference
 *         'foo': type.string(),   //
 *         'bar': type.boolean()   //
 *       },
 *       {                         // Input
 *         'foo': true,            //
 *         'bar': false            //
 *       }
 *     );
 *     // => false
 *
 *     type.check( type.string(), 'string' );
 *     // => true
 *
 * @param {Function} reference
 * @param {Any} input
 * @return {Boolean}
 * @public
 */

type.check = ( reference, input ) => {
  // Simple check
  const checkType = ( t, v ) => t( v );

  // Recursion for ( nested ) objects
  const checkObject = ( ref, obj ) => {
    return !type.object()( ref )  // if ref isn't object:
      ? false                     // return false
      : Object.entries( ref ).every( ([ k, t ]) => {
        return t.constructor === Object
          ? checkObject( t, obj[ k ] )
          : t( obj[ k ] );
        });
  };

  return typeof reference === 'function'
    ? checkType( reference, input )
    : checkObject( reference, input );  // If reference is not the function
                                        // it expected to be an object.
}

