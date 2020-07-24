# Type Checker
  Simple and lightweight type validation library for [node](http://nodejs.org).
  
  
```js
const type = require('type-checker')
const referece = {
  'foo': type.string(),
  'bar': type.number()
}

type.check( reference, {
  'foo': 'string',
  'bar': 3
})
// => true
```

## Installation
This is a [node.js](http://nodejs.org) module available via [npm](https://www.npmjs.com/).
Requires node.js 4.9.1 or highter.

```bash
$ npm i type-checker
```

## Usage
This module can be used for runtime type validation for one item or (nested) object. 

```js
/* Validating single item */
const valid_type = type.string()

/* You can do it with check function */
type.check( valid_type, 'string' )
//=> true

/* Or only with valid type function */
valid_type( 'string' )
//=> true
```

Object validation is a little similar to [TypeScript](https://www.typescriptlang.org/) [Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html).

```js
/* Validating objects */
const reference = {          // Reference object, contain types.
  'foo': type.string(),      //
  'bar': type.boolean(),     //
  'fizz': {                  //
    'buzz': type.number()    //
  }
}

const object = {             // Object to validate.
  'foo': 'String',           //
  'bar': true,               //
  'fizz': {                  //
    'buzz': 15               //
  }
}

type.check( reference, object )
//=> true
```

# Types / Methods

+ [Basic types](#Basic-Types)
  - [Any](#Any)
  - [String](#String)
  - [Numbers](#Numbers)
    * [Any Number](#Any-Number)
    * [Number](#Number)
    * [BigInt](#BigInt)
  - [Boolean](#Boolean)
  - [Function](#Function)
  - [Object](#Object)
  - [Array](#Array)
  - [Symbol](#Symbol)
  - [Undefined](#Undefined)
  - [Null](#Null)
  - [NaN](#NaN)
+ [Complex types](#Complex-Types)
  - [No Value](#No-Value)
  - [Empty](#Empty)
  - [Array Of <types>](#Array-Of-types)
  - [Enum <values>](#Enum-values)
  - [Some Of <types>](#Some-Of-types)
  - [Not <types>](#Not-types)
+ [Check Method](#Check-Method)

## Basic Types

### Any
Just returns true on everything.

    Param {Any} item
    Return {Boolean}

```js
const any = type.any()

any( * )
//=> true
```

### String
Allow both ' "string" ' and ' new String() '.

    Param {Any} item
    Return {Boolean}

```js
const string = type.string()

string( 's' )
//=> true

string( 3 )
//=> false

string( new String() )
//=> true
```

### Numbers

#### Any Number
Allow number, bigInt or NaN.

    Param {Any} item
    Return {Boolean}

```js
const anyNumber = type.anyNumber()

anyNumber( 3 )
//=> true

anyNumber( new BigInt() )
//=> true

anyNumber( '3' )
//=> false
```

#### Number
Allow only regular number.

    Param {Any} item
    Return {Boolean}

```js
const number = type.number()

number( 3 )
//=> true

number( new BigInt() )
//=> false

number( '3' )
//=> false
```

#### BigInt
Allow only BigInt.
Have two aliases:
 - bigInt
 - bigNumber

        Param {Any} item
        Return {Boolean}

```js
const bigint = type.bigInt()

bigint( 3 )
//=> false

bigint( new BigInt() )
//=> true

bigint( '3n' )
//=> false
```

### Boolean
Allow only boolean.
Have two aliases:
 - bool
 - boolean

        Param {Any} item
        Return {Boolean}

```js
const bool = type.bool()

bool( 3 )
//=> false

bool( true )
//=> true

bool( new Boolean(1) )
//=> true
```

### Function
Allow only functions.

    ! Any class/constructor will return true !

    Param {Any} item
    Return {Boolean}

```js
const func = type.function()

func( 3 )
//=> false

func( () => {} )
//=> true

func( Boolean ) // Because ' Boolean ' it's the constructor
//=> true
```

### Object
Allow only objects.

    ! Doesn't allow null or basic data types even if it's created by ' new Object() ' !

    Param {Any} item
    Return {Boolean}

```js
const object = type.object()

object( new Object() )
//=> true

object( new Object(3) )
//=> false

object( {} )
//=> true
```

### Array
Allow array with any value.

    Param {Any} item
    Return {Boolean}

```js
const array = type.array()

array( [] )
//=> true

array( new array( 3, 4 ) )
//=> true

array( {} )
//=> false
```

### Symbol
Allow symbol.

    Param {Any} item
    Return {Boolean}

```js
const symbol = type.symbol()

symbol( [] )
//=> false

symbol( Symbol( '3' ) )
//=> true

symbol( {} )
//=> false
```

### Undefined
Allow only undefined.

    Param {Any} item
    Return {Boolean}

```js
const not_defined = type.undefined()

not_defined( [] )
//=> false

not_defined( null )
//=> false

not_defined( undefined )
//=> true
```

### Null
Allow only null.

    Param {Any} item
    Return {Boolean}

```js
const null_type = type.null()

null_type( [] )
//=> false

null_type( null )
//=> true

null_type( undefined )
//=> false
```

### NaN
Allow only NaN.
Have two aliases:
 - nan
 - NaN

        Param {Any} item
        Return {Boolean}

```js
const null_type = type.null()

null_type( [] )
//=> false

null_type( null )
//=> true

null_type( undefined )
//=> false
```

## Complex Types

### No Value
Allow ' no value ' types such as undefined, null, NaN.

    Param {Any} item
    Return {Boolean}

```js
const no_value = type.noValue()

no_value( [] )
//=> false

no_value( null )
//=> true

no_value( undefined )
//=> true
```

### Empty
Allow ' empty ' values such as {}, [], '' and 0.

    ! Doesn't work NOW with values created from constructor ( like ' new String() ' ) !

    Param {Any} item
    Return {Boolean}

```js
const empty = type.empty()

empty( [] )
//=> true

empty( null )
//=> false

empty( new String() )
//=> false
```

### Array Of _\<types\>_
Allow array with some types.

    Param {Array} ...types
    Return {function}:
        Param {Array} item
        Return {Boolean}

```js
const array = type.arrayOf(
                type.string(),
                type.boolean()
              )

array([ 'string', true ])
//=> true

array( null )
//=> false

array( new Boolean() )
//=> true
```

### Enum _\<values\>_
Allow only some values.

    ! Doesn't work NOW for values, created by like ' new Number() ' !

    Param {Array} ...values
    Return {function}:
        Param {Any} item
        Return {Boolean}

```js
const enum = type.enum(
               'value',
               3
             )

enum( 'value' )
//=> true

enum( 3 )
//=> true

enum( 4 )
//=> false
```

### Some Of _\<types\>_
Allow some types.

    Param {Array} ...types
    Return {function}:
        Param {Any} item
        Return {Boolean}

```js
const some = type.someOf(
               type.string(),
               type.boolean()
             )

some( 'value' )
//=> true

some( 3 )
//=> false

some( false )
//=> true
```

### Not _\<types\>_
Inverted ' someOf '. Disallow some types.

    Param {Array} ...types
    Return {function}:
        Param {Any} item
        Return {Boolean}

```js
const not = type.not(
              type.string(),
              type.boolean()
            )

some( 'value' )
//=> false

some( 3 )
//=> true

some( false )
//=> false
```
## Check Method
Compare types of input object with reference.

    ! Method will return false if reference is not valid, without any exeption !

    Param {Object|Function} reference/type
    Return {Boolean}

```js
const reference = {          // Reference object, contain types.
  'foo': type.string(),      //
  'bar': type.boolean(),     //
  'fizz': {                  //
    'buzz': type.number()    //
  }
}

const object = {             // Valid object.
  'foo': 'String',           //
  'bar': true,               //
  'fizz': {                  //
    'buzz': 15               //
  }
}

type.check( reference, object )
//=> true
```

# Contacts
If you have any questions or suggestions please contact me:
  <dmitry.kokhanevich@gmail.com>
