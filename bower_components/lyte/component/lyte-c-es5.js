/*Polyfills for functions not available in other browsers. */

/*Polyfill for Node.after
//Not supported out of the box in IE and Edge. 
//from: https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/after()/after().md */
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('after')) {
      return;
    }
    Object.defineProperty(item, 'after', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function after() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.parentNode.insertBefore(docFrag, this.nextSibling);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);


/*Polyfill for replaceWith. 
//Not supported out of the box for IE and Edge. */
function ReplaceWith(Ele) {
    var parent = this.parentNode,
        i = arguments.length,
        firstIsNode = +(parent && typeof Ele === 'object');
    if (!parent){
        return;
    } 
    
    while (i-- > firstIsNode){
      if (parent && typeof arguments[i] !== 'object'){
        arguments[i] = document.createTextNode(arguments[i]);
      } if (!parent && arguments[i].parentNode){
        arguments[i].parentNode.removeChild(arguments[i]);
        continue;
      }
      parent.insertBefore(this.previousSibling, arguments[i]);
    }
    if (firstIsNode){
        parent.replaceChild(this, Ele);
    } 
}
if (!Element.prototype.replaceWith){
    Element.prototype.replaceWith = ReplaceWith;
}
if (!CharacterData.prototype.replaceWith){
    CharacterData.prototype.replaceWith = ReplaceWith;
}
if (!DocumentType.prototype.replaceWith) {
    DocumentType.prototype.replaceWith = ReplaceWith;
}

/*Polyfill for startsWith
//Not supported out of the box for  IE */
if(!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

/*Polyfill for endsWith
//Not supported out of the box for  IE */
if(!String.prototype.endsWith){
    String.prototype.endsWith = function(searchStr, Position) {
        // This works much better than >= because
        // it compensates for NaN:
        if (!(Position < this.length)){
            Position = this.length;
        }
        else{
            Position |= 0; // round position
        }
        return this.substr(Position - searchStr.length,
                           searchStr.length) === searchStr;
    };
}var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Lyte = {};
Lyte.version = 1.0;
Lyte.registeredMixins = {};
Lyte.Mixin = {};
Lyte.debug = false;
Lyte.performance = false;
Lyte.toBeRegistered = [];
var consoleTime = [];

Lyte.Mixin.register = function (name, mixin) {
  Lyte.registeredMixins[name] = mixin;
};

Lyte.log = function (text, color) {
  if (Lyte.debug) {
    console.log((color ? "%c" : "") + text, 'color:' + color);
  }
};

Lyte.time = function (fn) {
  if (Lyte.performance) {
    var index;
    if ((index = consoleTime.indexOf(fn)) != -1) {
      consoleTime.splice(index, 1);
      console.timeEnd(fn);
    } else {
      consoleTime.push(fn);
      console.time(fn);
    }
  }
};

Lyte.isRecord = function (object) {
  if (object && object.$ && object.$.hasOwnProperty("isModified")) {
    return true;
  }
  return false;
};

Lyte.isComponent = function (object) {
  if (object && object.$node && object.__data) {
    return true;
  }
  return false;
};

Lyte.injectResources = function (files, every, completed) {
  if (files) {
    files = Array.isArray(files) ? files : [files];
    var filesLoaded = -files.length;
    files.forEach(function (file) {
      var tag,
          fileSplit = file.split('.'),
          type = fileSplit[fileSplit.length - 1],
          tags = { js: 'script', css: 'link' };
      tag = document.createElement(tags[type]);
      if (fileSplit.length == 1) {
        console.error('Type of file is not specified in injectResources.');
        return;
      }
      if (type == 'css') {
        tag.setAttribute('href', file);
        tag.setAttribute('type', "text/css");
        tag.setAttribute('rel', "stylesheet");
      } else {
        tag.setAttribute('src', file);
      }
      tag.onerror = tag.onload = function (event) {
        filesLoaded++;
        if (every) {
          every.call(this, event);
        }
        if (completed && filesLoaded == 0) {
          completed();
        }
      };
      document.head.appendChild(tag);
    });
  }
};

Lyte.checkProperty = function (property, dataVal, key, fieldVal, record) {
  switch (property) {
    case "type":
      if (Lyte.Transform.hasOwnProperty(fieldVal)) {
        if (Array.isArray(dataVal)) {
          if (Lyte.Transform[fieldVal].extends != "array") {
            return { code: "ERR03", message: Lyte.errorCodes.ERR03, expected: fieldVal };
          }
        } else if (Lyte.Transform[fieldVal].extends != (typeof dataVal === "undefined" ? "undefined" : _typeof(dataVal))) {
          return { code: "ERR03", message: Lyte.errorCodes.ERR03, expected: fieldVal };
        }
      } else if (Array.isArray(dataVal)) {
        if (fieldVal != "array") {
          return { code: "ERR03", message: Lyte.errorCodes.ERR03, expected: fieldVal };
        }
      } else if (fieldVal != (typeof dataVal === "undefined" ? "undefined" : _typeof(dataVal))) {
        return { code: "ERR03", message: Lyte.errorCodes.ERR03, expected: fieldVal };
      }
      break;
    case "maximum":
      if (typeof dataVal == "number" && dataVal > fieldVal) {
        return { code: "ERR04", message: Lyte.errorCodes.ERR04, expected: fieldVal };
      }
      break;
    case "minimum":
      if (typeof dataVal == "number" && dataVal < fieldVal) {
        return { code: "ERR05", message: Lyte.errorCodes.ERR05, expected: fieldVal };
      }
      break;
    case "maxLength":
    case "maxItems":
      if (dataVal.length > fieldVal) {
        return { code: "ERR06", message: Lyte.errorCodes.ERR06, expected: fieldVal };
      }
      break;
    case "minLength":
    case "minItems":
      if (dataVal.length < fieldVal) {
        return { code: "ERR07", message: Lyte.errorCodes.ERR07, expected: fieldVal };
      }
      break;
    case "pattern":
      if (typeof dataVal == "string" && !new RegExp(fieldVal).test(dataVal)) {
        return { code: "ERR08", message: Lyte.errorCodes.ERR08, expected: fieldVal };
      }
      break;
    case "uniqueItems":
      {
        if (Array.isArray(dataVal) && fieldVal) {
          var newArr = [];
          for (var i = 0; i < dataVal.length; i++) {
            var val = dataVal[i];
            if (newArr.indexOf(val) != -1) {
              return { code: "ERR09", message: Lyte.errorCodes.ERR09 };
            }
            newArr.push(val);
          }
        }
        break;
      }
    case "constant":
      if (Array.isArray(dataVal)) {
        var resp = dataVal.length == fieldVal.length && dataVal.every(function (v, i) {
          return v === fieldVal[i];
        });
        if (!resp) {
          return { code: "ERR10", message: Lyte.errorCodes.ERR10, expected: fieldVal };
        }
      } else if ((typeof dataVal === "undefined" ? "undefined" : _typeof(dataVal)) == "object") {
        var resp = store.adapter.$.compareObjects(dataVal, fieldVal);
        if (!resp) {
          return { code: "ERR10", message: Lyte.errorCodes.ERR10, expected: fieldVal };
        }
      } else if (dataVal != fieldVal) {
        return { code: "ERR10", message: Lyte.errorCodes.ERR10, expected: fieldVal };
      }
      break;
    case "items":
      {
        if (Array.isArray(dataVal)) {
          for (var i = 0; i < dataVal.length; i++) {
            for (var property in fieldVal) {
              var resp = Lyte.checkProperty(property, dataVal[i], i, fieldVal[property]);
              if (resp != true) {
                return resp;
              }
            }
          }
        }
        break;
      }
    case "properties":
      if ((typeof dataVal === "undefined" ? "undefined" : _typeof(dataVal)) == "object" && !Array.isArray(dataVal)) {
        for (var key in dataVal) {
          for (var property in fieldVal) {
            var resp = Lyte.checkProperty(property, dataVal[key], key, fieldVal[property]);
            if (resp != true) {
              return resp;
            }
          }
        }
      }
      break;
    case "validation":
      {
        var resp = Lyte.customValidator[fieldVal].apply(record, [key, dataVal]);
        if (resp != true) {
          return resp;
        }
      }
  }
  return true;
};

Lyte.types = ["string", "object", "number", "boolean", "array"];

Lyte.attr = function (type, opts) {
  if (opts == undefined) {
    opts = {};
  }
  if (this.types.indexOf(type) == -1 && !Lyte.Transform.hasOwnProperty(type)) {
    throw new Error("Not a valid field type - " + type);
  }
  opts.type = type;
  return opts;
};

Lyte.defineRelation = function (name, type, opts) {
  var relation = { type: "relation", relType: type, relatedTo: name };
  if (opts) {
    relation.opts = opts;
  }
  return relation;
};

Lyte.belongsTo = function (name, opts) {
  return this.defineRelation(name, "belongsTo", opts);
};

Lyte.hasMany = function (name, opts) {
  return this.defineRelation(name, "hasMany", opts);
};

Lyte.Transform = {};

Lyte.customValidator = {};

Lyte.registerDataType = function (fieldTypeName, properties) {
  if (this.Transform.hasOwnProperty(fieldTypeName)) {
    throw new Error("Custom Field Type - " + fieldTypeName + " -  already exists.");
  }
  if (properties.extends == undefined || Lyte.types.indexOf(properties.extends) == -1) {
    throw new Error("Not a valid field type - " + properties.extends);
  }
  this.Transform[fieldTypeName] = properties;
};

Lyte.registerValidator = function (customValidatorName, func) {
  if (this.customValidator.hasOwnProperty(customValidatorName)) {
    throw new Error("Custom Validator with name - " + customValidatorName + " - already exists");
  }
  this.customValidator[customValidatorName] = func;
};

Lyte.patterns = {
  email: /([A-Za-z0-9._%\-'+/]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,22})$|[\s]+/,
  url: /(^(ht|f)tp(s?):\/\/[0-9a-zA-Z][-.\w]*(:[0-9])*(\/?)([a-zA-Z0-9\-.?,:'/\\+=&amp;%$#_[\]@!()*;~]*)?$)/,
  ampm: /^(AM|PM|am|pm)$/,
  hour: /^(0?[0-9]|1[0-9]|2[0-4])$/,
  minute: /^(0?[0-9]|[1-5][0-9]|60)$/,
  boolean: /^(true|false|TRUE|FALSE)$/,
  alphaNumeric: /([a-zA-Z0-9])+/,
  alphabetsOnly: /([a-zA-Z])+/,
  numeric: /([0-9])+/,
  phoneNo: /^[0-9a-zA-Z+.()\-;\s]+$/
};

Lyte.validate = function (object, key, value, component) {
  var definition = component.__data[key];
  var isError = false;
  for (var defKey in definition) {
    isError = Lyte.checkProperty(defKey, value, key, definition[defKey], object);
    if (isError !== true) {
      return isError;
    }
  }
  return false;
};

Lyte.registerPattern = function (patternName, pattern) {
  this.patterns[patternName] = pattern;
};

Lyte.errorCodes = {
  ERR01: "Primary key cannot be modified", ERR02: "Mandatory field cannot be empty", ERR03: "Type of value does not match the specified data type", ERR04: "Value is greater than the maximum value allowed",
  ERR05: "Value is less than the minimum value allowed", ERR06: "Length of string/array is greater than the maximum limit allowed", ERR07: "Length of string/array is less than the minimum limit allowed",
  ERR08: "String does not match the specified pattern", ERR09: "Values in array are not unique", ERR10: "Value is not equal to the specified constant", ERR11: "Model of related field is not defined",
  ERR12: "Model of backward relation is not defined", ERR13: "Record not found", ERR14: "Model does not match the related field model", ERR15: "Error in creating a record as a relation",
  ERR16: "Record with primary key already exists", ERR17: "Value cannot be changed because record has been deleted", ERR18: "Action not defined", ERR19: "Model not defined",
  ERR20: "Key not specified", ERR21: "'belongsTo' relationship expects a single object/id", ERR22: "Type not specified for polymorphic relation", ERR23: "Primary Key value not present", ERR24: "Error while relating record"
};

Lyte.registeredGlobalEvents = {};
Lyte.triggerEvent = function () {
  var args = Array.prototype.slice.call(arguments, 1);
  var eventName = arguments[0];
  var s = this.registeredGlobalEvents[eventName];
  if (!s) {
    s = this.registeredGlobalEvents[eventName] = { "listeners": [] };
  } else {
    for (var i = 0; i < s.listeners.length; i++) {
      var func = s.listeners[i];
      if (func) {
        func.apply(this, args);
      }
    }
  }
  var customEvent = new CustomEvent(eventName, { "detail": args });
  document.dispatchEvent(customEvent);
};

Lyte.addEventListener = function (eventName, func) {
  if (typeof func !== "function") {
    console.error("Second parameter to LyteComponent.addGlobalEventListener() must be a function");
    return;
  }
  var s = this.registeredGlobalEvents[eventName];
  if (!s) {
    s = this.registeredGlobalEvents[eventName] = { "listeners": [] };
  }
  var d = s.listeners.push(func);
  return eventName + "-" + (d - 1);
};

Lyte.removeEventListener = function (id) {
  if (!id) {
    console.error("listener unique id not specified");
    return;
  }
  var globalId = id.split("-");
  var s = this.registeredGlobalEvents[globalId[0]];
  if (!s || !s.listeners[globalId[1]]) {
    console.error("No such listener registered");
    return;
  }
  s.listeners[globalId[1]] = null;
};

Lyte.deepCopyObject = function (obj) {
  var current,
      copies = [{ source: obj, target: Object.create(Object.getPrototypeOf(obj)) }],
      keys,
      propertyIndex,
      descriptor,
      nextSource,
      indexOf,
      sourceReferences = [obj];
  var cloneObject = copies[0].target,
      targetReferences = [cloneObject];
  while (current = copies.shift()) {
    keys = Object.getOwnPropertyNames(current.source);
    for (propertyIndex = 0; propertyIndex < keys.length; propertyIndex++) {
      descriptor = Object.getOwnPropertyDescriptor(current.source, keys[propertyIndex]);
      if (!descriptor.value || _typeof(descriptor.value) != "object") {
        Object.defineProperty(current.target, keys[propertyIndex], descriptor);
        continue;
      }
      nextSource = descriptor.value;
      descriptor.value = Array.isArray(nextSource) ? [] : Object.create(Object.getPrototypeOf(nextSource));
      indexOf = sourceReferences.indexOf(nextSource);
      if (indexOf != -1) {
        descriptor.value = targetReferences[indexOf];
        Object.defineProperty(current.target, keys[propertyIndex], descriptor);
        continue;
      }
      sourceReferences.push(nextSource);
      targetReferences.push(descriptor.value);
      Object.defineProperty(current.target, keys[propertyIndex], descriptor);
      copies.push({ source: nextSource, target: descriptor.value });
    }
  }
  return cloneObject;
};

Lyte.resolvePromises = function (promises) {
  if (Array.isArray(promises)) {
    return promiseArray(promises);
  } else if ((typeof promises === "undefined" ? "undefined" : _typeof(promises)) == "object") {
    return promiseHash(promises);
  }

  function promiseHash(promiseObj) {
    var actPromKeys = [],
        promises = [],
        promiseKeys = Object.keys(promiseObj);
    promiseKeys.forEach(function (key) {
      actPromKeys.push(key);
      promises.push(promiseObj[key]);
    });
    if (!promises.length) {
      return promiseObj;
    } else {
      var obj = {},
          promise = new Promise(function (resolve, reject) {
        Promise.all(promises).then(function (data) {
          data.forEach(function (dataVal, index) {
            obj[actPromKeys[index]] = dataVal;
          });
          resolve(obj);
        }, function (err) {
          reject(err);
          console.error(err);
        });
      });
      return promise;
    }
  }

  function promiseArray(promiseArray) {
    var array = [];
    var promise = new Promise(function (resolve, reject) {
      Promise.all(promiseArray).then(function (data) {
        promiseArray.forEach(function (key, index) {
          array[index] = data[index];
        });
        resolve(array);
      }, function (err) {
        reject(err);
        console.error(err);
      });
    });
    return promise;
  }
};

Lyte.createCustomElement = function (customElementName, definition) {
  var constructor = definition.constructor;
  delete definition.constructor;
  this.defProperty = function (obj, key, val) {
    var obj1 = {};
    if (val.get) {
      obj1.get = val.get;
    }
    if (val.set) {
      obj1.set = val.set;
    }
    Object.defineProperty(obj, key, obj1);
  };

  var classDef = function (_HTMLElement) {
    _inherits(classDef, _HTMLElement);

    function classDef() {
      _classCallCheck(this, classDef);

      var _this = _possibleConstructorReturn(this, (classDef.__proto__ || Object.getPrototypeOf(classDef)).call(this));

      if (constructor) {
        constructor.apply(_this, Array.from(arguments));
      }
      return _this;
    }

    return classDef;
  }(HTMLElement);

  var staticDef = definition.static;
  if (staticDef) {
    for (var key in staticDef) {
      if (_typeof(staticDef[key]) === "object") {
        this.defProperty(classDef, key, staticDef[key]);
      } else {
        Object.defineProperty(classDef, key, {
          value: staticDef[key]
        });
      }
    }
    delete definition.static;
  }
  for (var key in definition) {
    if (_typeof(definition[key]) === "object") {
      this.defProperty(classDef.prototype, key, definition[key]);
    } else {
      Object.defineProperty(classDef.prototype, key, { value: definition[key] });
    }
  }
  definition.static = staticDef[key];
  definition.constructor = constructor;
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // document is already ready to go
    customElements.define(customElementName, classDef);
  } else {
    Lyte.toBeRegistered.push({ name: customElementName, def: classDef });
  }
};

function domContentLoaded1() {
  var comp = Lyte.toBeRegistered;
  if (comp.length) {
    for (var j = 0; j < comp.length; j++) {
      customElements.define(comp[j].name, comp[j].def);
    }
    Lyte.toBeRegistered = [];
  }
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  domContentLoaded1();
} else {
  document.addEventListener("DOMContentLoaded", function (e) {
    domContentLoaded1();
  }, true);
}var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!window.Lyte) {
    console.error("Lyte is not defined");
}
//temporary fix for IE 11
if (navigator.userAgent.match(/rv:11/)) {
    window.action = function () {
        return;
    };
}
Lyte.Component = {};
Lyte.arrayUtils = function () {
    return LyteComponent.arrayFunctions.apply(LyteComponent, arguments);
};
Lyte.objectUtils = function () {
    return LyteComponent.objectFunctions.apply(LyteComponent, arguments);
};

Lyte.Component.register = function () {
    LyteComponent.registerComponent.apply(LyteComponent, arguments);
};

Lyte.Component.registerHelper = function () {
    LyteComponent.registerHelper.apply(LyteComponent, arguments);
};
Lyte.Component.set = function () {
    LyteComponent.set.apply(LyteComponent, arguments);
};
Lyte.Component.registeredHelpers = {};
Lyte.Component.registeredComponents = {};
function noop() {}
Lyte.Component.unregisterComponent = function (componentName) {
    if (Lyte.Component.registeredComponents[componentName]) {
        var comp = LyteComponent._registeredComponents[componentName];
        if (comp.activeInstances > 0) {
            console.warn("There are active instances of the component " + componentName + " and hence cannot be unregistered");
        } else {
            //Do the unregisteration here
            comp._properties = {};
            comp.component = null;
            comp._mixins = null;
            comp._actions = null;
            comp._template = null;
            comp._dynamicNodes = null;
            comp._callBacks = {};
            comp._observers = [];
            comp._data = undefined;
            comp._methods = {};
            comp.prototype.get = noop;
            comp.prototype.set = noop;
            delete Lyte.Component.registeredComponents[componentName];
        }
    } else {
        console.warn("Component " + componentName + " not yet registered");
    }
};

var elementPrototype = typeof HTMLElement !== "undefined" ? HTMLElement : Element;

function onDomContentForLyte() {
    document.body.appendChild(LyteComponent.lyteComponentsDiv);
    var bodyEvents = ["focus", "focusin", "focusout", "resize", "scroll", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change", "select", "submit", "keydown", "keypress", "keyup", "contextmenu"];
    for (var _i = 0; _i < bodyEvents.length; _i++) {
        var evnt = bodyEvents[_i];
        document.body.addEventListener(evnt, globalEventHandler, true);
    }
    var comp = LyteComponent.toBeRegistered;
    if (comp.length) {
        for (var j = 0; j < comp.length; j++) {
            customElements.define(comp[j].name, comp[j].def);
        }
        LyteComponent.toBeRegistered = [];
    }
}

document.addEventListener("change", function (event) {
    var target = event.target || event.srcElement;
    if (!target._attributeDetails) {
        return;
    }
    var attributeName = "value";
    if (target.type === "checkbox" || target.type === "radio") {
        attributeName = "checked";
    }
    var contextSwitchArray = [];
    var attrNode;
    var attrDetail = target._attributeDetails[attributeName];
    if (!attrDetail || !attrDetail.isLbind) {
        return;
    }
    //attrNode = (attributeName === "checked") ? target._attributeDetails[attributeName].bindedNode : target.getAttributeNode(attributeName);
    var callee = target;
    if (!target._callee) {
        while (callee && !LyteComponent.isCustomElement(callee) && callee.tagName !== "LYTE-YIELD") {
            if (callee.tagName === "BODY") {
                callee = null;
                break;
            }
            callee = callee.parentNode;
        }
        if (callee && callee.tagName === "LYTE-YIELD") {
            target._callee = callee._callee._callee;
        } else {
            target._callee = callee;
        }
    }
    var self = target._callee;
    if (target) {
        LyteComponent.newAddContext(target, contextSwitchArray);
    }
    var obj = LyteComponent.getNew(self.component.data, attrDetail.dynamicValue);
    LyteComponent.set(obj.context, obj.lastKey, target[attributeName]);
    if (target) {
        LyteComponent.newRemoveContext(target, contextSwitchArray);
    }
});
var globalEventHandler = function globalEventHandler(ev) {
    var evnt = ev.type;
    var target = ev.target,
        toRemove;
    if (!window.event) {
        toRemove = true;
        window.event = ev;
    }
    while (!target.getAttribute(evnt) && target.tagName != "BODY") {
        target = target.parentNode;
    }
    var callee = target;
    if (!target._callee) {
        while (callee && !LyteComponent.isCustomElement(callee) && callee.tagName !== "LYTE-YIELD") {
            if (callee.tagName === "BODY") {
                callee = null;
                break;
            }
            callee = callee.parentNode;
        }
        if (callee && callee.tagName === "LYTE-YIELD") {
            target._callee = callee._callee._callee;
        } else {
            target._callee = callee === target ? undefined : callee;
        }
    }
    if (target._evBoundEvents && target._evBoundEvents[evnt]) {
        //Not needed - but check and remove
        var actions = target._callee ? target._callee.constructor._actions : target.constructor._actions;
        //let actions = target.constructor._actions;
        var actObj = target._evBoundEvents[evnt];
        var cloneActObj = Lyte.deepCopyObject(actObj);
        cloneActObj.args.shift();
        LyteComponent.throwAction.call(target, target, evnt, cloneActObj, undefined, undefined, target, ev);
    } else if (target.getAttribute(evnt)) {
        var _actions = target._callee.constructor._actions;
        var func = target.getAttribute(evnt).split(" => ")[1];
        var _actObj = target._boundEvents[evnt];
        var _cloneActObj = Lyte.deepCopyObject(_actObj);
        _cloneActObj.args.shift();
        LyteComponent.throwAction.call(target._callee, target._callee, evnt, _cloneActObj, undefined, undefined, target, ev);
    }
    if (target.tagName === "LABEL") {
        var input = target.querySelector("input");
        if (input.getAttribute(evnt)) {
            var _actions2 = target._callee.constructor._actions;
            var _func = input.getAttribute(evnt).split(" => ")[1];
            //	let actObj = target._callee.constructor.getHelper(func);
            var _actObj2 = target._boundEvents[evnt];
            var args = Array.from(_actObj2.args);
            var _cloneActObj2 = Object.assign({}, _actObj2);
            args.shift();
            _cloneActObj2.args = args;
            LyteComponent.throwAction.call(target._callee, target._callee, evnt, _cloneActObj2, undefined, undefined, input, ev);
        }
    }
    if (toRemove) {
        window.event = undefined;
    }
};

var LyteYield = function (_HTMLElement) {
    _inherits(LyteYield, _HTMLElement);

    function LyteYield() {
        _classCallCheck(this, LyteYield);

        return _possibleConstructorReturn(this, (LyteYield.__proto__ || Object.getPrototypeOf(LyteYield)).apply(this, arguments));
    }

    _createClass(LyteYield, [{
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
            if (LyteComponent.ignoreDisconnect) {
                return;
            }
            var nodeContextSwitchArray = [];
            LyteComponent.newAddContext(this, nodeContextSwitchArray);
            LyteComponent.removeSelectedBindingDeep(this._properties, this.component.data);
            var node = this._registerYield;
            if (!node) {
                return;
            }
            var toAppendContextSwitchArray = [];
            //newContext not needed
            LyteComponent.newAddContext(node, toAppendContextSwitchArray);
            for (var key in this._dynamicProperty) {
                if (this._dynamicProperty[key].isActualNode) {
                    this._dynamicProperty[key].isActualNode._helperNodes.delete(this);
                } else {
                    if (node._callee.getProperty(key)._helperNodes) {
                        node._callee.getProperty(key)._helperNodes.delete(this);
                    }
                }
            }
            this._dynamicProperty = {};
            for (var _i2 = 0; _i2 < this._helpers.length; _i2++) {
                node._callee.removeHelpers(this._helpers[_i2]);
            }
            this._helpers = [];
            LyteComponent.newRemoveContext(node, toAppendContextSwitchArray);
            LyteComponent.newRemoveContext(this, nodeContextSwitchArray);
        }
    }, {
        key: "getProperty",
        value: function getProperty(key) {
            var arr = key.split('.');
            var property = this;
            if (!property._properties[arr[0]]) {
                property._properties[arr[0]] = {};
            }
            property = property._properties[arr[0]];

            Object.defineProperty(property, '_path', { enumerable: false, value: arr[0] });
            for (var _i3 = 1; _i3 < arr.length; _i3++) {
                if (!property[arr[_i3]]) {
                    property[arr[_i3]] = {};
                    Object.defineProperty(property[arr[_i3]], '_path', { enumerable: false, value: property._path + "." + arr[_i3] });
                }
                property = property[arr[_i3]];
            }
            return property;
        }
    }]);

    return LyteYield;
}(HTMLElement);

customElements.define("lyte-yield", LyteYield);

var customElementPrototype = function (_elementPrototype) {
    _inherits(customElementPrototype, _elementPrototype);

    function customElementPrototype() {
        _classCallCheck(this, customElementPrototype);

        var _this2 = _possibleConstructorReturn(this, (customElementPrototype.__proto__ || Object.getPrototypeOf(customElementPrototype)).call(this));

        if (!Lyte.Component.registeredComponents[_this2.localName]) {
            return _possibleConstructorReturn(_this2);
        }
        _this2.constructor.activeInstances++;
        _this2.component = new _this2.constructor.component();
        _this2.data = {};
        _this2._properties = {};
        _this2.component.methods = {};
        //        this.component.data = this.constructor._data ? this.constructor._data() : {};
        //comment the following two when return cli update is done.
        _this2.component.data = {};
        var data = _this2.constructor._data ? _this2.constructor._data() : {};
        for (var key in data) {
            _this2.component.data[key] = data[key].default;
        }
        _this2.component.data.errors = {};
        _this2.component.__data = data;
        for (var _key in _this2.constructor._methods) {
            _this2.component.methods[_key] = _this2.constructor._methods[_key];
        }
        Object.defineProperty(_this2.component.data, '__component__', {
            value: _this2,
            configurable: true,
            writable: true,
            enumerable: false
        });
        _this2.component.$node = _this2;
        _this2.callback("constructor");
        _this2._actions = _this2._actions ? _this2._actions : {};
        _this2._callee = _this2._callee || _this2.getCallee(_this2.parentNode);
        return _this2;
    }

    _createClass(customElementPrototype, [{
        key: "ltProp",
        value: function ltProp() {
            var argsLength = arguments.length;
            var arg0 = arguments[0];
            if (!arg0) {
                //Read all the values
                var obj = {};
                for (var key in this.component.data) {
                    if (key.startsWith("ltProp")) {
                        var objKey = key.substring(6);
                        objKey = LyteComponent.String.lowerCaseFirstLetter(objKey);
                        obj[objKey] = this.component.data[key];
                    }
                }
                return obj;
            } else if (typeof arg0 === "string") {
                if (argsLength > 1) {
                    //Set a value
                    this.set("ltProp" + LyteComponent.String.upperCaseFirstLetter(arg0), arguments[1]);
                } else {
                    //Read a value
                    var actKey = "ltProp" + LyteComponent.String.upperCaseFirstLetter(arg0);
                    return this.component.data[actKey];
                }
            } else if ((typeof arg0 === "undefined" ? "undefined" : _typeof(arg0)) === "object") {
                //Write a set of values
                for (var _key2 in arg0) {
                    var _objKey = "ltProp" + LyteComponent.String.upperCaseFirstLetter(_key2);
                    this.set(_objKey, arg0[_key2]);
                }
            }
        }
    }, {
        key: "getMethods",
        value: function getMethods(arg0) {
            return this.component.getMethods(arg0);
        }
    }, {
        key: "setMethods",
        value: function setMethods(arg0, arg1) {
            return this.component.setMethods(arg0, arg1);
        }
    }, {
        key: "getData",
        value: function getData(arg0) {
            return this.component.getData(arg0);
        }
    }, {
        key: "setData",
        value: function setData(arg0, arg1) {
            return this.component.setData(arg0, arg1);
        }
    }, {
        key: "getCallee",
        value: function getCallee(callee) {
            while (callee && !LyteComponent.isCustomElement(callee) && callee.tagName !== "LYTE-YIELD") {
                if (callee.tagName === "BODY") {
                    callee = null;
                    break;
                }
                callee = callee.parentNode;
            }
            if (callee && callee.tagName === "LYTE-YIELD") {
                return callee._callee._callee;
            }
            return this === callee ? undefined : callee;
        }
    }, {
        key: "afterConnected",
        value: function afterConnected() {
            //initProperties is used because, we may have cases where the component wouldn't have been registered but 
            //it would be in dom already with some attributes. In those cases we can store the data in _initProperties as key, value.
            //These properties would then be applied to the component, once it gets instantiated. 

            //This is done, in order to solve when on a string value update of an if helper, the binding in the true or false case must be established. 
            //Without this, we won't establish the _properties in the component to the actual Data. 

            var obsattr = this.constructor._observedAttributes;
            for (var _i4 = 0; _i4 < obsattr.length; _i4++) {
                var key = obsattr[_i4];
                var prop = this.getProperty(key);
                Object.defineProperty(prop, '__fromComponent', {
                    value: true,
                    enumerable: false
                });
            }
            this.getProperty("errors");
            if (this._initProperties) {
                var initProperties = this._initProperties;
                for (var _key3 in initProperties) {
                    this.component.data[_key3] = initProperties[_key3];
                }
                this._initProperties = undefined;
            }
            if (this._initMethods) {
                var initMethods = this._initMethods;
                for (var _key4 in initMethods) {
                    this.component.methods[_key4] = initMethods[_key4];
                }
                this._initMethods = undefined;
            }
            this.callback('init');
            this.onCallBack('init');
            this.registerYields();
            var content = this.renderNodes(this.constructor._template.content, this.constructor._dynamicNodes, undefined, undefined);
            return content;
        }
        //This is the function where the actual rendering takes place. 
        //It takes the template, finds the actual dynamic nodes uwing dynamicNodes argument and then binds each node with the associated
        //property by calling bindNode. 

    }, {
        key: "getDynamicNode",
        value: function getDynamicNode(content, positions) {
            var dynamicN = content;
            for (var i = 0; i < positions.length; i++) {
                dynamicN = dynamicN.tagName != "TEMPLATE" ? dynamicN.childNodes[positions[i]] : dynamicN.content.childNodes[positions[i]];
            }
            return dynamicN;
        }
        //RN

    }, {
        key: "renderNodes",
        value: function renderNodes(toAppend, dynamicNodes, helperNode, options, establishBindings, returnVal) {
            options = options || {};
            var content = void 0;
            if (navigator.userAgent.match(/rv:11/)) {
                var newFrag = toAppend.cloneNode(true, "lyte");
                this.constructor.splitTextNodes(newFrag);
                content = newFrag;
            } else {
                content = toAppend.cloneNode(true, "lyte");
            }
            var updateHelpers = [],
                processLast = [],
                helperFunc = void 0,
                stoppedNode = void 0;
            for (var _i5 = 0; _i5 < dynamicNodes.length; _i5++) {
                var info = dynamicNodes[_i5],
                    type = info.type,
                    pos = info.position,
                    dynamicN = content,
                    helperInfo = void 0;
                dynamicN = this.getDynamicNode(dynamicN, pos);
                if (type === "componentDynamic") {
                    if (options.node) {
                        dynamicN._contextSwitchInfo = options;
                    } else if (helperNode) {
                        dynamicN._contextSwitchInfo = helperNode._contextSwitchInfo;
                    }
                } else if (type === "text") {
                    this.bindNode(dynamicN, undefined, helperNode, options, dynamicNodes[_i5], processLast, establishBindings);
                } else if (type === "attr") {
                    dynamicN._attributeDetails = info.attr;
                    if (dynamicN.nodeName === "LYTE-YIELD") {
                        dynamicN._callee = this;
                        dynamicN.component = {};
                        dynamicN.component.data = {};
                        Object.defineProperty(dynamicN.component.data, "__component__", {
                            value: dynamicN,
                            configurable: true,
                            writable: true,
                            enumerable: false
                        });
                        dynamicN._properties = {};
                        for (var j = 0; j < dynamicN.attributes.length; j++) {
                            var attr = dynamicN.attributes[j];
                            if (attr.nodeName !== "is" && attr.nodeName !== "yield-name") {
                                dynamicN._properties[LyteComponent.String.toCamelCase(attr.nodeName)] = {};
                            }
                        }
                    }
                    var toBeRemoved = [];
                    for (var key in info.attr) {
                        var _attr = info.attr[key];
                        var attrName = key;
                        if (_attr && (_attr.dynamicValue || _attr.helperInfo)) {
                            if (options.node) {
                                dynamicN._contextSwitchInfo = options;
                            } else if (helperNode) {
                                dynamicN._contextSwitchInfo = helperNode._contextSwitchInfo;
                            }
                            if (_attr.globalEvent) {
                                dynamicN._boundEvents = dynamicN._boundEvents || {};
                                var actionName = _attr.helperInfo.args[0];
                                var boundName = void 0;
                                if (actionName.startsWith('"') || actionName.startsWith("'")) {
                                    boundName = actionName.substring(1, actionName.length - 1);
                                } else {
                                    console.warn("Deprecation warning. Action name " + actionName + " must be in quotes");
                                    boundName = actionName;
                                }
                                dynamicN._boundEvents[attrName] = { "name": boundName, "args": _attr.helperInfo.args };
                            } else {
                                /*this.bindNode(dynamicN.getAttributeNode(attrName), toBeRemoved, helperNode, options, attr, undefined, establishBindings);
                                 */
                                var node = this.bindNode(dynamicN.getAttributeNode(attrName), toBeRemoved, helperNode, options, _attr, undefined, establishBindings);
                                if (node !== dynamicN.getAttributeNode(attrName)) {
                                    dynamicN._removedAttributes = dynamicN._removedAttributes || {};
                                    dynamicN._removedAttributes[attrName] = node;
                                }
                            }
                        }
                    }
                    //Added now
                    if (info.attr && Object.keys(info.attr).length) {
                        dynamicN._callee = this;
                    }
                    for (var d = 0; d < toBeRemoved.length; d++) {
                        dynamicN.removeAttribute(toBeRemoved[d]);
                    }
                } else if (/^(for|forIn|component)$/.test(type)) {
                    if (options.node) {
                        dynamicN._contextSwitchInfo = options;
                    } else if (helperNode) {
                        dynamicN._contextSwitchInfo = helperNode._contextSwitchInfo;
                    }
                    dynamicN._dynamicNodes = info.dynamicNodes;
                    var _returnVal = void 0;
                    switch (type) {
                        case "for":
                            _returnVal = this.updateForHelper(dynamicN, { "type": "default" }, options.node ? options : undefined);
                            break;
                        case "forIn":
                            _returnVal = this.updateForInHelper(dynamicN, { "type": "default" }, options.node ? options : undefined);
                            break;
                        case "component":
                            _returnVal = this.updateDynamicComponent(dynamicN, false, options.node ? options : undefined);
                    }
                    if (_returnVal) {
                        updateHelpers.push(_returnVal);
                    }
                } else if (/^(if|switch)$/.test(type)) {
                    dynamicN._cases = info.cases;
                    dynamicN._default = info.default;
                    if (options.node) {
                        dynamicN._contextSwitchInfo = options;
                    } else if (helperNode) {
                        dynamicN._contextSwitchInfo = helperNode._contextSwitchInfo;
                    }
                    var _returnVal2 = this.updateSwitchHelper(type, dynamicN, options.node ? options : undefined);
                    if (_returnVal2) {
                        updateHelpers.push(_returnVal2);
                        var isBreak = _returnVal2.toAppendMain.querySelector("template[is=break]");
                        if (isBreak) {
                            dynamicN._isStopped = "break";
                            content = this.constructor.getTrimmedContent(content, info.position, undefined);
                            stoppedNode = info.position;
                            break;
                        }
                        var isContinue = _returnVal2.toAppendMain.querySelector("template[is=continue]");
                        if (isContinue) {
                            dynamicN._isStopped = "continue";
                            content = this.constructor.getTrimmedContent(content, info.position, undefined);
                            //                		stoppedNode = info.position;
                            break;
                        }
                    }
                } else if (type === "registerYield") {
                    dynamicN._dynamicNodes = info.dynamicNodes;
                    //                updateHelpers.push(dynamicN);
                    if (options.node) {
                        dynamicN._contextSwitchInfo = options;
                    } else if (helperNode) {
                        dynamicN._contextSwitchInfo = helperNode._contextSwitchInfo;
                    }
                    //Added now                
                    dynamicN._callee = this;
                } else if (type === "insertYield") {
                    if (options.node) {
                        dynamicN._contextSwitchInfo = options;
                    } else if (helperNode) {
                        dynamicN._contextSwitchInfo = helperNode._contextSwitchInfo;
                    }
                    dynamicN.component = dynamicN.component || { "data": {} };
                    dynamicN._properties = dynamicN._properties || {};
                    this.updateYield(dynamicN, false, options.node ? options : undefined);
                }
            }
            for (var _i6 = 0; _i6 < processLast.length; _i6++) {
                var dynamicPosition = processLast[_i6].dynamicPositions;
                var processNode = dynamicPosition.initialNode;
                var nodeValue = dynamicPosition.dynamicNodeValue;
                var childLen = nodeValue.childNodes.length;
                if (!childLen) {
                    nodeValue.appendChild(document.createTextNode(""));
                    childLen = 1;
                }
                var startingNode = nodeValue.childNodes[0];
                processNode.replaceWith.apply(processNode, nodeValue.childNodes);
                processLast[_i6].dynamicPositions = { startingNode: startingNode, length: childLen };
            }
            if (stoppedNode) {
                returnVal = returnVal || {};
                returnVal.stop = true;
            }
            if (helperNode) {
                if (options.type) {
                    helperNode._helpers[options.itemIndex] = updateHelpers;
                    return content;
                } else {
                    helperNode._helpers = updateHelpers;
                    return content;
                }
            }
            this.executeBlockHelpers(updateHelpers);
            return content;
        }
    }, {
        key: "executeBlockHelpers",
        value: function executeBlockHelpers(updateHelpers, node) {
            for (var _i7 = 0; _i7 < updateHelpers.length; _i7++) {
                updateHelpers[_i7].lastNode.parentNode.insertBefore(updateHelpers[_i7].toAppendMain, updateHelpers[_i7].lastNode);
                updateHelpers[_i7] = updateHelpers[_i7].lastNode;
                //updateHelpers[i]._parentIf = node;
                //	    		if(!updateHelpers[i]._contextSwitchInfo && node) {
                //	    			updateHelpers[i]._contextSwitchInfo = node._contextSwitchInfo;
                //	    		}
            }
        }
    }, {
        key: "updateBlockHelpers",
        value: function updateBlockHelpers(updateHelpers, contextSwitchInfo) {
            for (var _i8 = 0; _i8 < updateHelpers.length; _i8++) {
                switch (updateHelpers[_i8].getAttribute('is')) {
                    case "for":
                        this.updateForHelper(updateHelpers[_i8], { "type": "default" }, contextSwitchInfo);
                        break;
                    case "if":
                        this.updateSwitchHelper("if", updateHelpers[_i8], contextSwitchInfo);
                        break;
                    case "forIn":
                        this.updateForInHelper(updateHelpers[_i8], { "type": "default" }, contextSwitchInfo);
                        break;
                    case "switch":
                        this.updateSwitchHelper("switch", updateHelpers[_i8], contextSwitchInfo);
                        break;
                    case "component":
                        this.updateDynamicComponent(updateHelpers[_i8], false, contextSwitchInfo);
                        break;
                    case "insertYield":
                        //              this.updateYield(updateHelpers[i], false, contextSwitchInfo);
                        break;
                    case "yield":
                    case "registerYield":
                        if (contextSwitchInfo) {
                            updateHelpers[_i8]._contextSwitchInfo = contextSwitchInfo;
                        }
                        break;
                    default:
                        if (updateHelpers[_i8].tagName === "LYTE-YIELD") {
                            this.updateYield(updateHelpers[_i8], false, contextSwitchInfo);
                        }

                }
            }
        }
        //AttributeChangedCallback will be called for the attributes mentioned in the this._observedAttributes array. 

    }, {
        key: "attributeChangedCallback",


        //Callback from browser, whenever any of the observed attribute changes. 
        //We call the component set, in order to affect the related changes. 
        value: function attributeChangedCallback(attr, oldValue, newValue) {
            if (this.constructor._observedMethodAttributes && this.constructor._observedMethodAttributes[attr]) {
                return;
            }
            if (attr === "lt-prop") {
                var lyteProps = newValue;
                if (lyteProps) {
                    try {
                        lyteProps = JSON.parse(lyteProps);
                        for (var key in lyteProps) {
                            var actKey = "ltProp" + LyteComponent.String.upperCaseFirstLetter(key);
                            this.set(actKey, lyteProps[key]);
                        }
                    } catch (e) {
                        console.error("Error while parsing lt-data");
                    }
                }
                return;
            }
            if (newValue === null || oldValue === newValue) {
                return;
            }
            var actualAttr = LyteComponent.String.toCamelCase(attr);
            var dataType = this.component.__data[actualAttr].type;
            switch (dataType) {
                case "boolean":
                    {
                        if (!newValue || newValue === "false") {
                            newValue = false;
                        } else {
                            newValue = true;
                        }
                    }
                    break;
                case "object":
                    try {
                        newValue = JSON.parse(newValue);
                        if (!(newValue instanceof Object)) {
                            console.warn("data type of the value provided for attribute " + attr + " of " + this + " is not valid");
                        }
                    } catch (e) {
                        console.warn("attribute " + attr + " is not a valid JSON string.");
                        return;
                    }
                    break;
                case "array":
                    try {
                        newValue = JSON.parse(newValue);
                        if (!(newValue instanceof Array)) {
                            console.warn("data type of the value provided for attribute " + attr + " of " + this + " is not valid");
                        }
                    } catch (e) {
                        console.warn("attribute " + attr + " is not a valid JSON string.");
                        return;
                    }
                    break;
                case "number":
                    {
                        var numValue = +newValue;
                        if (newValue === numValue + "") {
                            newValue = numValue;
                        } else {
                            console.warn("data type of the value provided for attribute " + attr + " of " + this + " is not valid");
                            return;
                        }
                    }
                    break;
            }
            //newValue = newValue.startsWith("boolean:")? (newValue.substring(newValue.indexOf(":") + 1) ==="true"? true: false) : newValue;
            if (this.component.data[actualAttr] !== newValue) {
                //this.set(actualAttr, typeof newValue === "object" ? JSON.parse(newValue): newValue);
                this.set(actualAttr, newValue);
            }
        }

        //Used to remove helpers of specific index in a for helper. 

    }, {
        key: "removeHelpersSpecificIndex",
        value: function removeHelpersSpecificIndex(node, index) {
            if (node._helpers[index]) {
                for (var j = 0; j < node._helpers[index].length; j++) {
                    this.removeHelpers(node._helpers[index][j]);
                }
            }
            if (node._forContent[index]) {
                for (var _i9 = 0; _i9 < node._forContent[index].length; _i9++) {
                    node._forContent[index][_i9].remove();
                }
                node._items[index] = { "_dynamicProperty": {}, "itemProperty": {}, "indexProperty": {} };
            }
        }
        //Used to remove all the helpers within an helper. 

    }, {
        key: "removeHelpers",
        value: function removeHelpers(node, update) {
            var parent = void 0;
            var contextSwitchArray = [];
            LyteComponent.newAddContext(node, contextSwitchArray);
            if (node._forContent) {
                if (node.getAttribute("is") === "for") {
                    if (node._helpers) {
                        for (var _i10 = 0; _i10 < node._helpers.length; _i10++) {
                            for (var j = 0; j < node._helpers[_i10].length; j++) {
                                this.removeHelpers(node._helpers[_i10][j]);
                            }
                            node._helpers[_i10] = [];
                        }
                    }
                    for (var s = 0; s < node._forContent.length; s++) {
                        for (var _i11 = 0; _i11 < node._forContent[s].length; _i11++) {
                            node._forContent[s][_i11].remove();
                        }
                    }
                    var key = node.getAttribute("item");
                    if (node._items.length) {
                        var prop = node._items[0].itemProperty;
                        var dynProp = node._items[0]._dynamicProperty;
                        for (var dP in dynProp) {
                            var property = this.getProperty(dP);
                            if (property._helperNodes) {
                                property._helperNodes.delete(node);
                            }
                        }
                        if (prop) {
                            for (var _i12 = 0; _i12 < node._items.length; _i12++) {
                                this.removeBindings(_defineProperty({}, key, node._items[_i12].itemProperty), _defineProperty({}, key, node._attributes.items[_i12]));
                            }
                        }
                    }
                    if (!update) {
                        if (node._actualBinding) {
                            if (node._attributes.items && node._attributes.items._bindings && node._actualBinding._createdBinding) {
                                node._attributes.items._bindings.delete(node._actualBinding);
                            }
                            if (node._actualBinding._forHelpers) {
                                node._actualBinding._forHelpers.delete(node);
                            }
                            if (node._removedAttributes && node._removedAttributes.items && node._removedAttributes.items._multipleProperty) {
                                node._removedAttributes.items._multipleProperty.actProp._forHelpers.delete(node);
                            }
                        }
                    }
                    node._items = [];
                } else {
                    if (node._helpers) {
                        var keys = Object.keys(node._helpers);
                        for (var _i13 = 0; _i13 < keys.length; _i13++) {
                            for (var _j = 0; _j < node._helpers[keys[_i13]].length; _j++) {
                                this.removeHelpers(node._helpers[keys[_i13]][_j]);
                            }
                            node._helpers[keys[_i13]] = [];
                        }
                    }
                    for (var ind in node._forContent) {
                        for (var _i14 = 0; _i14 < node._forContent[ind].length; _i14++) {
                            node._forContent[ind][_i14].remove();
                        }
                    }
                    var items = node._items;
                    var _key5 = node.getAttribute("key");
                    for (var index in items) {
                        var item = items[index];
                        var _prop = item.itemProperty;
                        var dynamicProp = item._dynamicProperty;
                        for (var _dP in dynamicProp) {
                            var _property = this.getProperty(_dP);
                            if (_property._helperNodes) {
                                _property._helperNodes.delete(node);
                            }
                        }
                        if (_prop) {
                            for (var _index in node._items) {
                                this.removeBindings(_defineProperty({}, _key5, node._items[_index].itemProperty), _defineProperty({}, _key5, node._attributes.object[_index]));
                            }
                        }
                    }
                    if (!update) {
                        if (node._actualBinding) {
                            if (node._attributes.object && node._attributes.object._bindings && node._actualBinding._createdBinding) {
                                node._attributes.object._bindings.delete(node._actualBinding);
                            }
                            if (node._actualBinding._forHelpers) {
                                node._actualBinding._forHelpers.delete(node);
                            }
                        }
                        if (node._removedAttributes.items && node._removedAttributes.items._multipleProperty) {
                            node._removedAttributes.items._multipleProperty.actProp._forHelpers.delete(node);
                        }
                        if (node._propBindingObject && node._attributes.object && node._attributes.object._bindings) {
                            node._attributes.object._bindings.delete(node._propBindingObject);
                        }
                    }
                    node._items = {};
                }
            } else if (node._caseContent || node._yieldContent) {
                if (node._helpers) {
                    for (var _j2 = 0; _j2 < node._helpers.length; _j2++) {
                        this.removeHelpers(node._helpers[_j2]);
                    }
                    node._helpers = [];
                }
                if (node._caseContent) {
                    for (var _i15 = 0; _i15 < node._caseContent.length; _i15++) {
                        node._caseContent[_i15].remove();
                    }
                    for (var _key6 in node._dynamicProperty) {
                        if (node._dynamicProperty[_key6].isActualNode) {
                            node._dynamicProperty[_key6].isActualNode._helperNodes.delete(node);
                        } else {
                            if (this.getProperty(_key6)._helperNodes) {
                                this.getProperty(_key6)._helperNodes.delete(node);
                            }
                        }
                    }
                    node._dynamicProperty = {};
                    //node._parentIf = null;
                } else {
                    for (var _i16 = 0; _i16 < node._yieldContent.length; _i16++) {
                        node._yieldContent[_i16].remove();
                    }
                    node._dynamicProperty = {};
                }
            } else if (node._renderedComponent) {
                if (node._renderedComponent[node._currentComponent]) {
                    node._renderedComponent[node._currentComponent].remove();
                }
                for (var _key7 in node._renderedComponent) {
                    node._renderedComponent[_key7] = null;
                }
            }
            LyteComponent.newRemoveContext(node, contextSwitchArray);
        }
    }, {
        key: "updateYield",
        value: function updateYield(node, update, contextSwitchInfo) {
            if (!node._callee) {
                node._callee = this;
            }
            var toAppend = node._callee._yields[node.getAttribute("yield-name")];
            if (!toAppend) {
                return;
            }
            //ADded now
            var parentScope = toAppend._callee || node._callee._callee;
            if (!parentScope) {
                node.appendChild(toAppend.content.cloneNode(true, "lyte"));
                return;
            }
            if (!toAppend._callee) {
                toAppend._callee = parentScope;
            }
            node._dynamicProperty = node._dynamicProperty || {};
            //set values from child component. 
            var obj = {},
                contextSwitchingArray = {},
                self = this,
                contextSwitchArray = [];
            LyteComponent.newAddContext(toAppend, contextSwitchArray);
            Object.keys(node._properties).forEach(function (key) {
                contextSwitchingArray[key] = {};
                contextSwitchingArray[key].value = parentScope.component.data[key];
                contextSwitchingArray[key].property = parentScope._properties[key];
                parentScope._properties[key] = node._properties[key];
                parentScope.component.data[key] = node.component.data[key];
            });
            var content = parentScope.renderNodes(toAppend.content, toAppend._dynamicNodes, node, { "node": node }, true);
            LyteComponent.establishBindings(node._properties, node.component.data);
            parentScope.executeBlockHelpers(node._helpers);
            Object.keys(node._properties).forEach(function (key) {
                parentScope.component.data[key] = contextSwitchingArray[key].value;
                parentScope._properties[key] = contextSwitchingArray[key].property;
            });
            LyteComponent.newRemoveContext(toAppend, contextSwitchArray);
            node.appendChild(content);
            node._registerYield = toAppend;
        }

        // It constructs/updates the dynamicComponent creation

    }, {
        key: "updateDynamicComponent",
        value: function updateDynamicComponent(node, update, contextSwitchInfo) {
            var returnVal = void 0;
            node._callee = this;
            var keepAlive = node.hasAttribute("lyte-keep-alive");
            node._renderedComponent = node._renderedComponent || {};
            node._contextSwitchInfo = contextSwitchInfo || node._contextSwitchInfo;
            node._dynamicProperty = node._dynamicProperty || {};
            var componentName = node.getAttribute("component-name") || (node._attributes ? node._attributes["component-name"] : undefined);
            if (!componentName) {
                return;
            }
            var component = void 0,
                newComponent = false;
            if (update) {
                if (keepAlive) {
                    LyteComponent.ignoreDisconnect = true;
                }
                if (node._renderedComponent[node._currentComponent]) {
                    node._renderedComponent[node._currentComponent].remove();
                }
                LyteComponent.ignoreDisconnect = false;
                if (!keepAlive) {
                    node._dynamicProperty = {};
                }
                if (node._renderedComponent[componentName] && keepAlive) {
                    component = node._renderedComponent[componentName];
                } else {
                    component = document.createElement(componentName);
                    newComponent = true;
                }
            } else {
                component = document.createElement(componentName);
                newComponent = true;
            }
            if (!keepAlive && node._currentComponent) {
                node._renderedComponent[node._currentComponent] = null;
            }
            if (newComponent) {
                //          let componentData = {};
                for (var _i17 = 0; _i17 < node.attributes.length; _i17++) {
                    if (node.attributes[_i17].name !== "is" && node.attributes[_i17].name !== "component-name" && node.attributes[_i17].name !== "lyte-keep-alive") {
                        component.setAttribute(node.attributes[_i17].name, node.attributes[_i17].value);
                    }
                }
                //          componentData = component._attributes;
                if (node._attributes) {
                    for (var key in node._attributes) {
                        if (key !== "component-name") {
                            component.setData(LyteComponent.String.toCamelCase(key), node._attributes[key]);
                        }
                    }
                }
                var toAppend = this.renderNodes(node.content, node._dynamicNodes, node, undefined);
                component.appendChild(toAppend);
            }
            if (newComponent) {
                component._toRegEvnts = node._toRegEvnts;
            }
            if (!update) {
                returnVal = { "toAppendMain": component, "lastNode": node };
            } else {
                node.parentNode.insertBefore(component, node);
            }
            node._renderedComponent[componentName] = component;
            node._currentComponent = componentName;
            component._callee = this;
            component._actions = node._actions;
            component.setMethods(node._initMethods);
            component._attributeDetails = node._attributeDetails;
            component._boundEvents = node._boundEvents;
            return returnVal;
        }
        //updFH
        // It constructs/updates the for helper. 

    }, {
        key: "updateForHelper",
        value: function updateForHelper(node, options, contextSwitchInfo) {
            var callee = this;
            node._callee = this;
            node._attributes = node._attributes || {};
            node._contextSwitchInfo = contextSwitchInfo || node._contextSwitchInfo;
            var indexValue = node.getAttribute("index");
            if (!indexValue) {
                node.setAttribute("index", "index");
                indexValue = "index";
            }
            var itemValue = node.getAttribute("item");
            if (!itemValue) {
                node.setAttribute("item", "item");
                itemValue = "item";
            }
            var initialItemValue = callee.component.data[itemValue],
                initialIndexValue = callee.component.data[indexValue];
            var initialItemProp = callee._properties[itemValue],
                initialIndexProp = callee._properties[indexValue];
            callee._properties[itemValue] = callee._properties[indexValue] = {};
            var items = node._attributes.items,
                content = node.content,
                dynamicNodes = node._dynamicNodes,
                lastNode = node;
            if (!node._items) {
                node._items = [];
            }
            var lastIndexForIteration = void 0;
            var firstIndexForIteration = void 0;
            var firstIndex = options.firstIndex;
            var secondIndex = options.secondIndex;
            var thirdIndex = options.thirdIndex;
            if (options) {
                switch (options.type) {
                    case "remove":
                        {
                            lastIndexForIteration = firstIndex;
                            for (var _i18 = firstIndex, v = secondIndex; v > 0; v--, _i18++) {
                                this.removeHelpersSpecificIndex(node, _i18);
                            }
                            //ln
                            /*for(let i=(firstIndex)?firstIndex-secondIndex:firstIndex;i<node._items.length;i++) {
                                let forItem = node._items[i].itemProperty;
                                if(forItem._helperNodes){
                                    for (var item of forItem._helperNodes){
                                        let ind = item._contextSwitchInfo.itemIndex;
                                        item._contextSwitchInfo.itemIndex = (ind)? ind- secondIndex : ind;
                                    }
                                }
                            }*/
                            for (var _i19 = firstIndex + secondIndex; _i19 < node._items.length; _i19++) {
                                node._items[_i19]._contextSwitchInfo.itemIndex = node._items[_i19]._contextSwitchInfo.itemIndex - secondIndex;
                            }
                            node._items.splice(firstIndex, secondIndex);
                            node._helpers.splice(firstIndex, secondIndex);
                            node._forContent.splice(firstIndex, secondIndex);
                            break;
                        }
                    case "insert":
                        {
                            firstIndexForIteration = firstIndex;
                            lastIndexForIteration = secondIndex;
                            if (node._forContent[firstIndex]) {
                                lastNode = node._forContent[firstIndex][0];
                            }
                            var newArr = [],
                                newObj = [],
                                newArr1 = [];
                            for (var _v = secondIndex, k = firstIndex; _v > 0; _v--, k++) {
                                newArr.push([]);
                                newObj.push({});
                                newArr1.push([]);
                            }
                            node._helpers.splice.apply(node._helpers, [firstIndex, 0].concat(newArr));
                            node._items.splice.apply(node._items, [firstIndex, 0].concat(newObj));
                            //ln
                            //                  for(let i=firstIndex + secondIndex;i<node._items.length;i++) {
                            //                      let forItem = node._items[i].itemProperty;
                            //                      for (var item of forItem._helperNodes){
                            //                          item._contextSwitchInfo.itemIndex = item._contextSwitchInfo.itemIndex + secondIndex;
                            //                      }
                            //                  }
                            for (var _i20 = firstIndex + secondIndex; _i20 < node._items.length; _i20++) {
                                node._items[_i20]._contextSwitchInfo.itemIndex = node._items[_i20]._contextSwitchInfo.itemIndex + secondIndex;
                            }
                            node._forContent.splice.apply(node._forContent, [firstIndex, 0].concat(newArr1));
                        }
                        break;
                    case "replace":
                        {
                            firstIndexForIteration = firstIndex;
                            lastIndexForIteration = secondIndex;
                            this.removeHelpersSpecificIndex(node, firstIndex);
                            var _toAppendMain = document.createDocumentFragment();
                            if (node._forContent[firstIndex + 1]) {
                                lastNode = node._forContent[firstIndex + 1][0];
                            }
                            var _newArr = [],
                                _newObj = [],
                                _newArr2 = [];
                            for (var _v2 = secondIndex, _k = firstIndex; _v2 > 0; _v2--, _k++) {
                                _newArr.push([]);
                                _newArr2.push([]);
                                _newObj.push({});
                            }
                            node._helpers.splice.apply(node._helpers, [firstIndex, 1].concat(_newArr));
                            node._items.splice.apply(node._items, [firstIndex, 1].concat(_newObj));
                            //                  for(let i=firstIndex + secondIndex;i<node._items.length;i++) {
                            //                      let forItem = node._items[i].itemProperty._forItem;
                            //                      forItem.itemIndex = forItem.itemIndex + secondIndex - 1 ;
                            //                  }
                            for (var _i21 = firstIndex + secondIndex; _i21 < node._items.length; _i21++) {
                                node._items[_i21]._contextSwitchInfo.itemIndex = node._items[_i21]._contextSwitchInfo.itemIndex + secondIndex - 1;
                            }
                            node._forContent.splice.apply(node._forContent, [firstIndex, 1].concat(_newArr2));
                            break;
                        }
                    case "splice":
                        {
                            firstIndexForIteration = firstIndex;
                            lastIndexForIteration = secondIndex;
                            for (var _i22 = thirdIndex, j = 0; _i22 > 0; _i22--, j++) {
                                this.removeHelpersSpecificIndex(node, firstIndex + j);
                            }
                            var _toAppendMain2 = document.createDocumentFragment();
                            if (node._forContent[firstIndex + thirdIndex]) {
                                lastNode = node._forContent[firstIndex + thirdIndex][0];
                            }
                            var _newArr3 = [],
                                _newObj2 = [],
                                _newArr4 = [];
                            for (var _v3 = secondIndex, _k2 = firstIndex; _v3 > 0; _v3--, _k2++) {
                                _newArr3.push([]);
                                _newArr4.push([]);
                                _newObj2.push({});
                            }
                            node._helpers.splice.apply(node._helpers, [firstIndex, thirdIndex].concat(_newArr3));
                            node._items.splice.apply(node._items, [firstIndex, thirdIndex].concat(_newObj2));
                            //                  for(let i=firstIndex + secondIndex;i<node._items.length;i++) {
                            //                      let forItem = node._items[i].itemProperty._forItem;
                            //                      forItem.itemIndex = forItem.itemIndex + secondIndex - 1 ;
                            //                  }
                            for (var _i23 = firstIndex + secondIndex; _i23 < node._items.length; _i23++) {
                                node._items[_i23]._contextSwitchInfo.itemIndex = node._items[_i23]._contextSwitchInfo.itemIndex + secondIndex - thirdIndex;
                            }
                            node._forContent.splice.apply(node._forContent, [firstIndex, thirdIndex].concat(_newArr4));
                            break;
                        }
                        break;
                    case "update":
                        {
                            var key = node.getAttribute("item");
                            //                  this.removeHelpers(node, true);
                            for (var _i24 = 0; _i24 < node._items.length; _i24++) {
                                this.removeHelpersSpecificIndex(node, _i24);
                            }
                            //                  if(node._attributes.items) {
                            //                      for(let i=0;i<node._attributes.items.length && node._items[i];i++) {
                            //                          LyteComponent.removeSelectedBindingDeep(node._items[i].itemProperty[key], node._attributes.items[i]);
                            //                      }
                            //                  }
                            node._items = [];
                        }
                    case "default":
                        {
                            node._forContent = [];
                            node._helpers = [];
                            firstIndexForIteration = 0;
                            lastIndexForIteration = items ? items.length : 0;
                        }
                        break;
                    default:
                        console.error("Error in updateForHelper");

                }
            }
            if (!lastNode) {
                lastNode = node;
            }
            while (lastNode !== node && lastNode.tagName === "TEMPLATE") {
                var lastNodeType = lastNode.getAttribute("is");
                switch (lastNodeType) {
                    case "for":
                    case "forIn":
                        lastNode = lastNode._forContent[0][0] || lastNode;
                        break;
                    case "if":
                    case "switch":
                        lastNode = lastNode._caseContent[0] || lastNode;
                        break;
                    case "component":
                        lastNode = lastNode._renderedComponent[lastNode._currentComponent] || lastNode;
                        break;
                }
            }
            var returnVal = void 0;
            if (options.type !== "remove") {
                var toAppendMain = document.createDocumentFragment();
                for (var _k3 = firstIndexForIteration, _v4 = lastIndexForIteration; _v4 > 0; _k3++, _v4--) {
                    node._helpers[_k3] = [];
                    node._items[_k3] = { "_dynamicProperty": {}, "itemProperty": {}, "indexProperty": {} };
                    callee.component.data[itemValue] = items[_k3];
                    callee.component.data[indexValue] = _k3;
                    callee._properties[itemValue] = {};
                    callee._properties[indexValue] = {};
                    var optns = { "itemValue": itemValue, "itemIndex": _k3, "type": "for", "node": node, "indexValue": indexValue };
                    //                  Object.defineProperty(callee._properties[itemValue], '_forItem', {
                    //                      enumerable: false, 
                    //                      writable: true, 
                    //                      configurable: true, 
                    //                      value : optns
                    //                  });
                    node._items[_k3]._contextSwitchInfo = optns;
                    var breakCheck = {};
                    var toAppend = this.renderNodes(content, dynamicNodes, node, optns, undefined, breakCheck);
                    node._items[_k3].itemProperty = this.getProperty(itemValue);
                    node._items[_k3].indexProperty = this.getProperty(indexValue);
                    //                  if(options.type !== "default") {
                    LyteComponent.establishBindings(_defineProperty({}, itemValue, node._items[_k3].itemProperty), _defineProperty({}, itemValue, node._attributes.items[_k3]));
                    //                  }
                    node._forContent[_k3] = Array.from(toAppend.childNodes);
                    //Needs to revisit this and make sure it happen within renderNodes function itself;
                    //                  if(options.type !== "update") {
                    this.executeBlockHelpers(node._helpers[_k3]);
                    toAppendMain.appendChild(toAppend);
                    if (breakCheck.stop) {
                        break;
                    }
                }
                if (options.type === "default") {
                    returnVal = { "toAppendMain": toAppendMain, "lastNode": lastNode };
                } else {
                    lastNode.parentNode.insertBefore(toAppendMain, lastNode);
                }
                if (node._removedAttributes && node._removedAttributes.items && node._removedAttributes.items._multipleProperty) {
                    LyteComponent.establishBindings({ "items": node._removedAttributes.items._multipleProperty.actProp }, { "items": items });
                }
            }
            for (var _i25 = lastIndexForIteration; _i25 < node._items.length; _i25++) {
                //              for(let j=0;j<node._helpers[i].length;j++) {
                //                  node._helpers[j]._contextSwitchInfo.itemIndex = i;
                //              }
                if (node._items[_i25].indexProperty) {
                    LyteComponent.affectChanges(node._items[_i25].indexProperty);
                }
            }
            callee.component.data[itemValue] = initialItemValue;
            callee.component.data[indexValue] = initialIndexValue;
            callee._properties[itemValue] = initialItemProp;
            callee._properties[indexValue] = initialIndexProp;
            return returnVal;
        }
        //It constructs/updates forIn Helper.
        //updFIH

    }, {
        key: "updateForInHelper",
        value: function updateForInHelper(node, options, contextSwitchInfo) {
            var callee = this;
            node._callee = this;
            node._attributes = node._attributes || {};
            contextSwitchInfo = contextSwitchInfo ? contextSwitchInfo : node._contextSwitchInfo;
            node._contextSwitchInfo = contextSwitchInfo;
            var key = node.getAttribute("key");
            if (!key) {
                key = "key";
                node.setAttribute("key", "key");
            }
            var value = node.getAttribute("value");
            if (!value) {
                value = "value";
                node.setAttribute("value", "value");
            }
            var initialKeyValue = callee.component.data[key];
            var initialValueValue = callee.component.data[value];
            var initialKeyProp = callee._properties[key];
            var initialValueProp = callee._properties[value];
            callee._properties[key] = callee._properties[value] = {};
            var object = node._attributes.object;
            var content = node.content;
            var dynamicNodes = node._dynamicNodes;
            var lastNode = node;
            var keysArray = [];
            if (!node._items) {
                node._items = {};
            }
            if (options) {
                switch (options.type) {
                    case "delete":
                        {
                            this.removeHelpersSpecificIndex(node, options.property);
                            var delIndex = node._keysArray.indexOf(options.property);
                            if (delIndex > -1) {
                                node._keysArray.splice(delIndex, 1);
                            }
                            delete node._propBindingObject[options.property];
                        }
                        break;
                    case "add":
                        {
                            keysArray = [options.property];
                            node._keysArray.push(options.property);
                        }
                        break;
                    case "update":
                        {
                            node._keysArray.forEach(function (itemKey, index, array) {
                                this.removeHelpersSpecificIndex(node, itemKey);
                            }, this);
                            node._keysArray = keysArray = object ? Object.keys(object) : [];
                            node._items = {};
                            node._propBindingObject = {};
                        }
                        break;
                    case "default":
                        {
                            node._forContent = {};
                            node._helpers = {};
                            node._keysArray = keysArray = object ? Object.keys(object) : [];
                            //                  keysArray = Object.keys(object);
                        }
                        break;
                    default:
                        console.error("Error in updateForHelper");

                }
            }
            var returnVal = void 0;
            if (!object) {
                var _toAppendMain3 = document.createDocumentFragment();
                if (options.type !== "default") {
                    lastNode.parentNode.insertBefore(_toAppendMain3, lastNode);
                } else {
                    return { "toAppendMain": _toAppendMain3, "lastNode": lastNode };
                }
            }
            if (object && options.type !== "remove") {
                var toAppendMain = document.createDocumentFragment();
                node._propBindingObject = node._propBindingObject || {};
                keysArray.forEach(function (itemKey, index, array) {
                    node._helpers[itemKey] = [];
                    node._items[itemKey] = { "_dynamicProperty": {}, "itemProperty": {} };
                    callee.component.data[key] = itemKey;
                    callee.component.data[value] = object[itemKey];
                    callee._properties[key] = {};
                    callee._properties[value] = {};
                    var optns = { "itemIndex": itemKey, "itemValue": value, "keyValue": key, "type": "forIn", "node": node };
                    node._items[itemKey]._contextSwitchInfo = optns;
                    var toAppend = this.renderNodes(content, dynamicNodes, node, optns);
                    node._items[itemKey].itemProperty = this.getProperty(value);
                    node._propBindingObject[itemKey] = node._items[itemKey].itemProperty;
                    node._forContent[itemKey] = Array.from(toAppend.childNodes);
                    //                    this.updateBlockHelpers(node._helpers[itemKey], optns);
                    this.executeBlockHelpers(node._helpers[itemKey]);
                    toAppendMain.appendChild(toAppend);
                }, this);
                //              if(options.type !== "update") {
                if (!node._attributes.object._bindings) {
                    Object.defineProperty(node._attributes.object, '_bindings', {
                        value: new Set(),
                        enumerable: false,
                        writable: true,
                        configurable: true
                    });
                }
                node._attributes.object._bindings.add(node._propBindingObject);
                LyteComponent.establishBindings(node._propBindingObject, node._attributes.object);
                //              }
                if (options.type !== "default") {
                    lastNode.parentNode.insertBefore(toAppendMain, lastNode);
                } else {
                    returnVal = { "toAppendMain": toAppendMain, "lastNode": lastNode };
                }
            }
            callee.component.data[key] = initialKeyValue;
            callee.component.data[value] = initialValueValue;
            callee._properties[key] = initialKeyProp;
            callee._properties[value] = initialValueProp;
            return returnVal;
        }
    }, {
        key: "updateSwitchHelper",

        //updSH
        value: function updateSwitchHelper(type, node, contextSwitchInfo, update) {
            var isNew = false;
            var lastNode = node;
            if (!node._callee) {
                node._callee = this;
                isNew = true;
            }
            contextSwitchInfo = contextSwitchInfo ? contextSwitchInfo : node._contextSwitchInfo;
            node._contextSwitchInfo = contextSwitchInfo;
            node._dynamicProperty = node._dynamicProperty ? node._dynamicProperty : {};
            var currentCaseName = void 0;
            var value = void 0;
            if (node.getAttribute("value") === "" || node.getAttribute("value")) {
                value = node.getAttribute("value");
            } else if (node._attributes) {
                value = node._attributes.value;
            }
            if (node._currentCase && value === node._currentCase) {
                return;
            }
            if (value) {
                currentCaseName = type === "if" ? "true" : value.toString();
            } else {
                if (type === "if") {
                    currentCaseName = "false";
                } else {
                    switch (value) {
                        case undefined:
                            currentCaseName = "undefined";
                            break;
                        case null:
                            currentCaseName = "null";
                            break;
                        case false:
                            currentCaseName = "false";
                            break;
                        case "":
                            currentCaseName = '""';
                            break;
                    }
                }
            }
            if (currentCaseName === node._currentCase) {
                return;
            }
            node._currentCase = currentCaseName;
            //        let currentCase = node.content.querySelector('[case=\''+currentCaseName+'\']'),scope;
            var scope = node._cases[currentCaseName];
            var defaultContent = void 0;
            if (!scope) {
                scope = node._default;
                defaultContent = node.content.querySelector('[default]');
                node._isDefault = true;
                if (!defaultContent) {
                    if (node._caseContent && node._caseContent.length) {
                        this.removeHelpers(node);
                    }
                    node._caseContent = [];
                    var emptyTextNode = document.createTextNode("");
                    node._caseContent.push(emptyTextNode);
                    node._currentCaseName = currentCaseName;
                    if (update) {
                        lastNode.parentNode.insertBefore(emptyTextNode, node);
                        return;
                    } else {
                        var _toAppendMain4 = document.createDocumentFragment();
                        _toAppendMain4.append(emptyTextNode);
                        return { lastNode: lastNode, toAppendMain: _toAppendMain4 };
                    }
                }
            }

            //        if(currentCase) {
            //              if(currentCase.tagName === "TEMPLATE" && !currentCase.getAttribute("is")){
            //                  currentCase = currentCase.content;
            //              } else {
            //                  let temp = document.createElement('template');
            //                  let clone = currentCase.cloneNode(true);
            //                  temp.content.appendChild(clone);
            //                  currentCase.removeAttribute('slot');
            //                  currentCase = temp.content;
            //              }
            //              scope.content = currentCase;
            //        }

            if (node._caseContent && node._caseContent.length) {
                this.removeHelpers(node);
            }
            var dummyScope = scope;
            var additionalContentArr = [];
            var cnt = 0;
            var dummyCaseName = currentCaseName;
            var template = void 0;
            if (defaultContent) {
                template = defaultContent;
            } else {
                template = node.content.querySelector('[case=\'' + dummyCaseName + '\']');
            }
            var contentArr = [];
            while (dummyScope) {
                var dynamicNodes = dummyScope.dynamicNodes;
                var processedContent = this.renderNodes(template.content, dynamicNodes, node, undefined);
                contentArr.push(processedContent);
                if (dummyScope.additional) {
                    if (dummyScope.additional.next) {
                        template = node.content.querySelector('[case=\'' + dummyScope.additional.next + '\']');
                        dummyScope = node._cases[dummyScope.additional.next];
                    } else {
                        template = node.content.querySelector('[default]');
                        dummyScope = node._default;
                    }
                } else {
                    break;
                }
            }
            node._caseContent = [];
            var toAppendMain = document.createDocumentFragment();;
            for (var _i26 = 0; _i26 < contentArr.length; _i26++) {
                if (contentArr[_i26].nodeType == 11) {
                    //                for(let j=0;j<contentArr[i].childNodes.length;j++) {
                    //                    node._caseContent.push(contentArr[i].childNodes[j]);
                    //                }
                    node._caseContent = node._caseContent.concat(Array.from(contentArr[_i26].childNodes));
                } else {
                    node._caseContent.push(contentArr[_i26]);
                }
                toAppendMain.append(contentArr[_i26]);
                //            node.parentNode.insertBefore(contentArr[i], node);
            }
            this.executeBlockHelpers(node._helpers, node);
            if (update) {
                var returnVal = void 0;
                if (toAppendMain.querySelector("template[is=break]")) {
                    returnVal = "break";
                } else if (toAppendMain.querySelector("template[is=continue]")) {
                    returnVal = "continue";
                }
                node.parentNode.insertBefore(toAppendMain, node);
                return returnVal;
            } else {
                return { "toAppendMain": toAppendMain, "lastNode": node };
            }
        }
    }, {
        key: "dummy",
        value: function dummy(a, b) {
            var dummy = this.constructor._properties[boundValue].observer;
        }
    }, {
        key: "callObservers",
        value: function callObservers(boundValue, key) {
            var property = this.constructor._properties[boundValue];
            var observers = property ? property.observer : undefined;
            if (observers) {
                for (var _i27 = 0; _i27 < observers.length; _i27++) {
                    if (key.indexOf('.') === -1 || observers[_i27].path === key) {
                        this["_" + observers[_i27].functionName].apply(this);
                    }
                }
            }
        }
    }, {
        key: "bindNode",

        //It registers the binding of the node with the properties with which the dynamicNode depends. 
        value: function bindNode(node, toBeRemoved, helperNode, options, nodeInfo, processLast, establishBindings, isTemplate) {
            var itemValue = options.itemValue;
            var forIndex = options.itemIndex;
            var forType = options.type;
            var indexValue = options.indexValue;
            var dynamicValue = nodeInfo.dynamicValue;
            var helperFunc = nodeInfo.helperInfo;
            var nodeValue = void 0,
                ownerElement = node.ownerElement;
            var dynamicValuesArray = [];
            //        if(node.nodeType === 2 && LyteComponent.isCustomElement(node.ownerElement,true) ) {
            //          node = {nodeName : node.nodeName, ownerElement: ownerElement, nodeType : 2, nodeValue : node.nodeValue};
            //        }
            node._callee = this;
            var isHelper = false;
            if (helperFunc && Object.keys(helperFunc).length) {
                isHelper = true;
                var attrName = node.nodeName;
                nodeValue = node.helperValue = helperFunc;
                var helperArgs = [];
                if (helperFunc.name === "action") {
                    var actName = helperFunc.args[0];
                    helperFunc.args[0] = actName.startsWith("'") ? actName.replace(/'/g, '') : actName;
                    if (forType) {
                        ownerElement._contextSwitchInfo = options;
                    } else if (helperNode) {
                        ownerElement._contextSwitchInfo = helperNode._contextSwitchInfo;
                    }
                    actName = helperFunc.args.slice(0, 1)[0];
                    var args = helperFunc.args.slice(1, helperFunc.args.length),
                        isCustom = false;
                    var _attrName = node.nodeName;
                    if (_attrName.indexOf("-") != -1) {
                        isCustom = true;
                    }
                    helperArgs = [ownerElement, _attrName, isCustom, { name: actName, args: args }];
                    this.processHelper({ "name": helperFunc.name, "args": helperArgs }, node);
                    return;
                } else {
                    helperArgs = this.processArgs(this, helperFunc.args, dynamicValuesArray);
                }
                nodeValue = this.processHelper({ "name": helperFunc.name, "args": helperArgs }, node);
                if (helperFunc.name === "unescape") {
                    //              let test = node.replaceWith.apply(node,nodeValue.childNodes);
                    var obj = { initialNode: node, dynamicNodeValue: nodeValue };
                    node = { dynamicPositions: obj, "_callee": node._callee, helperValue: node.helperValue };
                    processLast.push(node);
                }
            } else {
                helperFunc = {};
                node.syntaxValue = dynamicValue;
                var dynamicValues = [];
                nodeValue = LyteComponent.get(this.component.data, dynamicValue, dynamicValues);
                dynamicValuesArray.push(dynamicValues);
            }
            if (node.nodeType === 2 && (typeof nodeValue !== "string" && (LyteComponent.isCustomElement(node.ownerElement, true) || typeof nodeValue === "boolean") || LyteComponent.isControlHelper(node.ownerElement))) {
                //	let bindedNode = node;
                node = { nodeName: node.nodeName, ownerElement: ownerElement, nodeType: 2, nodeValue: node.nodeValue, _callee: this, syntaxValue: node.syntaxValue, helperValue: node.helperValue, _attributeDetails: node._attributeDetails };
                //	node.ownerElement._attributeDetails[node.nodeName].bindedNode = node;
            }
            var actMultiProp = void 0;
            if (helperFunc.name !== "unbound") {
                var dynamicProp = void 0;
                if (helperNode) {
                    dynamicProp = forType ? helperNode._items[forIndex]._dynamicProperty : helperNode._dynamicProperty;
                }
                for (var d = 0; d < dynamicValuesArray.length; d++) {
                    var _dynamicValues = dynamicValuesArray[d];
                    for (var v = 0; v < _dynamicValues.length; v++) {
                        var actProperty = this.getProperty(_dynamicValues[v]);
                        if (helperNode) {
                            var ind = _dynamicValues[v].search(/\W/);
                            var _boundValue = void 0;
                            if (ind !== -1) {
                                _boundValue = _dynamicValues[v].substring(0, ind);
                            } else {
                                _boundValue = _dynamicValues[v];
                            }
                            if (_boundValue !== itemValue && _boundValue !== indexValue && (!options.node || !options.node._properties || !options.node._properties[_boundValue])) {
                                if (!actProperty._helperNodes) {
                                    Object.defineProperty(actProperty, '_helperNodes', {
                                        value: new Set(),
                                        writable: true,
                                        enumerable: false,
                                        configurable: true
                                    });
                                }
                                actProperty._helperNodes.add(helperNode);
                                dynamicProp[_dynamicValues[v]] ? dynamicProp[_dynamicValues[v]].push(node) : (dynamicProp[_dynamicValues[v]] = []).push(node);
                            } else {
                                node._contextSwitchInfo = options;
                                if (!actProperty._dynamicNodes) {
                                    actProperty._dynamicNodes = [];
                                    Object.defineProperty(actProperty, '_dynamicNodes', {
                                        value: [],
                                        enumerable: false,
                                        writable: true,
                                        configurable: true
                                    });
                                }
                                actProperty._dynamicNodes.push(node);
                                actMultiProp = actProperty;
                            }
                        } else {
                            if (!actProperty._dynamicNodes) {
                                Object.defineProperty(actProperty, '_dynamicNodes', {
                                    value: [],
                                    enumerable: false,
                                    writable: true,
                                    configurable: true
                                });
                            }
                            actProperty._dynamicNodes.push(node);
                        }
                        if (ownerElement && ownerElement.tagName === "TEMPLATE" && /^(for|forIn)$/.test(ownerElement.getAttribute("is")) && !isHelper) {
                            var type = ownerElement.getAttribute("is");
                            if (type === "for" && node.nodeName === "items" || type === "forIn" && node.nodeName === "object") {
                                if (!actProperty._forHelpers) {
                                    Object.defineProperty(actProperty, '_forHelpers', {
                                        value: new Set(),
                                        enumerable: false,
                                        writable: true,
                                        configurable: true
                                    });
                                }
                                node.ownerElement._actualBinding = actProperty;
                                actProperty._forHelpers.add(node.ownerElement);
                            }
                        }
                        if (establishBindings) {
                            LyteComponent.establishSelectedBinding(actProperty, this.component.data, this);
                        }
                    }
                    if (_dynamicValues.length > 1) {
                        node._multipleProperty = { "dynamicProp": actMultiProp ? undefined : dynamicProp, "actProp": this.getProperty(_dynamicValues[0]), "helperNode": helperNode };
                    }
                }
            }
            nodeValue = !(typeof nodeValue === "undefined" ? "undefined" : _typeof(nodeValue)) === "boolean" && !(typeof nodeValue === "undefined" ? "undefined" : _typeof(nodeValue)) === "number" ? nodeValue ? nodeValue : "" : nodeValue;
            if (node.nodeType === 2) {
                var parentNode = node._parentNode ? node._parentNode : node.ownerElement;
                if (parentNode.tagName) {
                    var is = parentNode.getAttribute("is");
                }
                var isCustomElement = LyteComponent.isCustomElement(parentNode, true);
                if (isCustomElement) {
                    if (parentNode.set) {
                        parentNode.set(LyteComponent.String.toCamelCase(node.nodeName), nodeValue);
                    } else {
                        parentNode._initProperties = parentNode._initProperties || {};
                        parentNode._initProperties[LyteComponent.String.toCamelCase(node.nodeName)] = nodeValue;
                    }
                }
                var origNodeValue = nodeValue;
                //!== "string"
                if (isCustomElement && typeof nodeValue !== "string" && !isTemplate) {
                    parentNode._attributes = parentNode._attributes || {};
                    parentNode._attributes[node.nodeName] = nodeValue;
                    if (parentNode.nodeName === "TEMPLATE" && isHelper && nodeValue) {
                        if (parentNode.getAttribute("is") === "for" && node.nodeName === "items" || parentNode.getAttribute("is") === "forIn" && node.nodeName === "object") {
                            if (!nodeValue._bindings) {
                                Object.defineProperty(nodeValue, '_bindings', {
                                    value: new Set(),
                                    enumerable: false,
                                    writable: true,
                                    configurable: true
                                });
                            }
                            //node._actualBinding = {"_forHelpers" : new Set().add(parentNode)};
                            node.ownerElement._actualBinding = { "_forHelpers": new Set().add(parentNode), "_createdBinding": true };
                            nodeValue._bindings.add(node.ownerElement._actualBinding);
                        }
                    }
                    toBeRemoved.push(node.nodeName);
                } else {
                    if (typeof nodeValue === "boolean") {
                        parentNode._attributes = node.ownerElement._attributes || {};
                        parentNode._attributes[node.nodeName] = nodeValue;
                        if (!nodeValue) {
                            //                      node.ownerElement.removeAttribute(node.nodeName);
                            toBeRemoved.push(node.nodeName);
                        } else {
                            parentNode.setAttribute(node.nodeName, "");
                        }
                    } else {
                        nodeValue = (typeof nodeValue === "undefined" ? "undefined" : _typeof(nodeValue)) === "object" ? typeof Record != "undefined" && nodeValue instanceof Record ? JSON.stringify(nodeValue.$.toJSON()) : JSON.stringify(nodeValue) : nodeValue === undefined ? '' : nodeValue;
                        if (LyteComponent.isControlHelper(node.ownerElement)) {
                            parentNode._attributes = node.ownerElement._attributes || {};
                            parentNode._attributes[node.nodeName] = nodeValue;
                            toBeRemoved.push(node.nodeName);
                        } else {
                            node.nodeValue = nodeValue;
                        }
                    }
                }
                if (parentNode.tagName === "LYTE-YIELD" /*parentNode.getAttribute("is") === "insertYield"*/) {
                        parentNode.component.data[LyteComponent.String.toCamelCase(node.nodeName)] = origNodeValue;
                    }
                if (/^(INPUT|TEXTAREA|SELECT)$/.test(parentNode.nodeName)) {
                    if (node.nodeName === "value") {
                        parentNode.value = nodeValue;
                    } else if (node.nodeName === "checked") {
                        parentNode.checked = nodeValue;
                    }
                }
            } else {
                node.nodeValue = nodeValue === undefined ? '' : nodeValue;
            }
            return node;
        }
    }, {
        key: "debounce",
        value: function debounce(func, threshold) {
            var timeout;
            return function debounced() {
                var obj = this,
                    args = arguments;
                function delayed() {
                    func.apply(obj, args);
                    timeout = null;
                };
                if (timeout) {
                    clearTimeout(timeout);
                }
                timeout = setTimeout(delayed, threshold || 100);
                //console.log(timeout,threshold);
            };
        }
    }, {
        key: "getProperty",
        value: function getProperty(key) {
            var arr = key.split('.');
            var property = this;
            if (!property._properties[arr[0]]) {
                property._properties[arr[0]] = {};
            }
            property = property._properties[arr[0]];

            Object.defineProperty(property, '_path', { enumerable: false, value: arr[0] });
            for (var _i28 = 1; _i28 < arr.length; _i28++) {
                if (!property[arr[_i28]]) {
                    property[arr[_i28]] = {};
                    Object.defineProperty(property[arr[_i28]], '_path', { enumerable: false, value: property._path + "." + arr[_i28] });
                }
                property = property[arr[_i28]];
            }
            return property;
        }
        //updN

    }, {
        key: "updateNode",
        value: function updateNode(node, updatePath) {
            var multiplePropNode = false;
            var multipleProp = void 0;
            if (node._multipleProperty && updatePath !== node._multipleProperty.actProp._path) {
                multiplePropNode = false;
                multipleProp = node._multipleProperty;
                var nodes = void 0;
                if (multipleProp.dynamicProp) {
                    multiplePropNode = multipleProp;
                    nodes = multipleProp.dynamicProp[multipleProp.actProp._path];
                    if (nodes) {
                        var index = nodes.indexOf(node);
                        nodes.splice(index, 1);
                    }
                    var helperNode = multipleProp.helperNode;
                    if (nodes.length === 0) {
                        if (helperNode.getAttribute("is") === "if") {
                            multipleProp.actProp._helperNodes.delete(helperNode);
                            delete multipleProp.dynamicProp[multipleProp.actProp._path];
                        } else {
                            delete multipleProp.dynamicProp[multipleProp.actProp._path];
                            if (helperNode._items) {
                                var removeHelper = true;
                                for (var _i29 = 0; _i29 < helperNode._items.length; _i29++) {
                                    if (helperNode._items[_i29]._dynamicProperty && helperNode._items[_i29]._dynamicProperty[multipleProp.actProp._path]) {
                                        removeHelper = false;
                                        break;
                                    }
                                }
                                if (removeHelper) {
                                    multipleProp.actProp._helperNodes.delete(helperNode);
                                    //console.log('for helper is removed');
                                }
                            }
                        }
                    }
                }
                if (!multiplePropNode) {
                    multiplePropNode = "dynamicNodes";
                    nodes = multipleProp.actProp._dynamicNodes;
                    if (nodes) {
                        var _index2 = nodes.indexOf(node);
                        nodes.splice(_index2, 1);
                        if (!nodes.length) {
                            delete multipleProp.actProp._dynamicNodes;
                        }
                    }
                }
            }
            if (!node.syntaxValue && !node.helperValue) {
                return;
            }
            var contextSwitchInfo = void 0;
            var isYieldContext = void 0;
            if (node._contextSwitchInfo || node.nodeType === 2 && node.ownerElement._contextSwitchInfo) {
                contextSwitchInfo = node._contextSwitchInfo || node.ownerElement._contextSwitchInfo;
                var contextSwitchArray = [];
                LyteComponent.changeContext(contextSwitchInfo.node, contextSwitchArray, contextSwitchInfo);
            } else if (node.tagName === "LYTE-YIELD" && node._callee._contextSwitchInfo) {
                isYieldContext = true;
                contextSwitchInfo = node._callee._contextSwitchInfo;
                var contextSwitchArray = [];
                LyteComponent.changeContext(contextSwitchInfo.node, contextSwitchArray, contextSwitchInfo, true);
            }
            var nodeValue = void 0;
            if (node.helperValue) {
                nodeValue = node.helperValue;
                var helperFunc = nodeValue;
                var dynamicValues = [];
                var helperRetVal = this.processHelper({ name: helperFunc.name, args: this.processArgs(this, helperFunc.args) }, node);
                nodeValue = helperRetVal;
                if (helperFunc.name === "unescape") {
                    var oldDynamicPosition = node.dynamicPositions;
                    var oldStartingNode = oldDynamicPosition.startingNode;
                    var oldChldLen = oldDynamicPosition.length;
                    while (oldChldLen > 1) {
                        var next = oldStartingNode.nextSibling;
                        oldStartingNode.remove();
                        oldStartingNode = next;
                        oldChldLen--;
                    }
                    var childLen = nodeValue.childNodes.length;
                    if (!childLen) {
                        nodeValue.appendChild(document.createTextNode(""));
                        childLen = 1;
                    }
                    var startingNode = nodeValue.childNodes[0];
                    oldStartingNode.replaceWith.apply(oldStartingNode, nodeValue.childNodes);
                    var obj = { startingNode: startingNode, length: childLen };
                    node.dynamicPositions = obj;
                }
            } else {
                var _boundValue2 = node.syntaxValue;
                var path = void 0;
                if (_boundValue2.indexOf('.') !== -1 || _boundValue2.indexOf('[') !== -1) {
                    path = _boundValue2;
                    _boundValue2 = _boundValue2.substring(0, _boundValue2.indexOf('.'));
                }
                var _dynamicValues2 = [];
                var value = path ? LyteComponent.get(this.component.data, path, _dynamicValues2) : this.component.data[_boundValue2];
                if (multiplePropNode) {
                    var prop = this.getProperty(_dynamicValues2[0]);
                    var totalProp = this.getProperty(_dynamicValues2[0].substring(0, _dynamicValues2[0].indexOf('.')));
                    var _value = this.getData(_dynamicValues2[0].substring(0, _dynamicValues2[0].indexOf('.')));
                    if (multiplePropNode === "dynamicNodes") {
                        if (!prop._dynamicNodes) {
                            Object.defineProperty(prop, '_dynamicNodes', {
                                value: [],
                                enumerable: false,
                                writable: true,
                                configurable: true
                            });
                        }
                        prop._dynamicNodes.push(node);
                    } else {
                        if (!prop._helperNodes) {
                            Object.defineProperty(prop, '_helperNodes', {
                                value: new Set(),
                                writable: true,
                                enumerable: false,
                                configurable: true
                            });
                        }
                        prop._helperNodes.add(multipleProp.helperNode);
                        var dynamicProp = multipleProp.dynamicProp;
                        dynamicProp[prop._path] ? dynamicProp[prop._path].push(node) : (dynamicProp[prop._path] = []).push(node);
                    }
                    LyteComponent.establishBindings(totalProp, _value);
                    node._multipleProperty.actProp = prop;
                }
                nodeValue = !(typeof value === "undefined" ? "undefined" : _typeof(value)) === "boolean" && !(typeof value === "undefined" ? "undefined" : _typeof(value)) === "number" ? value ? value : "" : value;
            }

            if (node.nodeType === 2) {
                var parentNodes = [];
                var pN = node._parentNode ? node._parentNode : node.ownerElement;
                if (pN.tagName === "TEMPLATE" && pN.getAttribute("is") === "component" && node.nodeName !== "component-name") {
                    var isKeepAlive = pN.hasAttribute("lyte-keep-alive");
                    if (isKeepAlive) {
                        for (var key in pN._renderedComponent) {
                            parentNodes.push(pN._renderedComponent[key]);
                        }
                    } else {
                        parentNodes.push(pN._renderedComponent[pN.getAttribute("component-name")]);
                    }
                } else {
                    parentNodes.push(pN);
                }
                for (var _i30 = 0; _i30 < parentNodes.length; _i30++) {
                    var parentNode = parentNodes[_i30];
                    if (parentNode.set) {
                        parentNode.set(LyteComponent.String.toCamelCase(node.nodeName), nodeValue);
                    } else {
                        parentNode._initProperties = parentNode._initProperties || {};
                        parentNode._initProperties[LyteComponent.String.toCamelCase(node.nodeName)] = nodeValue;
                    }

                    if (parentNode.tagName === "LYTE-YIELD" && parentNode.component.data && node.nodeName && parentNode.component.data[node.nodeName] !== nodeValue /*parentNode.getAttribute("is") === "insertYield"*/) {
                            LyteComponent.set(parentNode.component.data, LyteComponent.String.toCamelCase(node.nodeName), nodeValue, undefined, parentNode);
                        }
                    parentNode._attributes = parentNode._attributes || {};
                    //!== "string"
                    if (LyteComponent.isCustomElement(parentNode, true) && typeof nodeValue !== "string" && typeof nodeValue !== "undefined") {
                        if (node.ownerElement.nodeName === "TEMPLATE" && node.helperValue) {
                            if (node.ownerElement.getAttribute("is") === "for" && node.nodeName === "items" || node.ownerElement.getAttribute("is") === "forIn" && node.nodeName === "object") {
                                var oldValue = node.ownerElement._attributes[node.nodeName];
                                var newValue = nodeValue;
                                LyteComponent.removeSelectedBindingDeep(node.ownerElement._actualBinding, oldValue);
                                if (newValue) {
                                    if (!newValue._bindings) {
                                        Object.defineProperty(newValue, '_bindings', {
                                            enumerable: false,
                                            writable: true,
                                            value: new Set(),
                                            configurable: true
                                        });
                                    }
                                    newValue._bindings.add(node.ownerElement._actualBinding);
                                    LyteComponent.establishBindings(node.ownerElement._actualBinding, newValue);
                                }
                                if (node.nodeName === "object") {
                                    LyteComponent.removeSelectedBindingDeep(node.ownerElement._propBindingObject, oldValue);
                                }
                                //console.log("old Value ", oldValue, " new Value ", newValue);
                            }
                        }
                        parentNode.removeAttribute(node.nodeName);
                    } else {
                        if (typeof nodeValue === "boolean") {
                            parentNode._attributes = parentNode._attributes || {};
                            parentNode._attributes[node.nodeName] = nodeValue;
                            if (!nodeValue) {
                                parentNode.removeAttribute(node.nodeName);
                            } else {
                                parentNode.setAttribute(node.nodeName, "");
                            }
                        } else {
                            node.nodeValue = nodeValue = (typeof nodeValue === "undefined" ? "undefined" : _typeof(nodeValue)) === "object" ? typeof Record != "undefined" && nodeValue instanceof Record ? JSON.stringify(nodeValue.$.toJSON()) : JSON.stringify(nodeValue) : nodeValue;
                        }
                    }
                    parentNode._attributes[node.nodeName] = nodeValue;
                    if (/^(INPUT|TEXTAREA|SELECT)$/.test(parentNode.nodeName)) {
                        if (node.nodeName === "value") {
                            parentNode.value = nodeValue;
                        } else if (node.nodeName === "checked") {
                            parentNode.checked = nodeValue;
                        }
                    }
                    var isStopped = parentNode._isStopped;
                    var result = void 0;
                    switch (parentNode.getAttribute("is")) {
                        case "for":
                            this.updateForHelper(parentNode, { "type": "update" });
                            break;
                        case "if":
                            result = this.updateSwitchHelper("if", parentNode, undefined, true);
                            break;
                        case "forIn":
                            this.updateForInHelper(parentNode, { "type": "update" });
                            break;
                        case "switch":
                            this.updateSwitchHelper("switch", parentNode, undefined, true);
                            break;
                        case "component":
                            this.updateDynamicComponent(parentNode, "update");
                            break;
                        default:
                    }
                    var handleBreakOptions = void 0;
                    if (isStopped && isStopped !== result) {
                        //console.log("new value is stopped");
                        if (!result) {
                            //console.log("new value is not stopped");
                            if (isStopped === "break") {
                                handleBreakOptions = "SM";
                            } else {
                                handleBreakOptions = "SS";
                            }
                        } else if (result === "break") {
                            handleBreakOptions = "MS";
                            //console.log("old value is continue and new value is break");
                        } else {
                            handleBreakOptions = "SM";
                            //console.log("old value is break and new value is continue");
                        }
                    } else if (result === "break") {
                        handleBreakOptions = "MS";
                        //console.log("old value not stopped and new value is break");
                        //                		this.handleBreak(parentNode._contextSwitchInfo, "break");
                    } else if (result === "continue") {
                        handleBreakOptions = "SS";
                        //console.log("old value not stopped and new value is continue");
                        //                		this.handleBreak1(parentNode._contextSwitchInfo , "continue");
                    }
                    if (handleBreakOptions) {
                        this.handleBreak(parentNode._contextSwitchInfo, handleBreakOptions);
                    }
                }
            } else {
                node.nodeValue = nodeValue === undefined ? '' : nodeValue;
            }
            if (contextSwitchInfo) {
                LyteComponent.removeContext(contextSwitchInfo.node, contextSwitchArray, contextSwitchInfo, isYieldContext);
            }
        }
    }, {
        key: "handleBreak",
        value: function handleBreak(contextSwitchInfo, options) {
            if (contextSwitchInfo) {
                var forTemplate = contextSwitchInfo.node;
                var breakIndex = contextSwitchInfo.itemIndex;
                var itemValue = forTemplate.getAttribute("item");
                var forContent = contextSwitchInfo.node._forContent;
                var endIndex = options[0] === "M" ? forContent.length : breakIndex + 1;
                for (var j = breakIndex; j < endIndex; j++) {
                    var currentForContent = forContent[j];
                    for (var _i31 = 0; _i31 < currentForContent.length; _i31++) {
                        currentForContent[_i31].remove();
                        if (currentForContent[_i31]._forContent || currentForContent[_i31]._caseContent) {
                            this.removeHelpers(currentForContent[_i31]);
                        }
                    }
                    forContent[j] = [];
                    LyteComponent.removeSelectedBindingDeep(forTemplate._items[j].itemProperty, forTemplate._attributes.items[j]);
                    forTemplate._helpers[j] = [];
                    forTemplate._items[j] = { "_dynamicProperty": {}, "itemProperty": {}, "indexProperty": {} };
                }
                var length = forTemplate._attributes.items.length;
                if (options[1] === "M") {
                    this.updateForHelper(forTemplate, { firstIndex: breakIndex, secondIndex: length - breakIndex, "type": "replace" }, undefined, {});
                } else {
                    this.updateForHelper(forTemplate, { firstIndex: breakIndex, secondIndex: 1, "type": "replace" }, undefined, {});
                }
            }
        }
    }, {
        key: "createCustomEvent",
        value: function createCustomEvent(eventName, parentNode, actObj) {
            var customEvent = new CustomEvent(eventName);
            parentNode._actions[eventName] = customEvent;
            parentNode._actions[eventName].processAction = actObj;
        }
    }, {
        key: "isEmptyString",
        value: function isEmptyString(str) {
            return !(typeof str === "string") || str === "";
        }
    }, {
        key: "processArgs",
        value: function processArgs(scope, args, dynamicValues, event, node) {
            var helpers = void 0,
                j = void 0;
            dynamicValues = dynamicValues || [];
            args = Array.isArray(args) ? Array.from(args) : args;
            for (var _i32 = 0; _i32 < args.length; _i32++) {
                if (!this.isEmptyString(args[_i32])) {
                    if (args[_i32].startsWith("'") && args[_i32].endsWith("'")) {
                        args[_i32] = args[_i32].substr(1, args[_i32].length - 2);
                    } else {
                        args[_i32] = args[_i32].trim();
                        var dynamicVals = [];
                        if (event) {
                            if (args[_i32] === "event") {
                                args[_i32] = event;
                            } else if (args[_i32] === "this") {
                                args[_i32] = node;
                            } else {
                                args[_i32] = LyteComponent.get(scope.component.data, args[_i32], dynamicVals);
                            }
                        } else {
                            args[_i32] = LyteComponent.get(scope.component.data, args[_i32], dynamicVals);
                        }
                        dynamicValues.push(dynamicVals);
                    }
                } else if (args[_i32] && args[_i32].type) {
                    this.internalHelpers(scope, args, _i32, dynamicValues, event, node);
                }
            }
            return args;
        }
    }, {
        key: "internalHelpers",
        value: function internalHelpers(scope, args, i, dynamicValues, event, node) {
            //helperFunc = this.constructor.getHelper(args[i]);
            var helperFunc = args[i].value;
            var helperVal = this.processHelper({ "name": helperFunc.name, "args": this.processArgs(scope, helperFunc.args, dynamicValues, event, node) });
            args[i] = helperVal;
        }
    }, {
        key: "processHelper",
        value: function processHelper(helperFunc, node) {
            var args = [];
            if (helperFunc.name === "method") {
                args.push(this, node);
            }
            if (helperFunc.name === "lbind") {
                args.push(node.ownerElement);
            }
            if (!Lyte.Component.registeredHelpers[helperFunc.name]) {
                console.error("helper ", helperFunc.name, " is not defined");
                return;
            }
            return Lyte.Component.registeredHelpers[helperFunc.name].apply(this, args.concat(helperFunc.args));
        }
    }, {
        key: "getActionProperty",
        value: function getActionProperty(prop) {
            var hostProp = this._properties;
            var value = hostProp ? hostProp[prop].value : undefined;
            return value;
        }
    }, {
        key: "hasInternalBindings",
        value: function hasInternalBindings(content) {
            return content.match(/[(]{1}[^)]+[)]{1}/);
        }
    }, {
        key: "getArgValues",
        value: function getArgValues(argNames, properties) {
            var argValueArray = [];
            for (var _i33 = 0; _i33 < argNames.length; _i33++) {
                argValueArray.push(properties[argNames[_i33]].value);
            }
            return argValueArray;
        }
    }, {
        key: "createEventListeners",
        value: function createEventListeners(node, actionType, actObj) {
            var self = this;
            node._callee = this;
            if (!/^(focus|focusin|focusout|resize|scroll|click|dblclick|mousedown|mouseup|mousemove|mouseover|mouseout|mouseenter|mouseleave|change|select|submit|keydown|keypress|keyup|contextmenu)$/.test(actionType)) {
                var infoAttr = actionType.substr(2);
                var infoAttrVal = node.getAttribute(infoAttr);
                var evntListener = function evntListener(event) {
                    var toRemove;
                    if (!window.event) {
                        window.event = event;
                        toRemove = true;
                    }
                    LyteComponent.throwAction.call(self, self, actionType.substr(2), actObj, undefined, undefined, node, event);
                    if (toRemove) {
                        window.event = undefined;
                    }
                };
                if (Lyte.Component.registeredComponents[node.localName] && !node.component || node.tagName === "TEMPLATE" && node.getAttribute("is") === "component") {
                    node._toRegEvnts = node._toRegEvnts || {};
                    node._toRegEvnts[actionType.substr(2)] = { "listener": evntListener, "attrVal": this.tagName.toLowerCase() + " => " + actObj.name };
                } else {
                    node.setAttribute(infoAttr, this.tagName.toLowerCase() + " => " + actObj.name);
                    //Event is not in capture phase because, in capture phase, multiple event listeners in hierarchy are called from parent to child (since registration is done in that order)
                    node.addEventListener(actionType.substr(2), evntListener);
                }
                if (node.hasAttribute(actionType)) {
                    node[actionType] = undefined;
                }
                node.removeAttribute(actionType);
            }
        }
    }, {
        key: "registerYields",
        value: function registerYields() {
            this._yields = {};
            var yields = this.querySelectorAll('template[is=registerYield],template[is=yield]');
            for (var _i34 = 0; _i34 < yields.length; _i34++) {
                this._yields[yields[_i34].getAttribute("yield-name")] = yields[_i34];
            }
        }
    }, {
        key: "connectedCallback",
        value: function connectedCallback() {
            if (this.hasAttribute("lyte-rendered") || !Lyte.Component.registeredComponents[this.localName]) {
                return;
            }

            var templateAttributes = this.constructor._templateAttributes;
            if (templateAttributes && templateAttributes.attr) {
                for (var key in templateAttributes.attr) {
                    //        		let attr = templateAttributes.attr[i];
                    var attr = templateAttributes.attr[key];
                    if (!this.hasAttribute(attr.name) && !this.component.data.hasOwnProperty(attr.name) || attr.globalEvent) {
                        if (attr.globalEvent) {
                            this._evBoundEvents = this._evBoundEvents || {};
                            var actionName = attr.helperInfo.args[0];
                            var boundName = void 0;
                            if (actionName.startsWith('"') || actionName.startsWith("'")) {
                                boundName = actionName.substring(1, actionName.length - 1);
                            } else {
                                console.warn("Deprecation warning. Action name should be in quotes");
                                boundName = actionName;
                            }
                            this._evBoundEvents[attr.name] = { "name": boundName, "args": attr.helperInfo.args, "from": "component" };
                            var prevAttribute = this.getAttribute(attr.name);
                            var currentAttribute = this.constructor._template.getAttribute(attr.name);
                            //this.setAttribute("ev:"+attr.name, this.constructor._template.getAttribute(attr.name));
                            this.setAttribute(attr.name, currentAttribute + (prevAttribute ? " ; " + prevAttribute : ""));
                        } else {
                            attr.from = "component";
                            if (attr.staticValue) {
                                this.setAttribute(templateAttributes.attr[key].name, attr.staticValue);
                            } else {
                                this.setAttribute(templateAttributes.attr[key].name, "");
                                this.bindNode(this.getAttributeNode(templateAttributes.attr[key].name), [], undefined, {}, templateAttributes.attr[key], undefined, undefined, true);
                            }
                        }
                    }
                }
            }
            for (var _key8 in this._toRegEvnts) {
                this.addEventListener(_key8, this._toRegEvnts[_key8].listener);
                if (this.hasAttribute(_key8)) {
                    this.setAttribute(_key8, this.getAttribute(_key8) + " ; " + this._toRegEvnts[_key8].attrVal);
                } else {
                    this.setAttribute(_key8, this._toRegEvnts[_key8].attrVal);
                }
            }
            this._toRegEvnts = {};
            var content = this.afterConnected();
            LyteComponent.establishObserverBindings.call(this, this.constructor._observers);
            //this.establishObserverBindings();
            Object.defineProperty(this.component, '_bindings', {
                enumerable: false,
                writable: true,
                configurable: true,
                value: new Set()
            });
            this.component._bindings.add(this._properties);
            LyteComponent.establishBindings(this._properties, this.component.data);
            this.appendChild(content);
            if (this.tagName == "CRM-STAGEBOARD" || this.tagName === "TEST-COMPONENT5") {
                console.timeEnd(this.tagName);
            }
            this.setAttribute("lyte-rendered", "");
            var customEvent = new CustomEvent("onReady");
            this.dispatchEvent(customEvent);
            this.callback("didConnect");
            this.onCallBack("didConnect");
        }
    }, {
        key: "onCallBack",
        value: function onCallBack(name) {
            var callbacks = this.constructor._callBacks[name];
            if (callbacks) {
                for (var _i35 = 0; _i35 < callbacks.length; _i35++) {
                    callbacks[_i35].value.call(this.component);
                }
            }
        }
    }, {
        key: "callback",
        value: function callback(name) {
            var func = this.component[name];
            if (func) {
                func.apply(this.component);
            }
        }
    }, {
        key: "establishObserverBindings",
        value: function establishObserverBindings() {
            var observers = this.constructor._observers;
            for (var _i36 = 0; _i36 < observers.length; _i36++) {
                var props = observers[_i36].properties;
                for (var j = 0; j < props.length; j++) {
                    var actProp = void 0;
                    var isArrayObserver = false;
                    if (props[j].indexOf('.[]') !== -1) {
                        isArrayObserver = true;
                        actProp = this.getProperty(props[j].substring(0, props[j].indexOf('.[]')));
                    } else {
                        actProp = this.getProperty(props[j]);
                    }
                    if (!actProp._observers) {
                        Object.defineProperty(actProp, '_observers', {
                            value: new Set(),
                            enumerable: false,
                            writable: true,
                            configurable: true
                        });
                    }
                    actProp._observers.add({ callee: this, observer: observers[_i36], isArrayObserver: isArrayObserver });
                }
            }
        }
    }, {
        key: "removeBindings",
        value: function removeBindings(properties, actualData) {
            for (var _i37 in properties) {
                var actData = actualData[_i37];
                if (actData && actData._bindings) {
                    actData._bindings.delete(properties[_i37]);
                    //Error while trying to delete _bindings from actData when actData is of type Array
                    /*  if(!actData._bindings.size) {
                        delete actData._bindings;
                    } */
                }
                if (_typeof(properties[_i37]) === "object" && actData) {
                    this.removeBindings(properties[_i37], actData);
                }
            }
        }
    }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
            if (LyteComponent.ignoreDisconnect) {
                return;
            }
            this.component._bindings = null;
            LyteComponent.removeSelectedBindingDeep(this._properties, this.component.data);
            //      LyteComponent.removeBindings(this._properties, this.component);
            for (var key in this._properties) {
                this._properties[key] = {};
            }
            this.callback('didDestroy');
            this.onCallBack('didDestroy');
            var self = this;
            //setTimeout added to delay setting component to null until the LyteYield’s disconnectedCallbacks have been called. 
            setTimeout(function () {
                self.component.$node = null;
                self.component.__data = null;
                self.component.data.__component__ = null;
                self.component.data = null;
                self.component = null;
                self = null;
            }, 0);
            this.constructor.activeInstances--;
        }
    }], [{
        key: "getArrayIndex",
        value: function getArrayIndex(array, value) {
            for (var _i38 = 0; _i38 < array.length; _i38++) {
                if (array[_i38] === value) {
                    return _i38;
                };
            }
        }
    }, {
        key: "getTrimmedContent",
        value: function getTrimmedContent(content, position, node) {
            var dummyContent = content;
            if (node) {
                position = [];
                var parentNode = node.parentNode;
                while (true) {
                    position.unshift(this.getArrayIndex(parentNode.childNodes, node));
                    parentNode = parentNode.parentNode;
                    node = node.parentNode;
                    if (!parentNode) {
                        break;
                    }
                }
            }
            for (var _i39 = 0; _i39 < position.length; _i39++) {
                for (var j = content.childNodes.length - 1; j > position[_i39]; j--) {
                    content.childNodes[j].remove();
                }
                content = content.childNodes[position[_i39]];
            }
            return dummyContent;
        }
    }, {
        key: "updateValue",
        value: function updateValue(property, path, value) {
            var pathVals = path.split('.');
            var context = property;
            for (var _i40 = 0; _i40 < pathVals.length - 1; _i40++) {
                context = context[pathVals[_i40]];
            }
            context[pathVals[i]] = value;
        }
    }, {
        key: "createDocFragment",
        value: function createDocFragment(template) {
            var childNodes = template.cloneNode(true, "lyte").childNodes;
            //           let childNodes = template.childNodes;
            var frag = document.createDocumentFragment();
            var len = childNodes.length;
            for (var _i41 = 0; _i41 < len; _i41++) {
                frag.appendChild(childNodes[0]);
            }
            return frag;
        }
    }, {
        key: "_registerComponent",
        value: function _registerComponent(a, b) {
            var componentsDiv = LyteComponent.lyteComponentsDiv;
            if (this._template && typeof this._template === "string") {
                this._template.replace(/\\'/g, "'");
                var div = document.createElement("div");
                div.innerHTML = this._template;
                while (div.firstChild) {
                    componentsDiv.appendChild(div.firstChild);
                }
                /*        } else if(document.querySelector("#" + a)) { */
            } else if (document.querySelector("template[tag-name='" + a + "']")) {
                componentsDiv.appendChild(document.querySelector("template[tag-name='" + a + "']"));
            }
            this._template = componentsDiv.querySelector("template[tag-name='" + a + "']");
            if (!this._template) {
                return;
            }
            if (this._template && !this._template.content) {
                var frag = document.createDocumentFragment();
                var childNodes = this._template.cloneNode(true, "lyte").childNodes;
                //let childNodes = this._template.childNodes;
                var len = childNodes.length;
                for (var _i42 = 0; _i42 < len; _i42++) {
                    frag.appendChild(childNodes[0]);
                }
                this._template.content = frag;
            }
            var s = this._template.content; //)?this._template.content:document.createDocumentFragment(this._template);
            //This is used to split text nodes which contain multiple dynamic values 
            //Eg." Name is {{name}} and age is {{age}} "
            this.splitTextNodes(s);
            //This is used to find the dynamicNodes and helper nodes for the given component. 
            if (!this._dynamicNodes) {
                console.error("Component " + a + " is not compiled. Please compile using Lyte CLI. ");
            } else {
                doCompile(s, this._dynamicNodes, a);
                if (this._templateAttributes) {
                    var ta = [this._templateAttributes];
                    doCompile(this._template, ta, a);
                    this._templateAttributes = ta[0];
                    if (this._templateAttributes && this._templateAttributes.attr) {
                        var attributesT = this._template.attributes;
                        try {
                            for (var _i43 = 0; _i43 < attributesT.length; _i43++) {
                                if (!this._templateAttributes.attr[attributesT[_i43].name] && attributesT[_i43].name !== "tag-name" && attributesT[_i43].name !== "use-strict") {
                                    this._templateAttributes.attr[attributesT[_i43].name] = { "name": attributesT[_i43].name, "staticValue": attributesT[_i43].value };
                                }
                            }
                        } catch (e) {
                            console.error("Error with templateAttributes. ");
                        }
                    }
                }
            }
        }
        //This is used to split text nodes which contain multiple dynamicNodes. 

    }, {
        key: "splitTextNodes",
        value: function splitTextNodes(node) {
            if (node && node.childNodes && node.childNodes.length) {
                for (var _i44 = node.childNodes.length - 1; _i44 >= 0; _i44--) {
                    this.splitTextNodes(node.childNodes[_i44]);
                }
            }
            if (node.tagName === "TEMPLATE") {
                if (!node.content) {
                    node.content = this.createDocFragment(node);
                }
                this.splitTextNodes(node.content);
            }
            if (node.nodeType === node.TEXT_NODE) {
                var nodeValue = node.nodeValue;
                if (nodeValue) {
                    var mustacheValues = nodeValue.match(/{{[^}]*?(?:(?:('|")[^\1]*?\1)[^}]*?)*}}/g); //'
                    if (!mustacheValues) {
                        return;
                    }
                    var newNodeArray = [];
                    for (var _i45 = 0; _i45 < mustacheValues.length; _i45++) {
                        var mustacheStartIndex = nodeValue.indexOf(mustacheValues[_i45]);
                        var mustacheEndIndex = mustacheStartIndex + mustacheValues[_i45].length;
                        if (mustacheStartIndex) {
                            newNodeArray.push(document.createTextNode(nodeValue.substring(0, mustacheStartIndex)));
                        }
                        newNodeArray.push(document.createTextNode(nodeValue.substring(mustacheStartIndex, mustacheEndIndex)));
                        nodeValue = nodeValue.substring(mustacheEndIndex);
                    }
                    if (!(!nodeValue.trim() && node.nextSibling && node.nextSibling.nodeType === 3 && !node.nextSibling.nodeValue.trim())) {
                        newNodeArray.push(document.createTextNode(nodeValue));
                    }
                    node.replaceWith.apply(node, newNodeArray);
                }
            }
        }
    }, {
        key: "observedAttributes",
        get: function get() {
            var newArr = [];
            for (var _i46 = 0; _i46 < this._observedAttributes.length; _i46++) {
                newArr[_i46] = LyteComponent.String.dasherize(this._observedAttributes[_i46]);
            }
            newArr.push("lt-prop");
            return newArr;
        }
    }]);

    return customElementPrototype;
}(elementPrototype);

Function.prototype.on = function () {
    return { "type": "callBack", "value": this.type === "observer" ? this.value : this, "properties": arguments, "observes": this.type === "observer" ? this : undefined };
};
Function.prototype.observes = function () {
    return { "type": "observer", "value": this, "properties": arguments, "on": Function.prototype.on };
};
Function.prototype.computed = function () {
    return { "type": "computed", "value": this, "properties": arguments };
};

var LyteComponent = {
    "_registeredComponents": {},
    "toBeRegistered": [],
    "throwEvent": function throwEvent(eventName) {
        var self = this.$node ? this.$node : this;
        var evt = self._actions ? self._actions[eventName] : undefined;
        var customArgs = [];
        if (arguments.length > 1) {
            for (var _i47 = 1; _i47 < arguments.length; _i47++) {
                customArgs.push(arguments[_i47]);
            }
        }
        //wait for release
        //eventName = LyteComponent.String.toCamelCase(eventName);
        LyteComponent.throwAction.call(self, self._callee, eventName, undefined, true, customArgs, self);
        if (this.$node) {
            self.dispatchEvent(evt ? evt : new CustomEvent(eventName, { "detail": customArgs }));
        }
    },
    //this and scope reference should be either a node or a route.
    "throwAction": function throwAction(scope, eventName, actObj, isCustom, customArgs, node, event, hasHandled) {
        var actionsObj = void 0;
        if (this._route && isCustom) {
            scope = this._route;
            actionsObj = scope.actions || (scope.actions = {});
        } else if (this.routeName) {
            //process for the parent route and get the current component and proceed;
            var parentRoute = this.parent;
            if (parentRoute) {
                if (parentRoute.component) {
                    scope = parentRoute.component;
                    actionsObj = scope.constructor._actions;
                } else {
                    scope = parentRoute;
                    actionsObj = scope.actions || (scope.actions = {});
                }
            }
        } else if (scope) {
            actionsObj = scope.constructor._actions;
        }
        if (!scope) {
            //Only warning is thrown because, we can have a eventListener for the dom directly. 
            if (!hasHandled) {
                console.warn("Nothing handled the action " + eventName + ".");
            }
            return;
        }
        actObj = actObj ? actObj : this._actions && this._actions[eventName] ? this._actions[eventName].processAction : void 0;
        //wait for release
        /* 
        var dasherizedEventName = LyteComponent.String.dasherize(eventName);
        actObj = (actObj) ? actObj : this._actions && this._actions[dasherizedEventName]? this._actions[dasherizedEventName].processAction : void 0;     
        */
        var args = customArgs ? customArgs : [];
        if (actObj) {
            var contextSwitchArray = [];
            if (node) {
                LyteComponent.newAddContext(node, contextSwitchArray);
            }
            args.splice.apply(args, [0, 0].concat(this.processArgs(scope, actObj.args, undefined, event, node)));
            if (node) {
                LyteComponent.newRemoveContext(node, contextSwitchArray);
            }
            if (actionsObj[actObj.name]) {
                if (!isCustom) {
                    //args.unshift(window.event);
                    var parent = node.parentNode;
                    var val = actionsObj[actObj.name].apply(this.component, args);
                    hasHandled = true;
                    if (val !== false) {
                        if (actObj.from && node.getAttribute(event.type) && node._boundEvents && node._boundEvents[event.type]) {
                            var actions = node._callee.constructor._actions;
                            var _actObj3 = node._boundEvents[event.type];
                            var cloneActObj = Lyte.deepCopyObject(_actObj3);
                            cloneActObj.args.shift();
                            LyteComponent.throwAction.call(node._callee, node._callee, event.type, cloneActObj, undefined, undefined, node, event, hasHandled);
                        } else {
                            if (LyteComponent.isCustomElement(node)) {
                                scope = parent;
                            }
                            if (parent) {
                                while (parent && !parent.getAttribute(eventName) && parent.tagName != "BODY") {
                                    parent = parent.parentNode;
                                }
                                if (!parent || parent.tagName === "BODY") {
                                    return;
                                }
                                if (!parent._callee) {
                                    parent._callee = parent.getCallee ? parent.getCallee(parent) : this.getCallee(parent);
                                }
                                if (parent && event.type === eventName && !event.cancelBubble) {
                                    if (parent._evBoundEvents && parent._evBoundEvents[eventName]) {
                                        var _actObj4 = parent._evBoundEvents[eventName];
                                        var _cloneActObj3 = Lyte.deepCopyObject(_actObj4);
                                        _cloneActObj3.args.shift();
                                        LyteComponent.throwAction.call(parent._callee, parent._callee, eventName, _cloneActObj3, undefined, undefined, parent, event, hasHandled);
                                    } else if (parent && parent._boundEvents && parent._boundEvents[eventName]) {
                                        var _actObj5 = parent._boundEvents[eventName];
                                        var _cloneActObj4 = Lyte.deepCopyObject(_actObj5);
                                        _cloneActObj4.args.shift();
                                        LyteComponent.throwAction.call(parent._callee, parent._callee, eventName, _cloneActObj4, undefined, undefined, parent, event, hasHandled);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    actionsObj[actObj.name].apply(this._callee.component, args);
                    hasHandled = true;
                }
            } else {
                console.error("Action named " + actObj.name + " doesn't exist");
            }
        } else if (isCustom) {
            var eventsObj = actionsObj[eventName] || actionsObj[LyteComponent.String.toCamelCase(eventName)] || actionsObj[LyteComponent.String.dasherize(eventName)];
            if (eventsObj) {
                var scopeS = LyteComponent.isCustomElement(scope) ? scope.component : scope;
                var _val = eventsObj.apply(scopeS, args);
                //let val = eventsObj.apply(LyteComponent.isCustomElement(scope)? scope.component : scope, args);
                hasHandled = true;
                if (_val !== false) {
                    LyteComponent.throwAction.call(scope, scope._callee, eventName, actObj, isCustom, customArgs, undefined, undefined, hasHandled);
                }
            } else {
                LyteComponent.throwAction.call(scope, scope._callee, eventName, actObj, isCustom, customArgs, undefined, undefined, hasHandled);
            }
        }
    },
    "processHelperArgs": function processHelperArgs() {},
    "isControlHelper": function isControlHelper(ownerElement) {
        return ownerElement.tagName === "TEMPLATE" && ownerElement.getAttribute("is") && ownerElement.getAttribute("is") !== "component";
    },
    "isCustomElement": function isCustomElement(node, isTemplate) {
        return node.tagName === "TEMPLATE" && isTemplate || node.nodeName && node.nodeName.indexOf('-') !== -1 && (Lyte.Component.registeredComponents[node.localName] || node.tagName === "LYTE-YIELD");
    },
    "componentSet": function componentSet(key, value, forceExecute) {
        if (!forceExecute && this.get(key) === value) {
            return;
        }
        //temporary fix
        LyteComponent.set(this.data, key, value, undefined, this.$node);
    },
    "componentGet": function componentGet(key) {
        return key ? LyteComponent.get(this.data, key) : this.data;
    },
    "nodeGet": function nodeGet(key) {
        return key ? this.component.get(key) : this.component.data;
    },
    "nodeSet": function nodeSet(key, value) {
        this.component.set(key, value);
    },
    "registerComponent": function registerComponent(componentName, definition, options) {
        if (Lyte.Component.registeredComponents[componentName]) {
            console.warn("Component " + componentName + " already registered");
            return;
        }
        var customCrmComponent = void 0;
        if (LyteComponent._registeredComponents[componentName]) {
            customCrmComponent = LyteComponent._registeredComponents[componentName];
        } else {
            customCrmComponent = function (_customElementPrototy) {
                _inherits(customCrmComponent, _customElementPrototy);

                function customCrmComponent() {
                    _classCallCheck(this, customCrmComponent);

                    return _possibleConstructorReturn(this, (customCrmComponent.__proto__ || Object.getPrototypeOf(customCrmComponent)).apply(this, arguments));
                }

                return customCrmComponent;
            }(customElementPrototype);
            customCrmComponent._properties = {};
            customCrmComponent.activeInstances = 0;
            customCrmComponent.prototype.get = this.nodeGet;
            customCrmComponent.prototype.set = this.nodeSet;
            customCrmComponent.prototype.throwAction = this.throwAction;
        }
        options = options ? options : {};
        var mixinsToBeUsed = [];
        if (options.mixins) {
            options.mixins.forEach(function (mixin) {
                mixinsToBeUsed.push(Lyte.registeredMixins[mixin]);
            });
        }

        function Component() {}
        customCrmComponent.component = Component;
        Component.prototype.set = this.componentSet;
        Component.prototype.get = this.componentGet;
        Component.prototype.throwEvent = this.throwEvent;
        Component.prototype.executeMethod = LyteComponent.executeMethod;
        Component.prototype.getData = LyteComponent.componentGetData;
        Component.prototype.setData = LyteComponent.componentSetData;
        Component.prototype.getMethods = LyteComponent.componentGetMethods;
        Component.prototype.setMethods = LyteComponent.componentSetMethods;
        customCrmComponent._mixins = options.mixins;
        var mixinslen = mixinsToBeUsed.length;
        for (var _i48 = 0; _i48 < mixinslen; _i48++) {
            for (var item in mixinsToBeUsed[_i48]) {
                Component.prototype[item] = mixinsToBeUsed[_i48][item];
            }
        }
        customCrmComponent._actions = definition.actions ? definition.actions : {};
        customCrmComponent._template = definition._template;
        delete definition._template;
        customCrmComponent._dynamicNodes = definition._dynamicNodes;
        delete definition._dynamicNodes;
        customCrmComponent._templateAttributes = definition._templateAttributes;
        delete definition._templateAttributes;
        customCrmComponent._callBacks = {};
        customCrmComponent._observers = [];
        //            let properties = definition.data ? definition.data : {};
        var properties = definition.data ? definition.data : undefined;
        var methods = definition.methods ? definition.methods : {};
        //            customCrmComponent._observedAttributes = Object.keys(properties);
        customCrmComponent._observedAttributes = definition._observedAttributes || [];
        customCrmComponent._observedMethodAttributes = definition._observedMethodAttributes || {};
        delete definition._observedAttributes;
        delete definition._observedMethodAttributes;
        delete definition.data;
        delete definition.methods;
        for (var key in definition) {
            if (definition[key].type === "observer") {
                customCrmComponent._observers.push(definition[key]);
            } else if (definition[key].type === "callBack") {
                var props = definition[key].properties;
                for (var k = 0; k < props.length; k++) {
                    if (!customCrmComponent._callBacks[props[k]]) {
                        customCrmComponent._callBacks[props[k]] = [];
                    }
                    customCrmComponent._callBacks[props[k]].push(definition[key]);
                }
                if (definition[key].observes) {
                    customCrmComponent._observers.push(definition[key].observes);
                }
            } else {
                Component.prototype[key] = definition[key];
            }
        }
        //          for(let key in properties) {
        //              Component.prototype[key] = properties[key];
        //          }
        customCrmComponent._data = properties;
        customCrmComponent._methods = methods;
        customCrmComponent._registerComponent(componentName, customCrmComponent);
        Lyte.Component.registeredComponents[componentName] = true;
        if (!LyteComponent._registeredComponents[componentName]) {
            if (document.readyState === "complete" || document.readyState === "interactive") {
                // document is already ready to go
                customElements.define(componentName, customCrmComponent);
            } else {
                LyteComponent.toBeRegistered.push({ name: componentName, def: customCrmComponent });
            }
        }
        LyteComponent._registeredComponents[componentName] = customCrmComponent;
    },
    "registerHelper": function registerHelper(name, helper) {
        Lyte.Component.registeredHelpers[name] = helper;
    },
    "registerMixin": function registerMixin(name, mixin) {
        Lyte.Mixin.register.call(Lyte, name, mixin);
    },
    "update": function update(object, property, value, fromStore, oldValue, setterScope, actualProperty) {
        var fromComponent = object.__component__;
        if (!oldValue) {
            oldValue = object[property];
            if (!object.hasOwnProperty(property) && !(object instanceof Array)) {
                LyteComponent.objectFunctions(object, "add", property, value, true);
            }
            if (fromComponent && fromComponent.tagName !== "LYTE-YIELD") {
                var error = Lyte.validate(object, property, value, fromComponent.component);
                if (error) {
                    LyteComponent.set(fromComponent.component.data.errors, property, error);
                    return;
                } else {
                    if (fromComponent.component.data.errors[property]) {
                        Lyte.objectUtils(fromComponent.component.data.errors, "delete", property);
                    }
                    object[property] = value;
                }
            } else {
                object[property] = value;
            }
        }
        var toBeExecuted = fromComponent ? true : false;
        if (fromComponent && actualProperty && typeof value === "string" && fromComponent.getAttribute(LyteComponent.String.dasherize(property)) !== value) {
            var dasherizedAttr = LyteComponent.String.dasherize(property);
            var ltProp = void 0;
            if (!(dasherizedAttr.startsWith("lt-prop") && (ltProp = fromComponent.ltProp()) && ltProp.hasOwnProperty(LyteComponent.String.toCamelCase(dasherizedAttr.substring(8))))) {
                fromComponent.setAttribute(LyteComponent.String.dasherize(property), value);
            }
        }
        if (value && typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number") {
            //newValue is of type object 

            if (oldValue && (typeof oldValue === "undefined" ? "undefined" : _typeof(oldValue)) === "object" && oldValue._bindings) {
                //Both oldValue and newValue are objects. 
                if (!value._bindings) {
                    Object.defineProperty(value, '_bindings', {
                        enumerable: false,
                        writable: true,
                        value: new Set(),
                        configurable: true
                    });
                }
                //for changing only child component
                if (fromComponent && fromComponent.component.data === object && property.indexOf('.') === -1) {
                    var bindings = fromComponent.getProperty(property);
                    this.removeSelectedBindingDeep(bindings, oldValue);
                    value._bindings.add(bindings);
                    this.establishBindings(bindings, value);
                    //For removing binding in the object due to forIn Helper ( actual object binding and not the _dynamicNodes binding).
                    if (bindings._forHelpers) {
                        var bindfor = bindings._forHelpers.toArray();
                        for (var i = 0; i < bindfor.length; i++) {
                            var item = bindfor[i];
                            if (item._propBindingObject) {
                                this.removeSelectedBindingDeep(item._propBindingObject, oldValue);
                                //                                  value._bindings.add(item._propBindingObject);
                                //                                  this.establishBindings(item._propBindingObject, value);
                            }
                        }
                    }
                    this.affectChanges(bindings, undefined, oldValue, setterScope, object[property]);
                } else {
                    //To change only the bindings present in the object and not all the bindings present in the oldValue.
                    if (object._bindings) {
                        var oldbind = object._bindings.toArray();
                        for (var _i49 = 0; _i49 < oldbind.length; _i49++) {
                            var _item = oldbind[_i49][property];
                            if (_item) {
                                this.removeSelectedBindingDeep(_item, oldValue);
                                value._bindings.add(_item);
                                this.establishBindings(_item, value);
                                //For removing binding in the object due to forIn Helper ( actual object binding and not the _dynamicNodes binding).
                                if (_item._forHelpers) {
                                    var forbind = _item._forHelpers.toArray();
                                    for (var j = 0; j < forbind.length; j++) {
                                        var itemBinding = forbind[j];
                                        if (itemBinding._propBindingObject) {
                                            this.removeSelectedBindingDeep(itemBinding._propBindingObject, oldValue);
                                        }
                                    }
                                }
                                this.affectChanges(_item, undefined, oldValue, setterScope, object[property]);
                            }
                        }
                    }
                }
            } else {
                //newValue is object and oldValue is string. Hence establish bindings from oldValue's object and place it in the newValue. 
                if (!value._bindings) {
                    Object.defineProperty(value, "_bindings", {
                        enumerable: false,
                        writable: true,
                        value: new Set(),
                        configurable: true
                    });
                }
                if (object._bindings) {
                    var objbind = object._bindings.toArray();
                    for (var _i50 = 0; _i50 < objbind.length; _i50++) {
                        var _item2 = objbind[_i50];
                        if (_item2[property]) {
                            value._bindings.add(_item2[property]);
                            this.establishBindings(_item2[property], value);
                            this.affectChanges(_item2[property], undefined, oldValue, setterScope, object[property]);
                        }
                    }
                }
            }
        } else {
            //newValue is string

            if (oldValue && (typeof oldValue === "undefined" ? "undefined" : _typeof(oldValue)) === "object" && oldValue._bindings) {
                //newValue is string and oldValue is object 
                var _objbind = object._bindings.toArray();
                for (var _i51 = 0; _i51 < _objbind.length; _i51++) {
                    var _item3 = _objbind[_i51];
                    if (_item3[property]) {
                        //oldValue._bindings.delete(item[property]);
                        //if(oldValue._bindings.size === 0) {
                        //  delete oldValue._bindings;
                        //  break;
                        //}
                        this.removeSelectedBindingDeep(_item3[property], oldValue);
                        if (_item3[property]._forHelpers) {
                            var _forbind = _item3[property]._forHelpers.toArray();
                            for (var _j3 = 0; _j3 < _forbind.length; _j3++) {
                                var _itemBinding = _forbind[_j3];
                                if (_itemBinding._propBindingObject) {
                                    this.removeSelectedBindingDeep(_itemBinding._propBindingObject, oldValue);
                                }
                            }
                        }
                    }
                }
            }

            //when newValue and oldValue , both are string, no need to change bindings. 
            if (object._bindings) {
                var _objbind2 = object._bindings.toArray();
                for (var _i52 = 0; _i52 < _objbind2.length; _i52++) {
                    var _item4 = _objbind2[_i52];
                    if (_item4[property]) {
                        this.affectChanges(_item4[property], undefined, oldValue, setterScope, object[property]);
                    }
                }
            }
        }
        if (toBeExecuted && fromComponent._attributeDetails) {
            //let syntaxValue = fromComponent.getAttributeNode(property).syntaxValue;
            var attrDetail = fromComponent._attributeDetails[LyteComponent.String.dasherize(property)];
            var syntaxValue = void 0;
            if (attrDetail && attrDetail.isLbind) {
                syntaxValue = attrDetail.dynamicValue;
            }
            if (syntaxValue) {
                var contextSwitchArray = void 0;
                if (fromComponent._contextSwitchInfo) {
                    contextSwitchArray = [];
                    LyteComponent.changeContext(fromComponent._contextSwitchInfo.node, contextSwitchArray, fromComponent._contextSwitchInfo);
                }
                var obj = LyteComponent.getNew(fromComponent._callee.component.data, syntaxValue);
                var exec = false;
                if (obj.context === fromComponent._callee.component.data) {
                    if (fromComponent._callee._properties[obj.lastKey] && fromComponent._callee._properties[obj.lastKey].__fromComponent) {
                        exec = true;
                    }
                } else {
                    exec = true;
                }
                //self.setData(this._lbind,this.value);
                if (exec) {
                    LyteComponent.set(obj.context, obj.lastKey, value, undefined, fromComponent._callee);
                }
                if (contextSwitchArray) {
                    LyteComponent.removeContext(fromComponent._contextSwitchInfo.node, contextSwitchArray, fromComponent._contextSwitchInfo);
                }
            }
        }
    },
    "set": function set(object, property, value, fromStore) {
        if (typeof property === "string" && object[property] === value) {
            return;
        }
        var lastIndex = -1;
        var actualProperty = property;
        if (!(property instanceof Object)) {
            lastIndex = property.lastIndexOf('.');
        }
        if (lastIndex !== -1) {
            var outerPropertyPath = property.substring(0, lastIndex);
            property = property.substring(lastIndex + 1);
            object = LyteComponent.get(object, outerPropertyPath);
        }
        var oldValues = [];
        if (object._setterScope) {
            var setterScope = object._setterScope;
        }
        actualProperty = actualProperty === property ? actualProperty : undefined;
        if (property instanceof Object) {
            if (Lyte.isRecord(object) && !fromStore) {
                for (var key in property) {
                    if (Array.isArray(object[key])) {
                        oldValues.push({ key: key, oldValue: object[key].slice(0) });
                    } else {
                        oldValues.push({ key: key, oldValue: object[key] });
                    }
                }
                var record = store.$.setData(object.$, property);
                if (record.$.isError) {
                    return record;
                }
                for (var _i53 = 0; _i53 < oldValues.length; _i53++) {
                    LyteComponent.update(object, oldValues[_i53].key, object[oldValues[_i53].key], fromStore, oldValues[_i53].oldValue === undefined ? null : oldValues[_i53].oldValue, setterScope, actualProperty);
                }
            } else {
                //object[property] =  value;
                for (var _key9 in property) {
                    LyteComponent.update(object, _key9, property[_key9], fromStore, undefined, setterScope, actualProperty);
                }
            }
        } else {
            if (Lyte.isRecord(object) && !fromStore) {
                var old = object[property];
                var _record = store.$.setData(object.$, property, value);
                if (_record.$.isError) {
                    return _record;
                }
                LyteComponent.update(object, property, value, fromStore, old === undefined ? null : old, setterScope, actualProperty);
            } else {
                LyteComponent.update(object, property, value, fromStore, undefined, setterScope, actualProperty);
            }
        }
    },
    "newAddContext": function newAddContext(node, contextSwitchArray) {
        var isYield = node.tagName === "LYTE-YIELD";
        if (node._contextSwitchInfo) {
            LyteComponent.changeContext(node._contextSwitchInfo.node, contextSwitchArray, node._contextSwitchInfo, isYield);
        } else if (isYield && node._callee._contextSwitchInfo) {
            LyteComponent.changeContext(node._callee._contextSwitchInfo.node, contextSwitchArray, node._callee._contextSwitchInfo, true);
        }
    },
    "newRemoveContext": function newRemoveContext(node, contextSwitchArray) {
        var isYield = node.tagName === "LYTE-YIELD";
        if (node._contextSwitchInfo) {
            LyteComponent.removeContext(node._contextSwitchInfo.node, contextSwitchArray, node._contextSwitchInfo, isYield);
        } else if (isYield && node._callee._contextSwitchInfo) {
            LyteComponent.removeContext(node._callee._contextSwitchInfo.node, contextSwitchArray, node._callee._contextSwitchInfo, true);
        }
    },
    "changeContext": function changeContext(node, contextSwitchArray, contextSwitchInfo, proceedFurther) {
        if (!contextSwitchInfo) {
            return;
        }
        if (node._contextSwitchInfo) {
            LyteComponent.changeContext(node._contextSwitchInfo.node, contextSwitchArray, node._contextSwitchInfo, node.tagName === "LYTE-YIELD" || proceedFurther);
        } else if ((node.tagName === "LYTE-YIELD" || proceedFurther) && node._callee && node._callee._contextSwitchInfo) {
            LyteComponent.changeContext(node._callee._contextSwitchInfo.node, contextSwitchArray, node._callee._contextSwitchInfo);
        }
        var indexValue = void 0,
            itemValue = void 0;
        if (contextSwitchInfo.type) {
            if (contextSwitchInfo.type === "for") {
                indexValue = node.getAttribute("index");
                itemValue = node.getAttribute("item");
                if (node._items.length === 0) {
                    return;
                }
            } else {
                indexValue = node.getAttribute("key");
                itemValue = node.getAttribute("value");
                if (Object.keys(node._items).length === 0) {
                    return;
                }
            }
            var callee = node._callee;
            var initialItemValue = callee.component.data[itemValue];
            var initialIndexValue = callee.component.data[indexValue];
            var initialItemProp = callee._properties[itemValue];
            var initialIndexProp = callee._properties[indexValue];
            var items = contextSwitchInfo.type === "for" ? node._attributes.items : node._attributes.object;
            callee.component.data[itemValue] = items[contextSwitchInfo.itemIndex];
            callee.component.data[indexValue] = contextSwitchInfo.itemIndex;
            callee._properties[itemValue] = node._items[contextSwitchInfo.itemIndex].itemProperty;
            callee._properties[indexValue] = {};
            var dummyObject = { "initialItemValue": initialItemValue, "initialIndexValue": initialIndexValue, "initialItemProp": initialItemProp, "initialIndexProp": initialIndexProp };
            contextSwitchArray.push(dummyObject);
        } else {
            //handling for yield
            var _dummyObject = {};
            var _callee = node._callee._callee;
            Object.keys(contextSwitchInfo.node._properties).forEach(function (key) {
                _dummyObject[key] = {};
                _dummyObject[key].value = _callee.component.data[key];
                _dummyObject[key].property = _callee._properties[key];
                _callee._properties[key] = contextSwitchInfo.node._properties[key];
                _callee.component.data[key] = contextSwitchInfo.node.component.data[key];
            });
            contextSwitchArray.push(_dummyObject);
        }
    },
    "removeContext": function removeContext(node, contextSwitchArray, contextSwitchInfo, proceedFurther) {
        if (!contextSwitchInfo) {
            return;
        }
        if (node._contextSwitchInfo) {
            LyteComponent.removeContext(node._contextSwitchInfo.node, contextSwitchArray, node._contextSwitchInfo, node.tagName === "LYTE-YIELD" || proceedFurther);
        } else if ((node.tagName === "LYTE-YIELD" || proceedFurther) && node._callee && node._callee._contextSwitchInfo) {
            LyteComponent.removeContext(node._callee._contextSwitchInfo.node, contextSwitchArray, node._callee._contextSwitchInfo);
        }
        var indexValue = void 0,
            itemValue = void 0;
        if (contextSwitchInfo.type) {
            if (contextSwitchInfo.type === "for") {
                indexValue = node.getAttribute("index");
                itemValue = node.getAttribute("item");
                if (node._items.length === 0) {
                    return;
                }
            } else {
                indexValue = node.getAttribute("key");
                itemValue = node.getAttribute("value");
                if (Object.keys(node._items).length === 0) {
                    return;
                }
            }
            var callee = node._callee;
            var items = node._attributes.items;
            var removedObject = contextSwitchArray.shift();
            callee.component.data[itemValue] = removedObject.initialItemValue;
            callee.component.data[indexValue] = removedObject.initialIndexValue;
            callee._properties[itemValue] = removedObject.initialItemProp;
            callee._properties[indexValue] = removedObject.initialIndexProp;
        } else {
            var _callee2 = node._callee._callee;
            var _removedObject = contextSwitchArray.shift();
            Object.keys(contextSwitchInfo.node._properties).forEach(function (key) {
                _callee2.component.data[key] = _removedObject[key].value;
                _callee2._properties[key] = _removedObject[key].property;
            });
        }
    },
    "objectFunctions": function objectFunctions() {
        var object = arguments[0];
        var functionName = arguments[1];
        var property = arguments[2];
        var newValue = arguments[3];
        var fromComponent = arguments[4];
        if (functionName === "add" && !fromComponent) {
            LyteComponent.set(object, property, newValue);
            return;
        }
        var options = {};
        options.type = functionName;
        options.property = property;
        if (!/^(add|delete)$/.test(functionName)) {
            console.error("No such function exists in objectFunctions");
            return;
        }
        var bindings = object._bindings;
        if (functionName === "delete") {
            LyteComponent.set(object, property, undefined);
        }
        if (bindings) {
            var bind = bindings.toArray();
            for (var _i54 = 0; _i54 < bind.length; _i54++) {
                var binding = bind[_i54];
                var forHelpers = binding._forHelpers;
                if (forHelpers) {
                    var helperBind = forHelpers.toArray();
                    for (var j = 0; j < helperBind.length; j++) {
                        var forHelper = helperBind[j];
                        var itemValue = forHelper.getAttribute("key");
                        //Need to check
                        //                            LyteComponent.removeSelectedBindingDeep({[itemValue] :                        forHelper._items[property].itemProperty}, {[itemValue] : object[property]});
                        var contextSwitchArray = [];
                        if (functionName === "add") {
                            LyteComponent.newAddContext(forHelper, contextSwitchArray);
                        }
                        forHelper._callee.updateForInHelper(forHelper, options);
                        if (functionName === "add") {
                            LyteComponent.newRemoveContext(forHelper, contextSwitchArray);
                        }
                    }
                }
            }
        }
        if (functionName === "delete") {
            delete object[property];
        }
    },
    "arrayFunctions": function arrayFunctions() {
        var array = arguments[0];
        var functionName = arguments[1];
        if (/^(replaceAt|removeAt|shift)$/.test(functionName) && !array.length) {
            console.warn(functionName + " operation cannot be performed on empty array");
            return;
        }
        switch (functionName) {
            case "replaceAt":
                {
                    var index = parseInt(arguments[2]);
                    if (index > array.length) {
                        console.warn("index provided for replaceAt is greater than array length");
                        return [];
                    }
                    //let args = Array.prototype.slice.call(arguments, 3);
                    var args = arguments[3];
                    if (!(args instanceof Array)) {
                        args = [args];
                    }
                    var deletedItems = array.splice.apply(array, [index, 1].concat(args));
                    var options = { "firstIndex": index, "secondIndex": args.length, "type": "replace" };
                    //All references updated by now

                    //remove binding from previous object
                    if (array._bindings) {
                        var objbind = array._bindings.toArray();
                        for (var _i55 = 0; _i55 < objbind.length; _i55++) {
                            var item = objbind[_i55];
                            if (item._forHelpers) {
                                var helperbind = item._forHelpers.toArray();
                                for (var _j4 = 0; _j4 < helperbind.length; _j4++) {
                                    var helper = helperbind[_j4];
                                    var finalIndex = index + deletedItems.length;
                                    var itemValue = helper.getAttribute("item");
                                    for (var _i56 = index, _j5 = 0; _i56 < finalIndex; _i56++, _j5++) {
                                        LyteComponent.removeSelectedBindingDeep(_defineProperty({}, itemValue, helper._items[_i56].itemProperty), _defineProperty({}, itemValue, deletedItems[_j5]));
                                    }
                                    var contextSwitchArray = [];
                                    LyteComponent.newAddContext(helper, contextSwitchArray);
                                    helper._callee.updateForHelper(helper, options);
                                    LyteComponent.newRemoveContext(helper, contextSwitchArray);
                                }
                            }
                            for (var key in item) {
                                var parsedKey = parseInt(key);
                                if (!isNaN(parsedKey) && parsedKey >= options.firstIndex) {
                                    var diff = parsedKey - options.firstIndex;
                                    var _oldObject = void 0;
                                    if (diff <= options.thirdIndex) {
                                        _oldObject = deletedItems[diff];
                                    } else {
                                        _oldObject = array[options.firstIndex - 1 + options.secondIndex + diff];
                                    }
                                    this.removeSelectedBindingDeep(item[key], _oldObject);
                                    if (item[key]._forHelpers) {
                                        var bindfor = item[key]._forHelpers.toArray();
                                        for (var j = 0; j < bindfor.length; j++) {
                                            var item1 = bindfor[j];
                                            if (item1._propBindingObject) {
                                                this.removeSelectedBindingDeep(item1._propBindingObject, _oldObject);
                                                //                                          value._bindings.add(item._propBindingObject);
                                                //                                          this.establishBindings(item._propBindingObject, value);
                                            }
                                        }
                                    }
                                    if (array[parsedKey]) {
                                        if (!array[parsedKey]._bindings) {
                                            Object.defineProperty(array[parsedKey], '_bindings', {
                                                enumerable: false,
                                                writable: true,
                                                value: new Set(),
                                                configurable: true
                                            });
                                        }
                                        this.establishBindings({ "dummy": item[key] }, { "dummy": array[parsedKey] });
                                    }
                                    this.affectChanges(item[key]);
                                }
                            }
                        }
                    }
                    LyteComponent.callArrayObservers(array, { type: "array", insertedItems: args, index: index });
                    return deletedItems[0];
                }
                break;
            case "splice":
                {
                    var _index3 = parseInt(arguments[2]);
                    if (_index3 > array.length) {
                        console.warn("index provided for replaceAt is greater than array length");
                        return [];
                    }
                    //let args = Array.prototype.slice.call(arguments, 3);
                    var toBeDeleted = arguments[3];
                    var _args = arguments[4];
                    if (!(_args instanceof Array)) {
                        _args = [_args];
                    }
                    var _deletedItems = array.splice.apply(array, [_index3, toBeDeleted].concat(_args));
                    var _options = { "firstIndex": _index3, "secondIndex": _args.length, "thirdIndex": toBeDeleted, "type": "splice" };
                    //All references updated by now

                    //remove binding from previous object
                    if (array._bindings) {
                        var _objbind3 = array._bindings.toArray();
                        for (var _i57 = 0; _i57 < _objbind3.length; _i57++) {
                            var _item5 = _objbind3[_i57];
                            if (_item5._forHelpers) {
                                var _helperbind = _item5._forHelpers.toArray();
                                for (var _j6 = 0; _j6 < _helperbind.length; _j6++) {
                                    var _helper = _helperbind[_j6];
                                    var _finalIndex = _index3 + _deletedItems.length;
                                    var _itemValue = _helper.getAttribute("item");
                                    for (var _i58 = _index3, _j7 = 0; _i58 < _finalIndex; _i58++, _j7++) {
                                        LyteComponent.removeSelectedBindingDeep(_defineProperty({}, _itemValue, _helper._items[_i58].itemProperty), _defineProperty({}, _itemValue, _deletedItems[_j7]));
                                    }
                                    var _contextSwitchArray = [];
                                    LyteComponent.newAddContext(_helper, _contextSwitchArray);
                                    _helper._callee.updateForHelper(_helper, _options);
                                    LyteComponent.newRemoveContext(_helper, _contextSwitchArray);
                                }
                            }
                            for (var _key10 in _item5) {
                                var _parsedKey = parseInt(_key10);
                                if (!isNaN(_parsedKey) && _parsedKey >= _options.firstIndex) {
                                    var _diff = _parsedKey - _options.firstIndex;
                                    var _oldObject2 = void 0;
                                    if (_diff <= _options.thirdIndex) {
                                        _oldObject2 = _deletedItems[_diff];
                                    } else {
                                        _oldObject2 = array[_options.firstIndex - _options.thirdIndex + _options.secondIndex + _diff];
                                    }
                                    this.removeSelectedBindingDeep(_item5[_key10], _oldObject2);
                                    if (_item5[_key10]._forHelpers) {
                                        var _bindfor = _item5[_key10]._forHelpers.toArray();
                                        for (var j = 0; j < _bindfor.length; j++) {
                                            var _item6 = _bindfor[j];
                                            if (_item6._propBindingObject) {
                                                this.removeSelectedBindingDeep(_item6._propBindingObject, _oldObject2);
                                                //                                          value._bindings.add(item._propBindingObject);
                                                //                                          this.establishBindings(item._propBindingObject, value);
                                            }
                                        }
                                    }
                                    if (array[_parsedKey]) {
                                        if (!array[_parsedKey]._bindings) {
                                            Object.defineProperty(array[_parsedKey], '_bindings', {
                                                enumerable: false,
                                                writable: true,
                                                value: new Set(),
                                                configurable: true
                                            });
                                        }
                                        this.establishBindings({ "dummy": _item5[_key10] }, { "dummy": array[_parsedKey] });
                                    }
                                    this.affectChanges(_item5[_key10]);
                                }
                            }
                        }
                    }
                    LyteComponent.callArrayObservers(array, { type: 'array', index: _index3, insertedItems: _args, removedItems: _deletedItems });
                    return _deletedItems;
                }
                break;
            case "push":
                {
                    var toPush = arguments[2];
                    if (!(toPush instanceof Array)) {
                        toPush = [toPush];
                    }
                    LyteComponent.arrayFunctions(array, 'insertAt', array.length, toPush);
                }
                break;
            case "pop":
                return LyteComponent.arrayFunctions(array, 'remove', array.length - 1)[0];
                break;
            case "shift":
            case "shiftObject":
                return LyteComponent.arrayFunctions(array, 'remove', 0)[0];
                break;
            case "removeAt":
            case "remove":
                {
                    var _index4 = parseInt(arguments[2]);
                    if (_index4 > array.length) {
                        console.warn("index provided for removeAt is greater than array length");
                        return [];
                    }
                    var length = arguments[3] ? parseInt(arguments[3]) : 1;
                    var _options2 = { "firstIndex": _index4, "secondIndex": length, "type": "remove" };
                    var _deletedItems2 = array.splice(_index4, length);
                    if (array._bindings) {
                        var _objbind4 = array._bindings.toArray();
                        for (var _i59 = 0; _i59 < _objbind4.length; _i59++) {
                            var _item7 = _objbind4[_i59];
                            if (_item7._forHelpers) {
                                var _helperbind2 = _item7._forHelpers.toArray();
                                for (var _j8 = 0; _j8 < _helperbind2.length; _j8++) {
                                    var _helper2 = _helperbind2[_j8];
                                    var _finalIndex2 = _index4 + _deletedItems2.length;
                                    var _itemValue2 = _helper2.getAttribute("item");
                                    for (var _i60 = _index4, _j9 = 0; _i60 < _finalIndex2; _i60++, _j9++) {
                                        LyteComponent.removeSelectedBindingDeep(_defineProperty({}, _itemValue2, _helper2._items[_i60].itemProperty), _defineProperty({}, _itemValue2, _deletedItems2[_j9]));
                                    }
                                    var _contextSwitchArray2 = [];
                                    LyteComponent.newAddContext(_helper2, _contextSwitchArray2);
                                    _helper2._callee.updateForHelper(_helper2, _options2);
                                    LyteComponent.newRemoveContext(_helper2, _contextSwitchArray2);
                                }
                            }
                            for (var _key11 in _item7) {
                                var _parsedKey2 = parseInt(_key11);
                                if (!isNaN(_parsedKey2) && _parsedKey2 >= _options2.firstIndex) {
                                    var _diff2 = _parsedKey2 - _options2.firstIndex;
                                    var _oldObject3 = void 0;
                                    if (_diff2 < _options2.secondIndex) {
                                        _oldObject3 = _deletedItems2[_diff2];
                                    } else {
                                        _oldObject3 = array[_options2.firstIndex - _options2.secondIndex + _diff2];
                                    }
                                    this.removeSelectedBindingDeep(_item7[_key11], _oldObject3);
                                    if (_item7[_key11]._forHelpers) {
                                        var _bindfor2 = _item7[_key11]._forHelpers.toArray();
                                        for (var j = 0; j < _bindfor2.length; j++) {
                                            var _item8 = _bindfor2[j];
                                            if (_item8._propBindingObject) {
                                                this.removeSelectedBindingDeep(_item8._propBindingObject, _oldObject3);
                                                //                                          value._bindings.add(item._propBindingObject);
                                                //                                          this.establishBindings(item._propBindingObject, value);
                                            }
                                        }
                                    }
                                    if (array[_parsedKey2]) {
                                        if (!array[_parsedKey2]._bindings) {
                                            Object.defineProperty(array[_parsedKey2], '_bindings', {
                                                enumerable: false,
                                                writable: true,
                                                value: new Set(),
                                                configurable: true
                                            });
                                        }
                                        this.establishBindings({ "dummy": _item7[_key11] }, { "dummy": array[_parsedKey2] });
                                    }
                                    this.affectChanges(_item7[_key11]);
                                }
                            }
                        }
                    }
                    LyteComponent.callArrayObservers(array, { type: "array", removedItems: _deletedItems2, index: _index4 });
                    return _deletedItems2;
                }
                break;
            case "unshift":
            case "unshiftObject":
            case "unshiftObjects":
                //LyteComponent.arrayFunctions.apply(LyteComponent, [array, 'insertAt', 0].concat(Array.prototype.slice.call(arguments, 2)));
                {
                    var _toPush = arguments[2];
                    if (!(_toPush instanceof Array)) {
                        _toPush = [_toPush];
                    }
                    LyteComponent.arrayFunctions(array, 'insertAt', 0, _toPush);
                }
                break;
            case "insertAt":
                {
                    var _index5 = parseInt(arguments[2]);
                    //let args = Array.prototype.slice.call(arguments, 3);
                    var _args2 = arguments[3];
                    var len = _args2.length;
                    if (!(_args2 instanceof Array)) {
                        _args2 = [_args2];
                    }
                    for (var _i61 = _index5; _i61 > array.length; _i61--) {
                        _args2.unshift(undefined);
                        _index5--;
                    }
                    var _options3 = { "firstIndex": _index5, "secondIndex": _args2.length, "type": "insert" };
                    array.splice.apply(array, [_index5, 0].concat(_args2));
                    if (array._bindings) {
                        var arrbind = array._bindings.toArray();
                        for (var _i62 = 0; _i62 < arrbind.length; _i62++) {
                            var _item9 = arrbind[_i62];
                            if (_item9._forHelpers) {
                                var forbind = _item9._forHelpers.toArray();
                                for (var _j10 = 0; _j10 < forbind.length; _j10++) {
                                    var _helper3 = forbind[_j10];
                                    var _contextSwitchArray3 = [];
                                    LyteComponent.newAddContext(_helper3, _contextSwitchArray3);
                                    _helper3._callee.updateForHelper(_helper3, _options3);
                                    LyteComponent.newRemoveContext(_helper3, _contextSwitchArray3);
                                }
                            }
                            for (var _key12 in _item9) {
                                var _parsedKey3 = parseInt(_key12);
                                if (!isNaN(_parsedKey3) && _parsedKey3 >= _options3.firstIndex) {
                                    this.removeSelectedBindingDeep(_item9[_key12], array[_parsedKey3 + _options3.secondIndex]);
                                    if (_item9[_key12]._forHelpers) {
                                        var _bindfor3 = _item9[_key12]._forHelpers.toArray();
                                        for (var j = 0; j < _bindfor3.length; j++) {
                                            var _item10 = _bindfor3[j];
                                            if (_item10._propBindingObject) {
                                                this.removeSelectedBindingDeep(_item10._propBindingObject, oldObject);
                                                //                                          value._bindings.add(item._propBindingObject);
                                                //                                          this.establishBindings(item._propBindingObject, value);
                                            }
                                        }
                                    }
                                    if (array[_parsedKey3]) {
                                        if (!array[_parsedKey3]._bindings) {
                                            Object.defineProperty(array[_parsedKey3], '_bindings', {
                                                enumerable: false,
                                                writable: true,
                                                value: new Set(),
                                                configurable: true
                                            });
                                        }
                                        this.establishBindings({ "dummy": _item9[_key12] }, { "dummy": array[_parsedKey3] });
                                    }
                                    this.affectChanges(_item9[_key12]);
                                }
                            }
                        }
                    }
                    LyteComponent.callArrayObservers(array, { type: "array", insertedItems: !(arguments[3] instanceof Array) ? [arguments[3]] : arguments[0].slice(parseInt(arguments[2]), len + 1), index: parseInt(arguments[2]) });
                }
                break;
            case "concat":
                //LyteComponent.arrayFunctions.apply(LyteComponent, [array, 'insertAt',array.length].concat(arguments[2]));
                LyteComponent.arrayFunctions(array, 'insertAt', array.length, arguments[2]);
                break;
            default:
                console.error("array Function " + functionName + " doesn't exist");
                return;
        }
    },
    "callArrayObservers": function callArrayObservers(array, args) {
        if (array._bindings) {
            var objbind = array._bindings.toArray();
            for (var _i63 = 0; _i63 < objbind.length; _i63++) {
                var binding = objbind[_i63];
                var path = objbind[_i63]._path;
                if (binding._observers) {
                    var obsbind = binding._observers.toArray();
                    for (var j = 0; j < obsbind.length; j++) {
                        var observer = obsbind[j];
                        if (observer.isArrayObserver) {
                            if (args) {
                                args.item = path;
                            }
                            observer.observer.value.call(observer.callee && observer.callee.component ? observer.callee.component : array._setterScope ? array._setterScope : window, args);
                        }
                    }
                }
                if (binding.length) {
                    this.affectChanges(binding.length);
                }
            }
        }
    },
    "establishUpdateBindings": function establishUpdateBindings(bindings, property, actualData) {
        var objbind = bindings.toArray();
        for (var _i64 = 0; _i64 < objbind.length; _i64++) {
            var item = objbind[_i64];
            if (item[property]) {
                if (!actualData._bindings) {
                    Object.defineProperty(actualData, "_bindings", {
                        value: new Set(),
                        enumerable: false,
                        configurable: true,
                        writable: true
                    });
                }
                actualData._bindings.add(item[property]);
                this.establishBindings(item[property], actualData);
            }
        }
    },
    "establishSelectedBinding": function establishSelectedBinding(property, actualData, node) {
        if (!property) {
            return;
        }
        var propName = property._path;
        var props = propName.split('.');
        var currentProp = node.getProperty(props[0]);
        var currentValue = actualData[props[0]];
        for (var _i65 = 0; _i65 < props.length - 1; _i65++) {
            if ((typeof currentValue === "undefined" ? "undefined" : _typeof(currentValue)) !== "object") {
                break;
            }
            if (!currentValue._bindings) {
                Object.defineProperty(currentValue, '_bindings', {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: new Set()
                });
            }
            currentValue._bindings.add(currentProp);
            currentProp = currentProp[props[_i65 + 1]];
            currentValue = currentValue[props[_i65 + 1]];
        }
    },
    "establishBindings": function establishBindings(properties, actualData) {
        if (properties._helperNodes) {
            var path = properties._path;
            var arr = properties._helperNodes.toArray();
            for (var s = 0; s < arr.length; s++) {
                var nodes = arr[s]._dynamicProperty ? arr[s]._dynamicProperty[path] : undefined;
                if (nodes) {
                    for (var j = 0; j < nodes.length; j++) {
                        var node = nodes[j];
                        var helper = node.ownerElement;
                        if (helper && helper.tagName === "TEMPLATE" && helper.getAttribute("is") === "for") {
                            if (helper._items) {
                                var item = helper.getAttribute("item");
                                for (var _i66 = 0; _i66 < helper._items.length; _i66++) {
                                    var _data = actualData[_i66];
                                    var _item11 = helper.getAttribute("item");
                                    if (_data) {
                                        if (_typeof(helper._items[_i66]) === "object") {
                                            this.establishBindings(helper._items[_i66].itemProperty, _defineProperty({}, _item11, _data));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var _i67 in properties) {
            var actData = actualData[_i67];
            if (!actData || typeof actData === "string" || typeof actData === "number" || typeof actData === "boolean") {
                if (!actualData._bindings) {
                    Object.defineProperty(actualData, "_bindings", {
                        value: new Set(),
                        enumerable: false,
                        writable: true,
                        configurable: true
                    });
                }
                actualData._bindings.add(properties);
            } else {
                if (!actData._bindings) {
                    Object.defineProperty(actData, '_bindings', {
                        value: new Set(),
                        enumerable: false,
                        writable: true,
                        configurable: true
                    });
                }
                actData._bindings.add(properties[_i67]);
                if (_typeof(properties[_i67]) === "object") {
                    this.establishBindings(properties[_i67], actData);
                }
            }
        }
    },
    "removeSelectedBindingDeep": function removeSelectedBindingDeep(binding, actualData) {
        if (!actualData) {
            return;
        }
        if (actualData._bindings) {
            actualData._bindings.delete(binding);
            if (!actualData._bindings.size) {
                delete actualData._bindings;
            }
        }
        for (var _i68 in binding) {
            var actData = actualData[_i68];
            if (actData && actData._bindings) {
                actData._bindings.delete(binding[_i68]);
                if (!actData._bindings.size) {
                    delete actualData._bindings;
                }
            }
            if (_typeof(binding[_i68]) === "object" && actData) {
                this.removeSelectedBindingDeep(binding[_i68], actData);
            }
        }
        if (binding._forHelpers) {
            var objbind = binding._forHelpers.toArray();
            for (var _i69 = 0; _i69 < objbind.length; _i69++) {
                var fH = objbind[_i69];
                if (fH.getAttribute("is") === "for") {
                    var item = fH.getAttribute("item");
                    var items = fH._attributes.items;
                    var itemCases = fH._items;
                    for (var _i70 = 0; _i70 < itemCases.length; _i70++) {
                        this.removeSelectedBindingDeep(itemCases[_i70].itemProperty, items[_i70]);
                    }
                } else {
                    if (fH._propBindingObject) {
                        if (actualData._bindings) {
                            actualData._bindings.delete(fH._propBindingObject);
                            if (!actualData._bindings.size) {
                                delete actualData._bindings;
                            }
                            this.removeSelectedBindingDeep(fH._propBindingObject, actualData);
                        }
                    }
                }
            }
        }
    },
    "removeAllBindings": function removeAllBindings(properties, data) {
        for (var key in properties) {
            if (data[key] && data[key]._bindings) {
                data[key]._bindings.delete(properties[key]);
                if (!data[key]._bindings.size) {
                    delete data[key]._bindings;
                }
            }
            if (data[key] && typeof data[key] !== "string") {
                LyteComponent.removeAllBindings(properties[key], data[key]);
            }
        }
    },
    "affectChanges": function affectChanges(item, contextAlreadySwitched, oldValue, setterScope, newValue) {
        if (item._dynamicNodes) {
            for (var _i71 = 0; _i71 < item._dynamicNodes.length; _i71++) {
                item._dynamicNodes[_i71]._callee.updateNode(item._dynamicNodes[_i71], item._path);
            }
        }
        var propPath = item._path;
        if (item._helperNodes) {
            var nodes = [],
                itemHelperNodes = item._helperNodes.toArray();
            for (var s = 0; s < itemHelperNodes.length; s++) {
                if (!item._helperNodes.has(itemHelperNodes[s])) {
                    continue;
                }
                if (itemHelperNodes[s].getAttribute("is") === "for" && itemHelperNodes[s]._items) {
                    var innerContextSwitchArray = [];
                    LyteComponent.newAddContext(itemHelperNodes[s], innerContextSwitchArray);
                    var indexValue = itemHelperNodes[s].getAttribute("index");
                    var itemValue = itemHelperNodes[s].getAttribute("item");
                    var callee = itemHelperNodes[s]._callee;
                    var initialItemValue = callee.component.data[itemValue];
                    var initialIndexValue = callee.component.data[indexValue];
                    var initialItemProp = callee._properties[itemValue];
                    var initialIndexProp = callee._properties[indexValue];
                    var items = itemHelperNodes[s]._attributes.items;
                    for (var _i72 = 0; _i72 < itemHelperNodes[s]._items.length; _i72++) {
                        callee.component.data[itemValue] = items[_i72];
                        callee.component.data[indexValue] = _i72;
                        callee._properties[itemValue] = itemHelperNodes[s]._items[_i72].itemProperty;
                        if (itemHelperNodes[s]._items[_i72]._dynamicProperty[propPath]) {
                            nodes = itemHelperNodes[s]._items[_i72]._dynamicProperty[propPath];
                            for (var _i73 = 0; _i73 < nodes.length; _i73++) {
                                nodes[_i73]._callee.updateNode(nodes[_i73], propPath);
                            }
                        }
                    }
                    callee.component.data[itemValue] = initialItemValue;
                    callee.component.data[indexValue] = initialIndexValue;
                    callee._properties[itemValue] = initialItemProp;
                    callee._properties[indexValue] = initialIndexProp;
                    LyteComponent.newRemoveContext(itemHelperNodes[s], innerContextSwitchArray);
                } else if (itemHelperNodes[s].getAttribute("is") === "forIn" && itemHelperNodes[s]._items) {
                    var _innerContextSwitchArray = [];
                    LyteComponent.newAddContext(itemHelperNodes[s], _innerContextSwitchArray);
                    var _indexValue = itemHelperNodes[s].getAttribute("key");
                    var _itemValue3 = itemHelperNodes[s].getAttribute("value");
                    var _callee3 = itemHelperNodes[s]._callee;
                    var _initialItemValue = _callee3.component.data[_itemValue3];
                    var _initialIndexValue = _callee3.component.data[_indexValue];
                    var _initialItemProp = _callee3._properties[_itemValue3];
                    var _initialIndexProp = _callee3._properties[_indexValue];
                    var object = itemHelperNodes[s]._attributes.object;
                    for (var key in itemHelperNodes[s]._items) {
                        _callee3.component.data[_itemValue3] = object[key];
                        _callee3.component.data[_indexValue] = key;
                        _callee3._properties[_itemValue3] = itemHelperNodes[s]._items[key].itemProperty;
                        if (itemHelperNodes[s]._items[key]._dynamicProperty[propPath]) {
                            nodes = itemHelperNodes[s]._items[key]._dynamicProperty[propPath];
                            for (var _i74 = 0; _i74 < nodes.length; _i74++) {
                                nodes[_i74]._callee.updateNode(nodes[_i74], propPath);
                            }
                        }
                    }
                    _callee3.component.data[_itemValue3] = _initialItemValue;
                    _callee3.component.data[_indexValue] = _initialIndexValue;
                    _callee3._properties[_itemValue3] = _initialItemProp;
                    _callee3._properties[_indexValue] = _initialIndexProp;
                    LyteComponent.newRemoveContext(itemHelperNodes[s], _innerContextSwitchArray);
                } else {
                    nodes = itemHelperNodes[s]._dynamicProperty[item._path] || [];
                    var contextSwitchArray = [];
                    LyteComponent.newAddContext(itemHelperNodes[s], contextSwitchArray);
                    for (var _i75 = 0; _i75 < nodes.length; _i75++) {
                        nodes[_i75]._callee.updateNode(nodes[_i75], item._path);
                    }
                    LyteComponent.newRemoveContext(itemHelperNodes[s], contextSwitchArray);
                }
            }
        }
        if (item._observers) {
            var objbind = item._observers.toArray();
            for (var _i76 = 0; _i76 < objbind.length; _i76++) {
                var observer = objbind[_i76];
                observer.observer.value.call(observer.callee && observer.callee.component ? observer.callee.component : setterScope ? setterScope : window, { type: "change", oldValue: oldValue, newValue: newValue, item: item._path });
            }
        }
        if (Array.isArray(item)) {
            for (var i = 0; i < item.length; i++) {
                for (var _key13 in item[i]) {
                    this.affectChanges(item[i][_key13], true, oldValue ? oldValue[i] ? oldValue[i][_key13] : oldValue[i] : oldValue, setterScope, newValue ? newValue[i] ? newValue[i][_key13] : newValue[i] : newValue);
                }
            }
        } else {
            for (var _key14 in item) {
                this.affectChanges(item[_key14], true, oldValue ? oldValue[_key14] : oldValue, setterScope, newValue ? newValue[_key14] : newValue);
            }
        }
    },
    "getDynamicData": function getDynamicData(context, dataArr) {
        var self = this;
        dataArr.forEach(function (item, index) {
            if (Array.isArray(item)) {
                if (context === undefined) {
                    return undefined;
                }
                var inner = self.getDynamicData.call(self, self.component.data, item);
                if (inner === undefined) {
                    return undefined;
                }
                context = context[inner];
            } else {
                if (context === undefined) {
                    return undefined;
                }
                context = context[item];
            }
        });
        return context;
    },
    "get": function get(context, path, ac) {
        if (!ac) {
            ac = [];
        }
        try {
            var arr = path.match(/([^[\]]+|\[\])/g);
            var initialContext = context;
            ac.push(arr[0]);
            var locArr = arr[0].split('.');
            for (var k = 0; k < locArr.length; k++) {
                context = context[locArr[k]];
            }
            for (var _i77 = 1; _i77 < arr.length; _i77++) {
                var locVal = arr[_i77];
                //this is context switching
                if (locVal.startsWith(".")) {
                    //direct context switching
                    var _locArr = locVal.substring(1).split('.');
                    for (var _k4 = 0; _k4 < _locArr.length; _k4++) {
                        context = context[_locArr[_k4]];
                    }
                    ac[ac.length - 1] = ac[ac.length - 1] + locVal;
                } else if (locVal.startsWith("'") || locVal.startsWith('"') || !isNaN(locVal)) {
                    if (!isNaN(locVal)) {
                        ac[ac.length - 1] = ac[0] + "." + locVal;
                    } else {
                        ac[ac.length - 1] = ac[0] + "." + locVal.substring(1, locVal.length - 1);
                    }
                    context = context[locVal.substring(1, locVal.length - 1)];
                } else {
                    var length = ac.length;
                    var val = this.get(initialContext, locVal, ac);
                    ac[0] = ac[0] + "." + val;
                    context = context[val];
                }
            }
            return context;
        } catch (e) {
            return undefined;
        }
    },
    "getNew": function getNew(context, path) {
        try {
            var arr = path.match(/([^[\]]+|\[\])/g);
            var initialContext = context;
            var locArr = arr[0].split('.');
            if (arr.length < 2) {
                if (locArr.length < 2) {
                    return { "context": initialContext, "lastKey": locArr[0] };
                } else {
                    for (var k = 0; k < locArr.length - 1; k++) {
                        context = context[locArr[k]];
                    }
                    return { "context": context, "lastKey": locArr[k] };
                }
            }
            for (var _k5 = 0; _k5 < locArr.length; _k5++) {
                context = context[locArr[_k5]];
            }
            for (var i = 1; i < arr.length - 1; i++) {
                var locVal = arr[i];
                //this is context switching
                if (locVal.startsWith(".")) {
                    //direct context switching
                    var _locArr2 = locVal.substring(1).split('.');
                    for (var _k6 = 0; _k6 < _locArr2.length; _k6++) {
                        context = context[_locArr2[_k6]];
                    }
                } else if (locVal.startsWith("'") || locVal.startsWith('"') || !isNaN(locVal)) {
                    context = context[locVal.substring(1, locVal.length - 1)];
                } else {
                    var val = this.get(initialContext, locVal);
                    context = context[val];
                }
            }
            var lastKey = arr[i];
            if (lastKey.startsWith(".")) {
                //direct context switching
                var _locArr3 = lastKey.substring(1).split('.');
                var _k7 = 0;
                for (; _k7 < _locArr3.length - 1; _k7++) {
                    context = context[_locArr3[_k7]];
                }
                lastKey = _locArr3[_k7];
            } else if (lastKey.startsWith("'") || lastKey.startsWith('"') || !isNaN(lastKey)) {
                lastKey = lastKey.substring(1, lastKey.length - 1);
            } else {
                lastKey = this.get(initialContext, lastKey);
            }
            return { "context": context, "lastKey": lastKey };
        } catch (e) {
            return undefined;
        }
    },
    "componentGetData": function componentGetData(key) {
        if (key) {
            return this.get(key);
        } else {
            return this.data;
        }
    },
    "componentSetData": function componentSetData(arg0, arg1) {
        if (typeof arg0 === "string") {
            this.set(arg0, arg1);
        } else if (arg0 instanceof Object) {
            for (var key in arg0) {
                this.set(key, arg0[key]);
            }
        }
    },
    "componentGetMethods": function componentGetMethods(key) {
        if (key) {
            return this.methods[key];
        } else {
            return this.methods;
        }
    },
    "componentSetMethods": function componentSetMethods(arg0, arg1) {
        if (typeof arg0 === "string") {
            this.methods[arg0] = arg1;
        } else if (arg0 instanceof Object) {
            for (var key in arg0) {
                this.methods[key] = arg0[key];
            }
        }
    },
    "render": function render(componentName, data, outlet) {
        if (componentName) {
            var component = document.createElement(componentName);
        } else {
            console.error("Component name not specified");
            return;
        }
        if (data) {
            component.setData(data);
        }
        if (outlet) {
            var actOutlet = document.querySelector(outlet);
            if (actOutlet) {
                actOutlet.appendChild(component);
            } else {
                console.warn("Specified outlet doesn't exist");
            }
        }
        return component;
    },
    "String": {
        "upperCaseFirstLetter": function upperCaseFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        "lowerCaseFirstLetter": function lowerCaseFirstLetter(string) {
            return string.charAt(0).toLowerCase() + string.slice(1);
        },
        "toCamelCase": function toCamelCase(string) {
            return string.replace(/(-\w)/g, function (m) {
                return m[1].toUpperCase();
            });
        },
        "dasherize": function dasherize(string) {
            return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
    },
    "appendChild": function appendChild(outlet, component) {
        LyteComponent.ignoreDisconnect = true;
        outlet.appendChild(component);
        LyteComponent.ignoreDisconnect = false;
    },
    "replaceWith": function replaceWith() {
        var argumentsArr = Array.from(arguments);
        var oldNode = argumentsArr.shift();
        LyteComponent.ignoreDisconnect = true;
        oldNode.replaceWith.apply(oldNode, argumentsArr);
        LyteComponent.ignoreDisconnect = false;
    },
    "insertBefore": function insertBefore(referenceNode, newNode) {
        LyteComponent.ignoreDisconnect = true;
        referenceNode.parentNode.insertBefore(newNode, referenceNode ? referenceNode : null);
        LyteComponent.ignoreDisconnect = false;
    },
    "insertAfter": function insertAfter() {
        var argumentsArr = Array.from(arguments);
        var referenceNode = argumentsArr.shift();
        LyteComponent.ignoreDisconnect = true;
        referenceNode.after.apply(referenceNode, argumentsArr);
        LyteComponent.ignoreDisconnect = false;
    },
    "executeMethod": function executeMethod() {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodName = LyteComponent.String.toCamelCase(arguments[0]);
        if (!this.methods[methodName]) {
            console.error(methodName + " method not found");
            return;
        }
        return this.methods[methodName].apply(this, args);
    },
    "establishObserverBindings": function establishObserverBindings(observers, fromStore, properties) {
        //let observers = this.constructor._observers;
        var scope = this;
        if (fromStore) {
            scope = fromStore;
        }
        for (var _i78 = 0; _i78 < observers.length; _i78++) {
            var props = observers[_i78].properties;
            for (var j = 0; j < props.length; j++) {
                var actProp = void 0;
                var isArrayObserver = false;
                if (props[j].indexOf('.[]') !== -1) {
                    isArrayObserver = true;
                    actProp = LyteComponent.getProperty.call(this, props[j].substring(0, props[j].indexOf('.[]')), fromStore, properties);
                } else {
                    actProp = LyteComponent.getProperty.call(this, props[j], fromStore, properties);
                }
                if (!actProp._observers) {
                    Object.defineProperty(actProp, '_observers', {
                        value: new Set(),
                        enumerable: false,
                        writable: true,
                        configurable: true
                    });
                }
                actProp._observers.add({ callee: scope, observer: observers[_i78], isArrayObserver: isArrayObserver });
            }
        }
    },
    "getProperty": function getProperty(key, fromStore, properties) {
        var arr = key.split('.');
        var property = this;
        if (fromStore) {
            property = properties;
            if (!properties[arr[0]]) {
                properties[arr[0]] = {};
            }
            property = properties[arr[0]];
        } else {
            if (!property._properties[arr[0]]) {
                property._properties[arr[0]] = {};
            }
            property = property._properties[arr[0]];
        }

        Object.defineProperty(property, '_path', { enumerable: false, value: arr[0] });
        for (var _i79 = 1; _i79 < arr.length; _i79++) {
            if (!property[arr[_i79]]) {
                property[arr[_i79]] = {};
                Object.defineProperty(property[arr[_i79]], '_path', { enumerable: false, value: property._path + "." + arr[_i79] });
            }
            property = property[arr[_i79]];
        }
        return property;
    }

};
Lyte.Component.render = LyteComponent.render;
LyteComponent.lyteComponentsDiv = document.createElement("div");
LyteComponent.lyteComponentsDiv.setAttribute("id", "lyte-components-div");

Set.prototype.toArray = function () {
    if (this.constructor.name === "Set") {
        return Array.from(this);
    } else {
        return Array.from(this._values);
    }
};
//LyteComponent.registerListener(function() {
//  
//});

if (document.readyState === "complete" || document.readyState === "interactive") {
    onDomContentForLyte();
} else {
    document.addEventListener("DOMContentLoaded", function (e) {
        onDomContentForLyte();
    }, true);
}

// Compilation functions 

function getMustache(value) {
    value = value && typeof value === "string" ? value.trim() : value;
    if (/^{{(?=[\s]*[\w-_]+)/.test(value)) {
        var arr = value.match(/{{[a-zA-Z0-9_.[\]()]*(?![\\])}}/g);
        if (arr && arr.length > 1) {
            //console.log("length>1",value)
            return undefined;
        }
        if (!this.syntaxCheck(value) || !/{{[^}]*?(?:(?:('|")[^\1]*?\1)[^}]*?)*}}$/.test(value)) {
            //'
            return undefined;
        }
        var dynamic = value.match(/[\w!@#$%^&*)(+=.,_-]+[\s]*[(]{0,1}(?:"([^"]|\\")*?"|'([^']|\\')*?'|[\w\s!@#$%^&*)([\]+=.,_-]*?)*?[)]{0,1}[\s]*(?=}})/g); //'
        if (dynamic && dynamic.length > 1) {
            return undefined;
        } else {
            dynamic = dynamic ? dynamic[0].trim() : dynamic;
        }
        //        let dynamic = /[\w!@#\$%\^\&*\)\(+=.,_-]+(?:"([^"]|\\")*?"|'([^']|\\')*?'|[\w\s!@#\$%\^\&*\)\(\[\]+=.,_-]*?)*?(?=}}$)/.exec(value);
        return dynamic;
    }
    return undefined;
}

function getHelper(dynamicValue) {
    var helperValue = /\((?:[^)]*|(?:(?:"(?:[^"\\]|\\.)*?")|(?:'([^'\\]|\\.)*?')|[\w\s!@#$%^&*)([\]+=.,_-]*?)*?)\)$/.exec(dynamicValue);
    if (helperValue) {
        return getHelperInfo(dynamicValue, helperValue);
    }
    return undefined;
}

function getHelperInfo(dynamicValue, helperValue) {
    var helperFunc = {};
    helperFunc.name = dynamicValue.substr(0, helperValue.index).replace(/\s/g, '');
    helperValue = helperValue ? helperValue[0].trim() : helperValue;
    var args = getHelperArgs(helperValue.substr(1, helperValue.length - 2));
    if (args === false) {
        return false;
    }
    helperFunc.args = args;
    return helperFunc;
}

function getHelperArgs(str) {
    var stack = [],
        args = [],
        from = 0;
    var lastPushed = void 0;
    for (var _i80 = 0; _i80 < str.length; _i80++) {
        if (!stack.length && str.charAt(_i80) === ",") {
            var _toPush2 = str.substr(from, _i80 - from);
            _toPush2 = _toPush2.trim();
            if (_toPush2 && _toPush2.startsWith("\"") && _toPush2.endsWith("\"")) {
                _toPush2 = _toPush2.slice(1, -1);
                _toPush2 = "'" + _toPush2 + "'";
            }
            _toPush2 = getHelperArgValue(_toPush2);
            args.push(_toPush2);
            from = _i80 + 1;
        } else if (str.charAt(_i80) === "(") {
            if (lastPushed != "'" || lastPushed != "\"") {
                stack.push(str.charAt(_i80));
                lastPushed = str.charAt(_i80);
            }
        } else if (str.charAt(_i80) === ")") {
            if (stack[stack.length - 1] === "(") {
                stack.pop();
            }
        } else if (str.charAt(_i80) === "'" && str.charAt(_i80 - 1) !== "\\") {
            if (stack[stack.length - 1] === "'") {
                stack.pop();
            } else if (stack[stack.length - 1] !== "\"") {
                stack.push(str.charAt(_i80));
                lastPushed = str.charAt(_i80);
            }
        } else if (str.charAt(_i80) === "\"" && str.charAt(_i80 - 1) !== "\\") {
            if (stack[stack.length - 1] === "\"") {
                stack.pop();
                //              str.replaceAt(i, "'");
            } else if (stack[stack.length - 1] !== "'") {
                stack.push(str.charAt(_i80));
                lastPushed = str.charAt(_i80);
                //              str.replaceAt(i, "'");
            }
        }
    }
    var toPush = str.substr(from, str.length - from);
    toPush = toPush.trim();
    if (toPush && toPush.startsWith("\"") && toPush.endsWith("\"")) {
        toPush = toPush.slice(1, -1);
        toPush = "'" + toPush + "'";
    }
    toPush = getHelperArgValue(toPush);
    args.push(toPush);
    return args;
}

function syntaxCheck(value) {
    var stack = [],
        lastAdded;
    for (var i = 0; i < value.length; i++) {
        if (value[i] === "'") {
            if (lastAdded === "'" && value[i - 1] !== "\\") {
                stack.pop();
                lastAdded = undefined;
            } else if (!stack.length) {
                lastAdded = value[i];
                stack.push(lastAdded);
            }
        } else if (value[i] === "\"") {
            if (lastAdded === "\"" && value[i - 1] !== "\\") {
                stack.pop();
                lastAdded = undefined;
            } else if (!stack.length) {
                lastAdded = value[i];
                stack.push(lastAdded);
            }
        }
    }
    if (stack.length) {
        return false;
    }
    return true;
}

function doCompile(dynamicN, dynamicNodes, componentName) {
    for (var j = 0; j < dynamicNodes.length; j++) {
        var info = dynamicNodes[j],
            type = info.type,
            pos = info.position,
            helperInfo = void 0;
        var dynN = this.getDynamicNode(dynamicN, pos);
        switch (type) {
            case "text":
                {
                    var mustache = this.getMustache(dynN.nodeValue),
                        dynamicValue = void 0,
                        helperFunc = void 0;
                    if (mustache) {
                        helperFunc = this.getHelper(mustache);
                    }
                    var dynamic = this.getMustache(dynN.nodeValue);
                    if (helperFunc) {
                        info.helperInfo = helperFunc;
                    } else if (dynamic) {
                        //deepNodes.push({type: "text", position:deepN.slice(), dynamicValue: dynamic});
                        info.dynamicValue = dynamic;
                        //              LN to do
                        //              deepNodes.push({type: "text", position:deepN.slice(), dynamicValue: getDynamicValue(dynamic)});                    
                    }
                }
                break;
            case "attr":
                {
                    var add = false,
                        toBeRemoved = [],
                        toBeAdded = [];
                    var node = dynN;
                    var attr = info.attr = {};
                    for (var _i81 = 0; _i81 < node.attributes.length; _i81++) {
                        if (node.attributes[_i81].nodeValue.indexOf("{{") !== -1) {
                            var val = node.attributes[_i81].nodeValue;
                            var actValue = this.getMustache(val),
                                actObj = void 0;
                            if (actValue) {
                                actObj = this.getHelper(actValue);
                            } else if (/{{.*}}/.test(val) && !/\\{{.*}}/.test(val)) {
                                actObj = this.splitMixedText(val);
                            }
                            if (actObj && (actObj.name === "action" || actObj.name === "method") && /^(onfocus|onfocusin|onfocusout|onresize|onscroll|onclick|ondblclick|onmousedown|onmouseup|onmousemove|onmouseover|onmouseout|onmouseenter|onmouseleave|onchange|onselect|onsubmit|onkeydown|onkeypress|onkeyup|oncontextmenu)$/.test(node.attributes[_i81].name)) {
                                attr[node.attributes[_i81].name.substr(2)] = { name: node.attributes[_i81].name.substr(2), helperInfo: actObj, globalEvent: true };
                                var actArgs = deepCopyObject(actObj.args);
                                var actName = actArgs.splice(0, 1)[0];
                                actName = actName.startsWith("'") ? actName.replace(/'/g, '') : actName;
                                var actString = this.getArgString(actName, actArgs);
                                node.setAttribute(node.attributes[_i81].name.substr(2), componentName + " => " + actString);
                                toBeRemoved.push(node.attributes[_i81].name);
                            } else {
                                if (actObj || actValue) {
                                    var attrToPush = {};
                                    if (node.attributes[_i81].name.startsWith("lbind:")) {
                                        toBeRemoved.push(node.attributes[_i81].name);
                                        toBeAdded.push({ "name": node.attributes[_i81].name.substring(6), "value": node.attributes[_i81].nodeValue });
                                        attrToPush.isLbind = true;
                                        attrToPush.name = node.attributes[_i81].name.substring(6);
                                    } else {
                                        attrToPush.name = node.attributes[_i81].name;
                                    }
                                    if (actObj) {
                                        if (actObj.name === "lbind") {
                                            attrToPush.dynamicValue = actObj.args[0];
                                            attrToPush.isLbind = true;
                                        } else {
                                            attrToPush.helperInfo = actObj;
                                        }
                                    } else {
                                        attrToPush.dynamicValue = actValue;
                                        //                              LN to do
                                        //                              attrToPush.dynamicValue = getDynamicValue(actValue);
                                    }
                                    add = true;
                                    attr[attrToPush.name] = attrToPush;
                                }
                            }
                        }
                    }
                    if (toBeRemoved.length) {
                        for (var _i82 = 0; _i82 < toBeRemoved.length; _i82++) {
                            node.removeAttribute(toBeRemoved[_i82]);
                        }
                    }
                    if (toBeAdded.length) {
                        for (var _i83 = 0; _i83 < toBeAdded.length; _i83++) {
                            node.setAttribute(toBeAdded[_i83].name, toBeAdded[_i83].value);
                        }
                    }
                }
                break;
            case "for":
            case "forIn":
            case "component":
            case "registerYield":
                {
                    doCompile(dynN.content, info.dynamicNodes, componentName);
                }
                break;
            case "if":
            case "switch":
                {
                    for (var key in info.cases) {
                        doCompile(dynN.content.querySelector("[case='" + key + "']").content, info.cases[key].dynamicNodes, componentName);
                    }
                    if (info.default.dynamicNodes) {
                        doCompile(dynN.content.querySelector("[default]").content, info.default.dynamicNodes, componentName);
                    }
                }
                break;
        }
    }
}

function getDynamicNode(content, positions) {
    var dynamicN = content;
    for (var i = 0; i < positions.length; i++) {
        dynamicN = dynamicN.tagName != "TEMPLATE" ? dynamicN.childNodes[positions[i]] : dynamicN.content.childNodes[positions[i]];
    }
    return dynamicN;
}

function splitMixedText(str) {
    var stack = [],
        start = 0,
        helper = { name: "concat", args: [] };
    for (var i = 0; i < str.length; i++) {
        var j = i;
        if (str[i - 1] !== "\\" && str[i] === "{" && str[++i] === "{") {
            stack.push('{{');
            helper.args.push("'" + str.substr(start, j - start) + "'");
            start = i + 1;
        } else if (str[i] === "}" && str[++i] === "}" && stack.length) {
            stack.pop(start);
            var toPush = str.substr(start, j - start);
            var actObj = this.getHelper(toPush);
            if (actObj) {
                toPush = actObj;
                helper.args.push({ type: "helper", value: toPush });
            } else {
                helper.args.push(toPush);
            }
            start = i + 1;
        }
    }
    if (start < str.length) {
        helper.args.push("'" + str.substr(start, str.length - start) + "'");
    }
    return helper;
}

function getHelperArgValue(argValue) {
    switch (argValue) {
        case "undefined":
            return undefined;
        case "true":
            return true;
        case "false":
            return false;
        case "null":
            return null;
        case "":
            return undefined;
        default:
            if (argValue && argValue.startsWith("'") && argValue.endsWith("'")) {
                return argValue;
            } else if (/\([\w\s,')(]*/.test(argValue)) {
                return { "type": "helper", "value": getHelper(argValue) };
            } else if (!isNaN(argValue)) {
                return parseInt(argValue);
            } else {
                return argValue;
            }
    }
}

function deepCopyObject(obj) {
    var current,
        copies = [{ source: obj, target: Object.create(Object.getPrototypeOf(obj)) }],
        keys,
        propertyIndex,
        descriptor,
        nextSource,
        indexOf,
        sourceReferences = [obj];
    var cloneObject = copies[0].target,
        targetReferences = [cloneObject];
    while (current = copies.shift()) {
        keys = Object.getOwnPropertyNames(current.source);
        for (propertyIndex = 0; propertyIndex < keys.length; propertyIndex++) {
            descriptor = Object.getOwnPropertyDescriptor(current.source, keys[propertyIndex]);
            if (!descriptor.value || _typeof(descriptor.value) != "object") {
                Object.defineProperty(current.target, keys[propertyIndex], descriptor);
                continue;
            }
            nextSource = descriptor.value;
            descriptor.value = Array.isArray(nextSource) ? [] : Object.create(Object.getPrototypeOf(nextSource));
            indexOf = sourceReferences.indexOf(nextSource);
            if (indexOf != -1) {
                descriptor.value = targetReferences[indexOf];
                Object.defineProperty(current.target, keys[propertyIndex], descriptor);
                continue;
            }
            sourceReferences.push(nextSource);
            targetReferences.push(descriptor.value);
            Object.defineProperty(current.target, keys[propertyIndex], descriptor);
            copies.push({ source: nextSource, target: descriptor.value });
        }
    }
    return cloneObject;
}

function getArgString(name, array) {
    var retString = void 0;
    for (var _i84 = 0; _i84 < array.length; _i84++) {
        if (_typeof(array[_i84]) === "object") {
            array[_i84] = this.getArgString(array[_i84].value.name, array[_i84].value.args);
        }
    }
    if (name) {
        retString = name + "(" + array.toString() + ")";
    } else {
        retString = array.toString();
    }
    return retString;
}

LyteComponent.registerHelper("unbound", function (value) {
    return value;
});

LyteComponent.registerHelper("action", function (parentNode, attrName, isCustom, actObj) {
    if (isCustom) {
        parentNode._actions = parentNode._actions ? parentNode._actions : {};
        if (!parentNode._actions[attrName]) {
            this.createCustomEvent(attrName, parentNode, actObj);
            parentNode.removeAttribute(attrName);
        }
    } else {

        this.createEventListeners(parentNode, attrName, actObj);
    }
});

LyteComponent.registerHelper("lbind", function (name) {
    return this.getData(name);
});

LyteComponent.registerHelper("method", function (parentComponent, attributeNode, functionName) {
    var parentComponent = arguments[0];
    var attributeNode = arguments[1];
    var functionName = arguments[2];
    var self = arguments[0].component;
    var childComponent = attributeNode ? attributeNode.ownerElement : null;
    var attributeName = arguments[1].nodeName;
    attributeNode = null;
    var args = Array.prototype.slice.call(arguments, 3);
    var newFunc = function newFunc() {
        var customArgs = Array.from(arguments);
        var mainArgs = args.concat(customArgs);
        return self.methods[functionName].apply(self, mainArgs);
    };
    if (childComponent) {
        if (!childComponent.set) {
            childComponent.setMethods(LyteComponent.String.toCamelCase(attributeName), newFunc);
        } else {
            childComponent.component.methods[LyteComponent.String.toCamelCase(attributeName)] = newFunc;
        }
    } else {
        return newFunc;
    }
});

LyteComponent.registerHelper("unescape", function (value) {
    var divEle = document.createElement("div"),
        position = void 0,
        totalLength = void 0;
    divEle.innerHTML = value;
    return divEle;
});

LyteComponent.registerHelper("debugger", function () {
    debugger;
});

LyteComponent.registerHelper("log", function () {
    console.log.apply(window, Array.from(arguments));
});

LyteComponent.registerHelper("ifEquals", function (arg1, arg2) {
    if (arg1 === arg2) {
        return true;
    } else {
        return false;
    }
});

LyteComponent.registerHelper("if", function (value, trueValue, falseValue) {
    if (value) {
        return trueValue;
    } else {
        return falseValue;
    }
});

LyteComponent.registerHelper("negate", function (arg1) {
    return !arg1;
});

LyteComponent.registerHelper("ifNotEquals", function (arg1, arg2) {
    if (arg1 === arg2) {
        return false;
    } else {
        return true;
    }
});

LyteComponent.registerHelper('concat', function () {
    var resp = '';
    var argLength = arguments.length;
    for (var i = 0; i < argLength; i++) {
        if (arguments[i] != undefined) {
            resp += arguments[i];
        }
    }
    return resp;
});

Object.defineProperty(HTMLElement.prototype, 'setData', {
    enumerable: false,
    value: function value(arg0, arg1) {
        this._initProperties = this._initProperties || {};
        if (typeof arg0 === "string") {
            this._initProperties[arg0] = arg1;
        } else if (arg0 instanceof Object) {
            for (var key in arg0) {
                this._initProperties[key] = arg0[key];
            }
        }
    }
});

Object.defineProperty(HTMLElement.prototype, 'setMethods', {
    enumerable: false,
    value: function value(arg0, arg1) {
        this._initMethods = this._initMethods || {};
        if (typeof arg0 === "string") {
            this._initMethods[arg0] = arg1;
        } else if (arg0 instanceof Object) {
            for (var key in arg0) {
                this._initMethods[key] = arg0[key];
            }
        }
    }
});

LyteComponent.registerHelper('expHandlers', function (leftOperand, operator, rightOperand) {
    if (operator == '++') {
        if (rightOperand == "postfix") {
            return leftOperand++;
        } else if (rightOperand == "prefix") {
            return ++leftOperand;
        }
    } else if (operator == "--") {
        if (rightOperand == "postfix") {
            return leftOperand--;
        } else if (rightOperand == "prefix") {
            return --leftOperand;
        }
    } else if (operator == "==" || operator == "===") {
        return leftOperand == rightOperand;
    } else if (operator == "!=" || operator == "!==") {
        return leftOperand != rightOperand;
    } else if (operator == "&&") {
        return leftOperand && rightOperand;
    } else if (operator == "||") {
        return leftOperand || rightOperand;
    } else if (operator == "+" && rightOperand) {
        return leftOperand + rightOperand;
    } else if (operator == '-' && rightOperand) {
        return leftOperand - rightOperand;
    } else if (operator == '*') {
        return leftOperand * rightOperand;
    } else if (operator == "/") {
        return leftOperand / rightOperand;
    } else if (operator == "%") {
        return leftOperand % rightOperand;
    } else if (operator == "<") {
        return leftOperand < rightOperand;
    } else if (operator == ">") {
        return leftOperand > rightOperand;
    } else if (operator == "<=") {
        return leftOperand <= rightOperand;
    } else if (operator == ">=") {
        return leftOperand >= rightOperand;
    } else if (operator == '|') {
        return leftOperand | rightOperand;
    } else if (operator == '&') {
        return leftOperand & rightOperand;
    } else if (operator == "!") {
        return !leftOperand;
    } else if (operator == "-" && !rightOperand) {
        return -leftOperand;
    } else if (operator == '=') {
        leftOperand = rightOperand;
        return leftOperand;
    } else if (operator == "+=") {
        return leftOperand += rightOperand;
    } else if (operator == '-=') {
        return leftOperand -= rightOperand;
    } else if (operator == "*=") {
        return leftOperand *= rightOperand;
    } else if (operator == '/=') {
        return leftOperand /= rightOperand;
    }
});

Lyte.Component.register("lyte-event-listener", {
    _template: "<template tag-name=\"lyte-event-listener\"></template>",
    _dynamicNodes: [],
    _observedAttributes: ['eventName'],
    init: function init() {
        var self = this;
        var regId = Lyte.addEventListener(this.get('eventName'), function () {
            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 0, 'on-fire');
            self.throwEvent.apply(self, args);
        });
        //this.set('regId', regId);
        this.regId = regId;
    },
    data: function data() {
        return {
            "eventName": Lyte.attr("string")
        };
    },
    didDestroy: function didDestroy() {
        Lyte.removeEventListener(this.regId);
    }
});