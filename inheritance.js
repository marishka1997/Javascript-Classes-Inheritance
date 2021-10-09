class Base {
  constructor(original) {
    this.original = original;
  }
  plus(...n) {
    this.original += n.reduce((a, b, i) => {
      if (i !== 0) {
        a += b;
      }
      return a;
    });
    return this;
  }
  minus(...n) {
    if (typeof this.original === "string") {
      this.original = this.original.slice(0, n[0]);
    } else {
      this.original -= n.reduce((a, b) => {
        a += b;
        return a;
      }, 0);
    }
    return this;
  }
  multiply(n) {
    if (typeof this.original === "string") {
      this.original = this.original.repeat(n);
    } else {
      this.original *= n;
    }
    return this;
  }
  divide(n) {
    if (typeof this.original === "string") {
      this.original = this.original.slice(0, Math.floor(this.original.length / n));
    } else {
      this.original = Math.trunc(this.original / n);
    }
    return this;
  }
  get() {
    return this.original;
  }
}
class IntBuilder extends Base {
  constructor(int = 0) {
    super(int);
  }
  mod(n) {
    this.original = this.original % n;
    return this;
  }
  static random(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
  }
}
StringBuilder.prototype = Object.create(Base.prototype);
function StringBuilder(str = "") {
  Base.constructor.call(this, str);
}
StringBuilder.prototype.remove = function (x) {
  this.original = this.original.replaceAll(x, "");
  return this;
};
StringBuilder.prototype.sub = function (from, n) {
  this.original = this.original.slice(from, from + n);
  return this;
};

let intBuilder = new IntBuilder(10); // 10;
const result = intBuilder.plus(2, 3, 2).minus(1, 2).multiply(2).divide(4).mod(3).get(); 
console.log(result);
console.log(IntBuilder.random(10, 100));
let strBuilder = new StringBuilder("Hello"); // 'Hello';
const output = strBuilder
  .plus(" all", "!") // 'Hello all!'
  .minus(4) // 'Hello '
  .multiply(3) // 'Hello Hello Hello '
  .divide(4) // 'Hell';
  .remove("l") // 'He'
  .sub(1, 1) // 'e';
  .get(); // -> 'e';
console.log(output);