# SHA1PRNG
It's **not** a complete implemention. It's just work for my project that SHA1PRNG using a custom seed.

## example
```
var SHA1PRNG = require('sha1prng');
var result = SHA1PRNG('1234567887654321').toString('hex');
console.log(result);
```