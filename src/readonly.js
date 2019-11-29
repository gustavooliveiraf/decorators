'use strict'

const readonlyMethod = wrapped => {
  const { descriptor } = wrapped

  descriptor.writable = false
}

const readonly = wrapped => {
  const { elements } = wrapped

  elements.map(elemWrapped => {
    readonlyMethod(elemWrapped)
    console.log(elemWrapped)
  })
}

@readonly
class myClass {
  myMethod(arg) {
    return arg + ' test'
  }
  myMethod2(arg) {
    return arg + ' test 2'
  }
}

myClass.prototype.myMethod = (arg, arg2) => {
  return arg + arg2
}
