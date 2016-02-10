'use strict';

/******************************************************************************/

export default function Command (name, handler) {
  const f = function (args) {
    const c = function (...args) {
      if (!handler) {
        throw new Error (`Command ${name} does not define a command handler`);
      }
      handler (c.info, ...args);
    };
    c.info = {};
    c.factory = f;
    const defineParams = function (args) {
      for (let key in args) {
        if (args.hasOwnProperty (key)) {
          c.info[key] = args[key];
        }
      }
      return defineParams;
    };
    defineParams (args);
    defineParams.type = name;
    defineParams.run = c;
    return defineParams;
  };

  f.type = name;
  f.run = function (...args) {
    if (!handler) {
      throw new Error (`Command ${name} does not define a command handler`);
    }
    handler ({}, ...args);
  };

  return f;
}

/******************************************************************************/
