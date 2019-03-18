const _pipe = (f, g) => (...args) => g(f(...args))

export const pipe = (...fns) => fns.reduce(_pipe);

export const pipeAsync = (...fns) => input => fns.reduce((chain, func) => chain.then(func), Promise.resolve(input));

export const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

export const printLog = source => {
  console.log({source});
  return source;
};