import { effect } from './reactive/effect';
import { reactive } from './reactive/reactive';

const counter = (window.counter = reactive(
  reactive({
    count1: 0,
    count2: 0,
  })
));

effect(() => {
  console.log(counter);
  console.log('count change...' + counter);
});
