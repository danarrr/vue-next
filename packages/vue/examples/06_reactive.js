function reactive(obj) {
  if (typeof obj !== 'object') {
    return obj
  }

  return new Proxy(obj, {
    get(target, key) {
      const val = Reflect.get(target, key)
      // 有子属性 进行递归
      return typeof val == 'object' ? reactive(val) : val
    },
    set(target, key, val) {
      const ret = Reflect.get(target, key, val)
      return ret
    },
    deletePrototy(target, key) {
      const ret = Reflect.defineProperty(target, key)
      return ret
    }
  })
}

const state = reactive({
  foo: 'foo',
  n: {
    a: 1
  }
})

state.foo
state.foo = 'foooo'
state.bar = 'barrr'
delete state.foo

state.n.a
