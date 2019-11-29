'use strict'

const loggerFunc = originalFunc => (...arg) => {
  const date = new Date().toString()
  const nameFunc = originalFunc.name

  console.log(`Iniciando função "${nameFunc}" com argumento "${arg}" em ${date}.`)

  return originalFunc(arg)
}

const loggerMethod = wrapped => {
  const { descriptor } = wrapped
  const originalFunc = descriptor.value

  descriptor.value = loggerFunc(originalFunc)
}

const loggerClass = wrapped => {
  const { elements } = wrapped

  elements.map(elemWrapped => {
    loggerMethod(elemWrapped)
  })
}

const logger = wrapped => {
  const { kind } = wrapped

  if (kind === 'method') loggerMethod(wrapped)
  else if (kind === 'class') loggerClass(wrapped)
}

@logger
class myClass {
  myMethod(arg) {
    return arg + ' test'
  }
  myMethod2(arg) {
    return arg + ' test 2'
  }
}

const myInstance = new myClass()

const resp = myInstance.myMethod('arg', 'casa')
const resp2 = myInstance.myMethod2('arg2')

console.log(resp)
console.log(resp)