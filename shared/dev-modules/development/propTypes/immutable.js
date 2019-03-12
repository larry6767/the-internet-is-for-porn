/**
 * This module is forked from
 * https://github.com/HurricaneJames/react-immutable-proptypes/blob/6c9b3a6948544d1341ad58666aff5d233d51faee/src/ImmutablePropTypes.js
 * to satisfy our own needs:
 *   1. To make it work for production mode too;
 *   2. All checkers marked as "required" (see `.isRequired`) by default,
 *      to make is optional use `.isOptional`.
 *
 * Please, modify this file as less as possible, it would make easy migration to a newer version
 * from original repo with minimal required changes only related to our own customizations.
 *
 * Copyright (c) 2015 James Burnett
 *
 * License:
 *   MIT
 *   https://github.com/HurricaneJames/react-immutable-proptypes/blob/6c9b3a6948544d1341ad58666aff5d233d51faee/LICENSE
 */

/* eslint-disable */

//var Immutable = require('immutable');
import Immutable from 'immutable'

var ANONYMOUS = '<<anonymous>>';

var ImmutablePropTypes;

//if (process.env.NODE_ENV !== 'production') {
  ImmutablePropTypes = {
    listOf:       createListOfTypeChecker,
    mapOf:        createMapOfTypeChecker,
    orderedMapOf: createOrderedMapOfTypeChecker,
    setOf:        createSetOfTypeChecker,
    orderedSetOf: createOrderedSetOfTypeChecker,
    stackOf:      createStackOfTypeChecker,
    iterableOf:   createIterableOfTypeChecker,
    // recordOf:     createRecordOfTypeChecker, // overwritten below
    shape:        createShapeChecker,
    contains:     createShapeChecker,
    mapContains:  createMapContainsChecker,
    // Primitive Types
    list:       createImmutableTypeChecker('List', Immutable.List.isList),
    map:        createImmutableTypeChecker('Map', Immutable.Map.isMap),
    orderedMap: createImmutableTypeChecker('OrderedMap', Immutable.OrderedMap.isOrderedMap),
    set:        createImmutableTypeChecker('Set', Immutable.Set.isSet),
    orderedSet: createImmutableTypeChecker('OrderedSet', Immutable.OrderedSet.isOrderedSet),
    stack:      createImmutableTypeChecker('Stack', Immutable.Stack.isStack),
    seq:        createImmutableTypeChecker('Seq', Immutable.Seq.isSeq),
    record:     createImmutableTypeChecker('Record', function(isRecord) { return isRecord instanceof Immutable.Record; }),
    iterable:   createImmutableTypeChecker('Iterable', Immutable.Iterable.isIterable)
  };
/*} else {
  var productionTypeChecker = function() {
    invariant(
      false,
      'ImmutablePropTypes type checking code is stripped in production.'
    );
  };
  productionTypeChecker.isRequired = productionTypeChecker;
  var getProductionTypeChecker = function () { return productionTypeChecker };

  ImmutablePropTypes = {
    listOf:       getProductionTypeChecker,
    mapOf:        getProductionTypeChecker,
    orderedMapOf: getProductionTypeChecker,
    setOf:        getProductionTypeChecker,
    orderedSetOf: getProductionTypeChecker,
    stackOf:      getProductionTypeChecker,
    iterableOf:   getProductionTypeChecker,
    recordOf:     getProductionTypeChecker,
    shape:        getProductionTypeChecker,
    contains:     getProductionTypeChecker,
    mapContains:  getProductionTypeChecker,
    // Primitive Types
    list:       productionTypeChecker,
    map:        productionTypeChecker,
    orderedMap: productionTypeChecker,
    set:        productionTypeChecker,
    orderedSet: productionTypeChecker,
    stack:      productionTypeChecker,
    seq:        productionTypeChecker,
    record:     productionTypeChecker,
    iterable:   productionTypeChecker
  };
}*/

ImmutablePropTypes.iterable.indexed = createIterableSubclassTypeChecker('Indexed', Immutable.Iterable.isIndexed);
ImmutablePropTypes.iterable.keyed = createIterableSubclassTypeChecker('Keyed', Immutable.Iterable.isKeyed);

function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (propValue instanceof Immutable.Iterable) {
    return 'Immutable.' + propValue.toSource().split(' ')[0];
  }
  return propType;
}

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName, ...rest) {
    propFullName = propFullName || propName;
    componentName = componentName || ANONYMOUS;
    if (props[propName] == null) {
      var locationName = location;
      if (isRequired) {
        return new Error(
          `Required ${locationName} \`${propFullName}\` was not specified in ` +
          `\`${componentName}\`.`
        );
      }
    } else {
      return validate(props, propName, componentName, location, propFullName, ...rest);
    }
  }

  // var chainedCheckType = checkType.bind(null, false);
  var chainedCheckType = checkType.bind(null, true); // .isRequired by default
  // chainedCheckType.isRequired = checkType.bind(null, true);
  chainedCheckType.isOptional = checkType.bind(null, false);

  return chainedCheckType;
}

function createImmutableTypeChecker(immutableClassName, immutableClassTypeValidator) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if(!immutableClassTypeValidator(propValue)) {
      var propType = getPropType(propValue);
      return new Error(
        `Invalid ${location} \`${propFullName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected \`${immutableClassName}\`.`
      );
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createIterableSubclassTypeChecker(subclassName, validator) {
  return createImmutableTypeChecker(`Iterable.${subclassName}`, (propValue) =>
    Immutable.Iterable.isIterable(propValue) && validator(propValue)
  );
}

function createIterableTypeChecker(typeChecker, immutableClassName, immutableClassTypeValidator) {

  function validate(props, propName, componentName, location, propFullName, ...rest) {
    var propValue = props[propName];
    if (!immutableClassTypeValidator(propValue)) {
      var locationName = location;
      var propType = getPropType(propValue);
      return new Error(
        `Invalid ${locationName} \`${propFullName}\` of type ` +
        `\`${propType}\` supplied to \`${componentName}\`, expected an Immutable.js ${immutableClassName}.`
      );
    }

    if (typeof typeChecker !== 'function') {
      return new Error(
        `Invalid typeChecker supplied to \`${componentName}\` ` +
        `for propType \`${propFullName}\`, expected a function.`
      );
    }

    var propValues = propValue.toArray();
    for (var i = 0, len = propValues.length; i < len; i++) {
      var error = typeChecker(propValues, i, componentName, location, `${propFullName}[${i}]`, ...rest);
      if (error instanceof Error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

function createKeysTypeChecker(typeChecker) {

  function validate(props, propName, componentName, location, propFullName, ...rest) {
    var propValue = props[propName];
    if (typeof typeChecker !== 'function') {
      return new Error(
          `Invalid keysTypeChecker (optional second argument) supplied to \`${componentName}\` ` +
          `for propType \`${propFullName}\`, expected a function.`
      );
    }

    var keys = propValue.keySeq().toArray();
    for (var i = 0, len = keys.length; i < len; i++) {
      var error = typeChecker(keys, i, componentName, location, `${propFullName} -> key(${keys[i]})`, ...rest);
      if (error instanceof Error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

function createListOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'List', Immutable.List.isList);
}

function createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, immutableClassName, immutableClassTypeValidator) {
  function validate(...args) {
    return createIterableTypeChecker(valuesTypeChecker, immutableClassName, immutableClassTypeValidator)(...args)
        || keysTypeChecker && createKeysTypeChecker(keysTypeChecker)(...args)
  }

  return createChainableTypeChecker(validate);
}

function createMapOfTypeChecker(valuesTypeChecker, keysTypeChecker) {
  return createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, 'Map', Immutable.Map.isMap);
}

function createOrderedMapOfTypeChecker(valuesTypeChecker, keysTypeChecker) {
  return createMapOfTypeCheckerFactory(valuesTypeChecker, keysTypeChecker, 'OrderedMap', Immutable.OrderedMap.isOrderedMap);
}

function createSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Set', Immutable.Set.isSet);
}

function createOrderedSetOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'OrderedSet', Immutable.OrderedSet.isOrderedSet);
}

function createStackOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Stack', Immutable.Stack.isStack);
}

function createIterableOfTypeChecker(typeChecker) {
  return createIterableTypeChecker(typeChecker, 'Iterable', Immutable.Iterable.isIterable);
}

function createRecordOfTypeChecker(/*START:CUSTOM*/exact, /*END:CUSTOM*/recordKeys) {
  function validate(props, propName, componentName, location, propFullName, ...rest) {
    var propValue = props[propName];
    if (!(propValue instanceof Immutable.Record)) {
      var propType = getPropType(propValue);
      var locationName = location;
      return new Error(
        `Invalid ${locationName} \`${propFullName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected an Immutable.js Record.`
      );
    }
    // for (var key in recordKeys) {
    // START: customization
    const
        typeKeys = Object.keys(recordKeys),
        actualKeys = exact ? [...propValue.toSeq().keys()] : null,
        allKeys = exact ? typeKeys.concat(actualKeys) : typeKeys
    for (const key of allKeys) {
    // END: customization
      var checker = recordKeys[key];
      if (!checker) {
        // continue;
        // START: customization
        if (!exact) continue;
        return new Error(
          `Invalid ${location} \`${propFullName}\` key \`${key}\` `+
          `supplied to \`${componentName}\`.` +
          `\nBad Immutable.js Record: ${JSON.stringify(actualKeys, null, '  ')}` +
          `\nValid keys: ${JSON.stringify(typeKeys, null, '  ')}`
        );
        // END: customization
      }
      var mutablePropValue = propValue.toObject();
      var error = checker(mutablePropValue, key, componentName, location, `${propFullName}.${key}`, ...rest);
      if (error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

// there is some irony in the fact that shapeTypes is a standard hash and not an immutable collection
function createShapeTypeChecker(/*START:CUSTOM*/exact, /*END:CUSTOM*/shapeTypes, immutableClassName = 'Iterable', immutableClassTypeValidator = Immutable.Iterable.isIterable) {
  function validate(props, propName, componentName, location, propFullName, ...rest) {
    var propValue = props[propName];
    if (!immutableClassTypeValidator(propValue)) {
      var propType = getPropType(propValue);
      var locationName = location;
      return new Error(
        `Invalid ${locationName} \`${propFullName}\` of type \`${propType}\` ` +
        `supplied to \`${componentName}\`, expected an Immutable.js ${immutableClassName}.`
      );
    }
    var mutablePropValue = propValue.toObject();
    // for (var key in shapeTypes) {
    // START: customization
    const
        typeKeys = Object.keys(shapeTypes),
        actualKeys = exact ? Object.keys(mutablePropValue) : null,
        allKeys = exact ? typeKeys.concat(actualKeys) : typeKeys
    for (const key of allKeys) {
    // END: customization
      var checker = shapeTypes[key];
      if (!checker) {
        // continue;
        // START: customization
        if (!exact) continue;
        return new Error(
          `Invalid ${location} \`${propFullName}\` key \`${key}\` `+
          `supplied to \`${componentName}\`.` +
          `\nBad Immutable.js ${immutableClassName}: ${JSON.stringify(actualKeys, null, '  ')}` +
          `\nValid keys: ${JSON.stringify(typeKeys, null, '  ')}`
        );
        // END: customization
      }
      var error = checker(mutablePropValue, key, componentName, location, `${propFullName}.${key}`, ...rest);
      if (error) {
        return error;
      }
    }
  }
  return createChainableTypeChecker(validate);
}

function createShapeChecker(shapeTypes) {
  return createShapeTypeChecker(/*START:CUSTOM*/false, /*END:CUSTOM*/shapeTypes);
}

function createMapContainsChecker(shapeTypes) {
  return createShapeTypeChecker(/*START:CUSTOM*/false, /*END:CUSTOM*/shapeTypes, 'Map', Immutable.Map.isMap);
}

// START: customization
function createStrictShapeChecker(shapeTypes) {
  return createShapeTypeChecker(true, shapeTypes);
}
// like `contains`/`shape` but strict for specific fields
ImmutablePropTypes.exact = createStrictShapeChecker
// overwriting
ImmutablePropTypes.recordOf = createRecordOfTypeChecker.bind(null, false)
// own `exact` version of `recordOf`
ImmutablePropTypes.exactRecordOf = createRecordOfTypeChecker.bind(null, true)
// END: customization

// module.exports = ImmutablePropTypes;
export default ImmutablePropTypes
export {ImmutablePropTypes as ImmutablePropTypes}
