# Electrum command

The `electrum-command` package provides a function to declare higher order
commands, which can be parameterized.

```javascript
import Command from 'electrum-command';

// Define a generic command
const INCREMENT = Command ('INCREMENT', ({step}, state) => state.value += step);

// Define concrete commands
const INC_1 = INCREMENT ({step: 1});
const DEC_1 = INCREMENT ({step: -1});

// Apply the commands
let state = {value:0};

INC_1 (state);
expect (state.value).to.equal (1);
INC_1 (state);
expect (state.value).to.equal (2);
DEC_1 (state);
expect (state.value).to.equal (1);
```
