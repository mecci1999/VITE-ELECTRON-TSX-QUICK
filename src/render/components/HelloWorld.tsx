import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'hello',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  setup(prop) {
    const count = ref(0);

    watch(
      () => count,
      (value) => {
        console.log('watch count', value);
      }
    );

    return () => (
      <div class={'hello'}>
        <h1>{prop.msg}</h1>
        <button
          onClick={() => {
            count.value++;
          }}
        >
          count is : {count.value}
        </button>
        <p>
          Edit <code>components/HelloWorld.vue</code>to test hot module replacement
        </p>
      </div>
    );
  }
});
