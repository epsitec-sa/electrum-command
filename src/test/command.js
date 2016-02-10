'use strict';

import {expect} from 'mai-chai';
import Command from '../index.js';

/******************************************************************************/

describe ('Command', () => {

  const INCREMENT = Command ('INCREMENT', ({step}, state) => state.value += step);
  const DECREMENT = Command ('DECREMENT', ({step}, state) => state.value -= step);

  const RESET = Command ('RESET', ({start}, state) => state.value = start || 0);
  const RESET_100 = RESET ({start: 100});

  describe ('Command(name, handler)', () => {
    it ('creates typed Commands', () => {
      expect (INCREMENT.type).to.equal ('INCREMENT');
    });
  });

  const INC_1 = INCREMENT ({step: 1});
  const INC_10 = INCREMENT ({step: 10});
  const DEC_2 = DECREMENT ({foo: 'a', bar: 'b'}) ({step: 2});

  describe ('Command(...)(parameters)', () => {
    it ('stores the Command parametrization', () => {
      expect (INC_1.type).to.equal ('INCREMENT');
      expect (INC_1.run.info.step).to.equal (1);
    });

    it ('allows chained parametrization', () => {
      expect (DEC_2.run.info.step).to.equal (2);
      expect (DEC_2.run.info.foo).to.equal ('a');
      expect (DEC_2.run.info.bar).to.equal ('b');
    });
  });

  describe ('Command(...)(...).run(state)', () => {
    it ('executes the handler', () => {
      let x = {value: 0};
      expect (x.value).to.equal (0);
      INC_10.run (x);
      expect (x.value).to.equal (10);
      INC_1.run (x);
      expect (x.value).to.equal (11);
      INC_10.run (x);
      expect (x.value).to.equal (21);
      DEC_2.run (x);
      expect (x.value).to.equal (19);
      RESET.run (x);
      expect (x.value).to.equal (0);
      RESET_100.run (x);
      expect (x.value).to.equal (100);
    });
  });
});

/******************************************************************************/
