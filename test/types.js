
const assert = require('assert').strict;
const t = require('../');

describe( 'Types', () => {


  describe( 'Basic types', () => {


    describe( 'String', () => {
    
      it( 'Should return true with any strings', () => {
        const type = t.string()
        const result = type( 'string' ) && type( new String( 'string' ) )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.string()
        const result = type( 1 )                          ||
                       type( new Number( 1 ) )            ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( Symbol('s') )                ||
                       type( true )                       ||
                       type( new Boolean( 1 ) )           ||
                       type( () => {} )                   ||
                       type( {} )                         ||
                       type( [ 'String' ] )               ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Numeric', () => {


      describe( 'Any number', () => {
    
        it( 'Should return true with any numbers', () => {
          const type = t.anyNumber()
          const result = type( 3 ) &&
                        type( 9007199254740991n ) &&
                        type( new Number( 3 ) ) &&
                        type( BigInt( 9007199254740991 ) )
         assert.equal( result, true )
        })    
    
        it( 'Should return false with other types', () => {
          const type = t.anyNumber()
          const result = type( 'String' )          ||
                         type( new String( 's' ) ) ||
                         type( Symbol('s') )       ||
                         type( true )              ||
                         type( new Boolean( 1 ) )  ||
                         type( () => {} )          ||
                         type( {} )                ||
                         type( [ 'String' ] )      ||
                         type( null )              ||
                         type( undefined )
          assert.equal( result, false )
        })

      })
    
    
      describe( 'Number', () => {
    
        it( 'Should return true with any regular numbers', () => {
          const type = t.number()
          const result = type( 3 ) &&
                         type( new Number( 3 ) )
          assert.equal( result, true )
        })    
    
        it( 'Should return false with other types', () => {
          const type = t.number()
          const result = type( 'String' )                   ||
                         type( new String( 's' ) )          ||
                         type( 9007199254740991n )          ||
                         type( BigInt( 9007199254740991 ) ) ||
                         type( Symbol('s') )                ||
                         type( true )                       ||
                         type( new Boolean( 1 ) )           ||
                         type( () => {} )                   ||
                         type( {} )                         ||
                         type( [ 'String' ] )               ||
                         type( null )                       ||
                         type( NaN )                        ||
                         type( undefined )
          assert.equal( result, false )
        })
    
      })
 
    
      describe( 'BigInt', () => {
    
        it( 'Should return true with any BigInt', () => {
          const type = t.bigNumber()
          const result = type( 9007199254740991n ) &&
                         type( BigInt( 9007199254740991 ) )
          assert.equal( result, true )
        })    
    
        it( 'Should return false with other types', () => {
          const type = t.bigNumber()
          const result = type( 'String' )          ||
                         type( new String( 's' ) ) ||
                         type( 3 )                 ||
                         type( new Number( 3 ) )   ||
                         type( Symbol('s') )       ||
                         type( true )              ||
                         type( new Boolean( 1 ) )  ||
                         type( () => {} )          ||
                         type( {} )                ||
                         type( [ 'String' ] )      ||
                         type( null )              ||
                         type( NaN )               ||
                         type( undefined )
          assert.equal( result, false )
        })
    
      })
    
    
    })    


    describe( 'Symbol', () => {
    
      it( 'Should return true with any symbols', () => {
        const type = t.symbol()
        const result = type( Symbol( 's' ) )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.symbol()
        const result = type( 'String' )          ||
                       type( String( 's' ) ) ||
                       type( 3 )                 ||
                       type( new Number(3) )     ||
                       type( true )              ||
                       type( new Boolean( 1 ) )  ||
                       type( () => {} )          ||
                       type( {} )                ||
                       type( [ 'String' ] )      ||
                       type( null )              ||
                       type( NaN )               ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Boolean', () => {
    
      it( 'Should return true with any booleans', () => {
        const type = t.boolean()
        const result = type( false ) &&
                       type( new Boolean( 1 ) )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.boolean()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( () => {} )                   ||
                       type( {} )                         ||
                       type( [ 'String' ] )               ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Object', () => {
    
      it( 'Should return true with objects which aren\'t class instances', () => {
        const type = t.object()
        const result = type( {} ) &&
                       type( new Object() )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.object()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( () => {} )                   ||
                       type( [ 'String' ] )               ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Array', () => {
    
      it( 'Should return true with array', () => {
        const type = t.array()
        const result = type( [] ) &&
                       type( new Array( 3, 4 ) ) 
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.array()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Function', () => {
    
      it( 'Should return true with functions', () => {
        const type = t.function()
        const result = type( () => {} ) &&
                       type( function(){} )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.function()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( [ 'String' ] )               ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Undefined', () => {
    
      it( 'Should return true with undefined', () => {
        const type = t.undefined()
        const result = type( undefined )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.undefined()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( [ 'String' ] )               ||
                       type( NaN )                        ||
                       type( null )
        assert.equal( result, false )
      })
    
    })


    describe( 'Null', () => {
    
      it( 'Should return true with null', () => {
        const type = t.null()
        const result = type( null )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.null()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( [ 'String' ] )               ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'NaN', () => {
    
      it( 'Should return true with NaN', () => {
        const type = t.nan()
        const result = type( NaN )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.nan()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( [ 'String' ] )               ||
                       type( null )                       ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


  })


  describe( 'Complex types', () => {
  
  
    describe( 'No value', () => {
    
      it( 'Should return true with " no value " objects', () => {
        const type = t.noValue()
        const result = type( NaN ) &&
                       type( null ) &&
                       type( undefined )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.noValue()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( [ 'String' ] )
        assert.equal( result, false )
      })
    
    })


    describe( 'Empty', () => {
    
      it( 'Should return true with " empty " objects', () => {
        const type = t.empty()
        const result = type( {} ) &&
                       type( [] ) &&
                       type( '' ) &&
                       type( 0 )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.empty()
        const result = type( 'String' )                   ||
                       type( new String( 's' ) )          ||
                       type( true )                       ||
                       type( new Boolean( 0 ) )           ||
                       type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( { 'value': 'foo' } )         ||
                       type( () => {} )                   ||
                       type( [ 'String' ] )               ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Aray Of', () => {
    
      it( 'Should return true with array of right types', () => {
        const type = t.arrayOf( t.string(), t.boolean() )
        const result = type([ 'string' ]) &&
                       type([ true ]) &&
                       type([ 'both', true ])
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.arrayOf( t.string(), t.boolean() )
        const result = type( 3 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Enum', () => {
    
      it( 'Should return true with allowed values', () => {
        const type = t.enum( 'test', 3 )
        const result = type( 'test' ) &&
                       type( 3 )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other values', () => {
        const type = t.enum( 'test', 3 )
        const result = type( 4 )                          ||
                       type( new Number(3) )              ||
                       type( 'string' )                   ||
                       type( new String('String') )       ||
                       type( true )                       ||
                       type( new Boolean(1) )             ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Some Of', () => {
    
      it( 'Should return true with allowed types', () => {
        const type = t.someOf( t.string(), t.boolean() )
        const result = type( 'test' ) &&
                       type( true )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with other types', () => {
        const type = t.someOf( t.string(), t.boolean() )
        const result = type( 4 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, false )
      })
    
    })


    describe( 'Not', () => {
    
      it( 'Should return true with allowed types', () => {
        const type = t.not( t.string(), t.boolean() )
        const result = type( 4 )                          ||
                       type( new Number(3) )              ||
                       type( 9007199254740991n )          ||
                       type( BigInt( 9007199254740991 ) ) ||
                       type( {} )                         ||
                       type( () => {} )                   ||
                       type( null )                       ||
                       type( NaN )                        ||
                       type( undefined )
        assert.equal( result, true )
      })    
    
      it( 'Should return false with disallowed types', () => {
        const type = t.not( t.string(), t.boolean() )
        const result = type( 'test' ) &&
                       type( true )
        assert.equal( result, false )
      })
    
    })  


  })


  describe( 'Check', () => {

    it( 'Should check single types', () => {
      const result = t.check( t.string(), 'string' ) &&
                     !t.check( t.string(), 3 )
      assert.equal( result, true )
    })

    it( 'Should check objects of types', () => {
      const ref = {
        '1': t.string(),
        '2': t.boolean()
      }
      const valid = {
        '1': 'string',
        '2': true
      }
      const invalid = {
        '1': 3,
        '2': true
      }

      const result = t.check( ref, valid ) &&
                     !t.check( ref, invalid )
      assert.equal( result, true )
    })
  
    it( 'Should check nested objects of types', () => {
      const nested_ref = {
        '1': t.string(),
        '2': {
          '1': t.boolean(),
          '2': t.number()
        }
      }
      const valid = {
        '1': 'string',
        '2': {
          '1': false,
          '2': 3
        }
      }
      const invalid = {
        '1': 'string',
        '2': {
          '1': false,
          '2': true
        }
      }

      const result = t.check( nested_ref, valid ) &&
                     !t.check( nested_ref, invalid )
      assert.equal( result, true )
    })

    it( 'Should return false if reference is invalid', () => {
      const result = t.check( null, {} ) ||
                     t.check( 3, {} ) ||
                     t.check( "string", undefined )

      assert.equal( result, false )    
    })

  })


  describe( 'Of', () => {

    it( 'Should detect types', () => {
      const result = t.of( 32 ) === 'number' &&
                     t.of( 32n ) === 'bigint' &&
                     t.of( '' ) === 'string' &&
                     t.of( {} ) === 'object' &&
                     t.of( [] ) === 'array' &&
                     t.of( NaN ) === 'NaN' &&
                     t.of( null ) === 'null' &&
                     t.of( true ) === 'boolean' &&
                     t.of( () => {} ) === 'function' &&
                     t.of( Symbol('a') ) === 'symbol' &&
                     t.of( undefined ) === 'undefined'
                     
      assert.equal( result, true )
    })

    it( 'Should detect types of items created by constructor', () => {
      const result = t.of( new Number(32) ) === 'number' &&
                     t.of( BigInt( 32 ) ) === 'bigint' &&
                     t.of( new String('') ) === 'string' &&
                     t.of( new Object() ) === 'object' &&
                     t.of( new Array( 1 , 2 ) ) === 'array' &&
                     t.of( new Number( NaN ) ) === 'NaN' &&
                     t.of( new Boolean( 1 ) ) === 'boolean' &&
                     t.of( new Function() ) === 'function' &&

      assert.equal( result, true )
    })

  })


})
