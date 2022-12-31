import { effect } from './reactive/effect';
import { reactive } from './reactive/reactive';

const obj = {
  count: 0,
};
const counter1 = (window.counter1 = reactive(obj));
const counter2 = (window.counter2 = reactive(obj));

effect(() => {
  console.log('count change...' + counter1);
  console.log('count change...' + counter2);
});
