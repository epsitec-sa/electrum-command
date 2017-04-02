/******************************************************************************/

export function Command (name, handler) {
  const f = function (args0) {
    const c = function (...args1) {
      if (!handler) {
        throw new Error (`Command ${name} does not define a command handler`);
      }
      handler (c.info, ...args1);
    };
    c.info = {};
    c.factory = f;
    const defineParams = function (args2) {
      for (let key in args2) {
        if (args2.hasOwnProperty (key)) {
          c.info[key] = args2[key];
        }
      }
      return defineParams;
    };
    defineParams (args0);
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
