# Electrum command

The `electrum-command` package provides a function to declare higher order
commands, which can be parameterized.

```javascript
import Command from 'electrum-command';

// Define a generic command which can be used as is
const RESET = Command ('RESET', (_, state) => state.value = 0);

// Define a generic command which will be parameterized
const INCREMENT = Command ('INCREMENT', ({step}, state) => state.value += step);

// Define concrete commands by parameterizing the generic command
const INC_1 = INCREMENT ({step: 1});
const DEC_1 = INCREMENT ({step: -1});

// Apply the commands
let state = {value:0};

INC_1.run (state);
expect (state.value).to.equal (1);
INC_1.run (state);
expect (state.value).to.equal (2);
DEC_1.run (state);
expect (state.value).to.equal (1);
RESET.run (state);
expect (state.value).to.equal (0);
```

The parameterization of the _concrete_ commands can be chained, simply
by invoking it as many times as needed:

```javascript
const INC_1 = INCREMENT ({doc: 'adds one', version: '1.2.0'}) ({step: -1});
```
