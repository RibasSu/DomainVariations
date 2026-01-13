class DomainVariations {
  constructor(options = {}) {
    this.teclado = options.teclado || {
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
      m: ["n", "j", "k"]
    }

    this.visual = options.visual || {
      o: ["0"],
      i: ["1", "l", "I"],
      l: ["1", "I"],
      e: ["3"],
      a: ["@"],
      s: ["5"]
    }

    this.tldsParecidos = options.tldsParecidos || {
      "com": ["co", "net", "org", "io", "ai"],
      "net": ["ne", "com"],
      "org": ["ong", "com"],
      "com.br": ["com"]
    }

    this.prefixos = options.prefixos || ["my", "the"]
    this.sufixos = options.sufixos || ["search"]
  }

  parseDominio(dominio) {
    const partes = dominio.split(".")
    return { nome: partes[0], tld: partes.slice(1).join(".") }
  }

  gerar(dominio) {
    const { nome, tld } = this.parseDominio(dominio)
    const resultados = new Set()

    for (let i = 0; i < nome.length; i++) {
      const c = nome[i]
      if (this.visual[c]) {
        this.visual[c].forEach(v => {
          resultados.add(nome.slice(0, i) + v + nome.slice(i + 1) + "." + tld)
        })
      }
    }

    for (let i = 0; i < nome.length; i++) {
      resultados.add(nome.slice(0, i) + nome.slice(i + 1) + "." + tld)
      resultados.add(nome.slice(0, i) + nome[i] + nome.slice(i) + "." + tld)
    }

    for (let i = 0; i < nome.length - 1; i++) {
      resultados.add(
        nome.slice(0, i) +
        nome[i + 1] +
        nome[i] +
        nome.slice(i + 2) +
        "." + tld
      )
    }

    for (let i = 0; i < nome.length; i++) {
      const c = nome[i]
      if (this.teclado[c]) {
        this.teclado[c].forEach(v => {
          resultados.add(nome.slice(0, i) + v + nome.slice(i + 1) + "." + tld)
        })
      }
    }

    if (this.tldsParecidos[tld]) {
      this.tldsParecidos[tld].forEach(novo => {
        resultados.add(nome + "." + novo)
      })
    }

    this.prefixos.forEach(p => {
      resultados.add(p + nome + "." + tld)
    })

    this.sufixos.forEach(s => {
      resultados.add(nome + "-" + s + "." + tld)
    })

    return Array.from(resultados).sort()
  }
}

module.exports = DomainVariations
