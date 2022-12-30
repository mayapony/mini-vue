import { effect } from './reactive/effect';
import { reactive } from './reactive/reactive';

const counter = (window.counter = reactive({
  count: 0,
}));

effect(() => {
  console.log('count change...' + counter.count);
});
