class DomainVariations {
  constructor(options = {}) {
    this.keyboard = options.keyboard || {
      q: ["w", "a"],
      w: ["q", "e", "a", "s"],
      e: ["w", "r", "s", "d"],
      r: ["e", "t", "d", "f"],
      t: ["r", "y", "f", "g"],
      y: ["t", "u", "g", "h"],
      u: ["y", "i", "h", "j"],
      i: ["u", "o", "j", "k"],
      o: ["i", "p", "k", "l"],
      p: ["o", "l"],
      a: ["q", "w", "s", "z"],
      s: ["a", "w", "e", "d", "z", "x"],
      d: ["s", "e", "r", "f", "x", "c"],
      f: ["d", "r", "t", "g", "c", "v"],
      g: ["f", "t", "y", "h", "v", "b"],
      h: ["g", "y", "u", "j", "b", "n"],
      j: ["h", "u", "i", "k", "n", "m"],
      k: ["j", "i", "o", "l", "m"],
      l: ["k", "o", "p"],
      z: ["a", "s", "x"],
      x: ["z", "s", "d", "c"],
      c: ["x", "d", "f", "v"],
      v: ["c", "f", "g", "b"],
      b: ["v", "g", "h", "n"],
      n: ["b", "h", "j", "m"],
      m: ["n", "j", "k"],
    };

    this.visual = options.visual || {
      o: ["0"],
      i: ["1", "l", "I"],
      l: ["1", "I"],
      e: ["3"],
      a: ["@"],
      s: ["5"],
    };

    this.similarTlds = options.similarTlds || {
      com: ["co", "net", "org", "io", "ai"],
      net: ["ne", "com"],
      org: ["ong", "com"],
      "com.br": ["com"],
    };

    this.prefixes = options.prefixes || ["my", "the"];
    this.suffixes = options.suffixes || ["search"];
  }

  parseDomain(domain) {
    const parts = domain.split(".");
    return { name: parts[0], tld: parts.slice(1).join(".") };
  }

  generate(domain) {
    const { name, tld } = this.parseDomain(domain);
    const results = new Set();

    for (let i = 0; i < name.length; i++) {
      const c = name[i];
      if (this.visual[c]) {
        this.visual[c].forEach((v) => {
          results.add(name.slice(0, i) + v + name.slice(i + 1) + "." + tld);
        });
      }
    }

    for (let i = 0; i < name.length; i++) {
      results.add(name.slice(0, i) + name.slice(i + 1) + "." + tld);
      results.add(name.slice(0, i) + name[i] + name.slice(i) + "." + tld);
    }

    for (let i = 0; i < name.length - 1; i++) {
      results.add(
        name.slice(0, i) + name[i + 1] + name[i] + name.slice(i + 2) + "." + tld
      );
    }

    for (let i = 0; i < name.length; i++) {
      const c = name[i];
      if (this.keyboard[c]) {
        this.keyboard[c].forEach((v) => {
          results.add(name.slice(0, i) + v + name.slice(i + 1) + "." + tld);
        });
      }
    }

    if (this.similarTlds[tld]) {
      this.similarTlds[tld].forEach((newTld) => {
        results.add(name + "." + newTld);
      });
    }

    this.prefixes.forEach((p) => {
      results.add(p + name + "." + tld);
    });

    this.suffixes.forEach((s) => {
      results.add(name + "-" + s + "." + tld);
    });

    results.delete(domain);

    return Array.from(results).sort();
  }
}

export default DomainVariations;
