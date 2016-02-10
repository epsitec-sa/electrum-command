'use strict';

/******************************************************************************/

export default function Command (name, handler, setup) {
  const f = function (args) {
    const c = function (...args) {
      if (!handler) {
        throw new Error (`Command ${name} does not define a command handler`);
      }
      handler (c.info, ...args);
    };
    c.info = setup ? setup () : {};
    c.type = name;
    c.factory = f;
    for (let key in args) {
      if (args.hasOwnProperty (key)) {
        c.info[key] = args[key];
      }
    }
    return c;
  };
  f.type = name;
  return f;
}

/******************************************************************************/
