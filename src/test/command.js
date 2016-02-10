'use strict';

import {expect} from 'mai-chai';
import Command from '../index.js';

/******************************************************************************/

describe ('Command', () => {

  const INCREMENT = Command ('INCREMENT', (cmd, state) => state.value += cmd.step);
  const DECREMENT = Command ('DECREMENT', (cmd, state) => state.value -= cmd.step);

  describe ('Command(name, handler)', () => {
    it ('creates typed Commands', () => {
      expect (INCREMENT.type).to.equal ('INCREMENT');
    });
  });

  const INC_1 = INCREMENT ({step: 1});
  const INC_10 = INCREMENT ({step: 10});
  const DEC_2 = DECREMENT ({step: 2});

  describe ('Command(...)(parameters)', () => {
    it ('stores the Command parametrization', () => {
      expect (INC_1.type).to.equal ('INCREMENT');
      expect (INC_1.info.step).to.equal (1);
    });
  });

  describe ('Command(...)(...)(state)', () => {
    it ('executes the handler', () => {
      let x = {value: 0};
      expect (x.value).to.equal (0);
      INC_10 (x);
      expect (x.value).to.equal (10);
      INC_1 (x);
      expect (x.value).to.equal (11);
      INC_10 (x);
      expect (x.value).to.equal (21);
      DEC_2 (x);
      expect (x.value).to.equal (19);
    });
  });
});

/******************************************************************************/
