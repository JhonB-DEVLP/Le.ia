/**
 * Gerador de QR Code (byte mode, correção de erro nível M).
 *
 * Existe para o QR sair como vetor: a versão anterior era um bitmap de
 * 592 KB embutido em SVG, que borrava ao ampliar e não acompanhava o tema.
 * Aqui a saída é uma matriz de módulos que o componente desenha em SVG, o
 * código fica nítido em qualquer tamanho e herda a cor do tema.
 *
 * Escopo deliberadamente estreito: byte mode, nível M e máscara 0 bastam
 * para as URLs curtas do site. Para textos maiores, estenda `VERSOES`.
 */

/*
  Tabela oficial do nível M (ISO/IEC 18004), por versão:
  [versão, capacidade em bytes, codewords de DADOS, codewords de EC por
  bloco, número de blocos].

  A capacidade em bytes é `dados - 3` (4 bits de modo + 8 de contagem + 4 de
  terminador arredondam para 2 codewords, mais folga de 1). Os codewords de
  EC entram ALÉM dos de dados: v3-M são 44 de dados + 26 de EC = 70 no total
  do símbolo. Confundir esses dois números faz o QR não decodificar.
*/
const VERSOES: readonly (readonly [number, number, number, number, number])[] = [
  [2, 26, 28, 16, 1],
  [3, 42, 44, 26, 1],
  [4, 62, 64, 18, 2],
  [5, 84, 86, 24, 2],
  [6, 106, 108, 16, 4],
];

const GALOIS_EXP = new Uint8Array(512);
const GALOIS_LOG = new Uint8Array(256);

(function inicializaGalois() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GALOIS_EXP[i] = x;
    GALOIS_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GALOIS_EXP[i] = GALOIS_EXP[i - 255];
})();

const mul = (a: number, b: number) =>
  a === 0 || b === 0 ? 0 : GALOIS_EXP[GALOIS_LOG[a] + GALOIS_LOG[b]];

/** Polinômio gerador para `grau` codewords de correção. */
function polinomioGerador(grau: number): number[] {
  let poly = [1];
  for (let i = 0; i < grau; i++) {
    const proximo = [...poly, 0];
    for (let j = 0; j < poly.length; j++) {
      proximo[j + 1] ^= mul(poly[j], GALOIS_EXP[i]);
    }
    poly = proximo;
  }
  return poly;
}

function correcaoErro(dados: number[], grau: number): number[] {
  const gerador = polinomioGerador(grau);
  const resto = new Array<number>(grau).fill(0);

  for (const byte of dados) {
    const fator = byte ^ resto[0];
    resto.shift();
    resto.push(0);
    for (let i = 0; i < grau; i++) {
      resto[i] ^= mul(gerador[i + 1], fator);
    }
  }
  return resto;
}

/** Centros dos padrões de alinhamento por versão. */
const ALINHAMENTO: Record<number, number[]> = {
  2: [6, 18],
  3: [6, 22],
  4: [6, 26],
  5: [6, 30],
  6: [6, 34],
};

/**
 * Informação de formato do nível M, uma entrada por máscara (0 a 7), já
 * com o XOR 0x5412 da especificação aplicado.
 */
const FORMATO_M: readonly number[] = [
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0,
];

/** As 8 máscaras da especificação. `true` = inverte o módulo. */
const MASCARAS: readonly ((l: number, c: number) => boolean)[] = [
  (l, c) => (l + c) % 2 === 0,
  (l) => l % 2 === 0,
  (_l, c) => c % 3 === 0,
  (l, c) => (l + c) % 3 === 0,
  (l, c) => (Math.floor(l / 2) + Math.floor(c / 3)) % 2 === 0,
  (l, c) => ((l * c) % 2) + ((l * c) % 3) === 0,
  (l, c) => (((l * c) % 2) + ((l * c) % 3)) % 2 === 0,
  (l, c) => (((l + c) % 2) + ((l * c) % 3)) % 2 === 0,
];

/**
 * Penalidade de uma matriz segundo as 4 regras da especificação. A máscara
 * escolhida é a de menor penalidade — é o que evita blocos uniformes e
 * padrões que o leitor confunde com localizadores.
 */
function penalidade(m: boolean[][]): number {
  const n = m.length;
  let total = 0;

  // Regra 1: sequências de 5+ módulos iguais em linha ou coluna.
  for (let i = 0; i < n; i++) {
    for (const pegar of [
      (j: number) => m[i][j],
      (j: number) => m[j][i],
    ]) {
      let corrida = 1;
      for (let j = 1; j < n; j++) {
        if (pegar(j) === pegar(j - 1)) {
          corrida++;
        } else {
          if (corrida >= 5) total += corrida - 2;
          corrida = 1;
        }
      }
      if (corrida >= 5) total += corrida - 2;
    }
  }

  // Regra 2: blocos 2x2 de cor uniforme.
  for (let l = 0; l < n - 1; l++) {
    for (let c = 0; c < n - 1; c++) {
      const v = m[l][c];
      if (v === m[l][c + 1] && v === m[l + 1][c] && v === m[l + 1][c + 1]) {
        total += 3;
      }
    }
  }

  // Regra 3: padrão 1:1:3:1:1 parecido com um localizador.
  const alvo1 = [true, false, true, true, true, false, true, false, false, false, false];
  const alvo2 = [false, false, false, false, true, false, true, true, true, false, true];
  for (let l = 0; l < n; l++) {
    for (let c = 0; c + 10 < n; c++) {
      const linha = (k: number) => m[l][c + k];
      const coluna = (k: number) => m[c + k][l];
      if (alvo1.every((v, k) => v === linha(k)) || alvo2.every((v, k) => v === linha(k))) {
        total += 40;
      }
      if (alvo1.every((v, k) => v === coluna(k)) || alvo2.every((v, k) => v === coluna(k))) {
        total += 40;
      }
    }
  }

  // Regra 4: desvio da proporção de 50% de módulos escuros.
  let escuros = 0;
  for (const linha of m) for (const v of linha) if (v) escuros++;
  const porcento = (escuros * 100) / (n * n);
  total += Math.floor(Math.abs(porcento - 50) / 5) * 10;

  return total;
}

/**
 * Gera a matriz de módulos do QR. `true` = módulo escuro.
 */
export function gerarQrCode(texto: string): boolean[][] {
  const bytes = Array.from(new TextEncoder().encode(texto));

  const versaoInfo = VERSOES.find(([, capacidade]) => bytes.length <= capacidade);
  if (!versaoInfo) {
    throw new Error(
      `Texto de ${bytes.length} bytes excede a capacidade suportada pelo gerador.`,
    );
  }
  const [versao, , totalDados, ecPorBloco, blocos] = versaoInfo;
  const tamanho = versao * 4 + 17;

  // --- Fluxo de bits: modo byte (0100) + contagem + dados ---
  const bits: number[] = [];
  const empurra = (valor: number, largura: number) => {
    for (let i = largura - 1; i >= 0; i--) bits.push((valor >> i) & 1);
  };

  empurra(0b0100, 4);
  empurra(bytes.length, 8);
  for (const b of bytes) empurra(b, 8);

  const capacidadeBits = totalDados * 8;
  empurra(0, Math.min(4, capacidadeBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const codewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    codewords.push(parseInt(bits.slice(i, i + 8).join(""), 2));
  }
  const preenchimento = [0xec, 0x11];
  let k = 0;
  while (codewords.length < totalDados) {
    codewords.push(preenchimento[k++ % 2]);
  }

  // --- Blocos e intercalação ---
  const tamanhoBloco = Math.floor(totalDados / blocos);
  const sobra = totalDados % blocos;
  const blocosDados: number[][] = [];
  const blocosEc: number[][] = [];
  let offset = 0;

  for (let i = 0; i < blocos; i++) {
    const tam = tamanhoBloco + (i >= blocos - sobra ? 1 : 0);
    const bloco = codewords.slice(offset, offset + tam);
    offset += tam;
    blocosDados.push(bloco);
    blocosEc.push(correcaoErro(bloco, ecPorBloco));
  }

  const finais: number[] = [];
  const maiorBloco = Math.max(...blocosDados.map((b) => b.length));
  for (let i = 0; i < maiorBloco; i++) {
    for (const bloco of blocosDados) {
      if (i < bloco.length) finais.push(bloco[i]);
    }
  }
  for (let i = 0; i < ecPorBloco; i++) {
    for (const bloco of blocosEc) finais.push(bloco[i]);
  }

  // --- Matriz e padrões fixos ---
  const matriz: (boolean | null)[][] = Array.from({ length: tamanho }, () =>
    new Array<boolean | null>(tamanho).fill(null),
  );

  const poeLocalizador = (linha: number, coluna: number) => {
    for (let dl = -1; dl <= 7; dl++) {
      for (let dc = -1; dc <= 7; dc++) {
        const l = linha + dl;
        const c = coluna + dc;
        if (l < 0 || l >= tamanho || c < 0 || c >= tamanho) continue;
        const borda = dl === -1 || dl === 7 || dc === -1 || dc === 7;
        const anel = dl === 0 || dl === 6 || dc === 0 || dc === 6;
        const centro = dl >= 2 && dl <= 4 && dc >= 2 && dc <= 4;
        matriz[l][c] = !borda && (anel || centro);
      }
    }
  };

  poeLocalizador(0, 0);
  poeLocalizador(0, tamanho - 7);
  poeLocalizador(tamanho - 7, 0);

  for (const l of ALINHAMENTO[versao] ?? []) {
    for (const c of ALINHAMENTO[versao] ?? []) {
      if (matriz[l][c] !== null) continue;
      for (let dl = -2; dl <= 2; dl++) {
        for (let dc = -2; dc <= 2; dc++) {
          matriz[l + dl][c + dc] = Math.max(Math.abs(dl), Math.abs(dc)) !== 1;
        }
      }
    }
  }

  for (let i = 8; i < tamanho - 8; i++) {
    const escuro = i % 2 === 0;
    if (matriz[6][i] === null) matriz[6][i] = escuro;
    if (matriz[i][6] === null) matriz[i][6] = escuro;
  }

  matriz[tamanho - 8][8] = true;

  // Áreas de formato ficam reservadas antes da escrita dos dados.
  const reservado = matriz.map((linha) => linha.map((v) => v !== null));
  for (let i = 0; i < 9; i++) {
    reservado[8][i] = true;
    reservado[i][8] = true;
  }
  for (let i = 0; i < 8; i++) {
    reservado[8][tamanho - 1 - i] = true;
    reservado[tamanho - 1 - i][8] = true;
  }

  // --- Dados em ziguezague, com máscara 0 ---
  const fluxo: number[] = [];
  for (const cw of finais) {
    for (let i = 7; i >= 0; i--) fluxo.push((cw >> i) & 1);
  }

  /*
    Percurso em ziguezague, da direita para a esquerda, em pares de colunas.
    A coluna 6 (padrão de tempo vertical) é SALTADA inteira: os pares à
    esquerda dela deslocam uma casa.

    Os bits são gravados SEM máscara aqui; a máscara é aplicada depois, uma
    vez por candidata, para que as 8 possam ser comparadas.
  */
  const posicoes: [number, number][] = [];
  let subindo = true;
  for (let direita = tamanho - 1; direita > 0; direita -= 2) {
    if (direita === 6) direita = 5;

    for (let passo = 0; passo < tamanho; passo++) {
      const linha = subindo ? tamanho - 1 - passo : passo;
      for (const c of [direita, direita - 1]) {
        if (!reservado[linha][c]) posicoes.push([linha, c]);
      }
    }
    subindo = !subindo;
  }

  posicoes.forEach(([linha, coluna], i) => {
    matriz[linha][coluna] = i < fluxo.length && fluxo[i] === 1;
  });

  const base = matriz.map((linha) => linha.map((v) => v === true));

  /*
    Escolha da máscara. A especificação exige testar as 8 e ficar com a de
    menor penalidade — não é otimização opcional: uma máscara ruim gera
    blocos uniformes ou falsos localizadores que o leitor não decodifica.
  */
  const gravaFormato = (m: boolean[][], mascara: number) => {
    const formato = FORMATO_M[mascara];

    /*
      Posições verificadas contra um codificador de referência: a cópia 1
      começa na LINHA 8 (colunas 0..5, depois 7 e 8) e sobe pela coluna 8;
      trocar as duas metades produz um formato que nenhum leitor reconhece.
      O bit 14 é o primeiro da ordem de leitura, daí o (14 - i).
    */
    for (let i = 0; i < 15; i++) {
      const bit = ((formato >> (14 - i)) & 1) === 1;

      if (i < 6) m[8][i] = bit;
      else if (i === 6) m[8][7] = bit;
      else if (i === 7) m[8][8] = bit;
      else if (i === 8) m[7][8] = bit;
      else m[14 - i][8] = bit;

      // Cópia 2: coluna 8 subindo pela borda inferior, depois linha 8 à direita.
      if (i < 8) m[tamanho - 1 - i][8] = bit;
      else m[8][tamanho - 15 + i] = bit;
    }
    // O módulo escuro fixo é regravado: a cópia 2 passa por cima dele.
    m[tamanho - 8][8] = true;
  };

  let melhor: boolean[][] | null = null;
  let menorPenalidade = Infinity;

  for (let mascara = 0; mascara < 8; mascara++) {
    const candidata = base.map((linha) => [...linha]);
    const aplica = MASCARAS[mascara];

    for (const [linha, coluna] of posicoes) {
      if (aplica(linha, coluna)) {
        candidata[linha][coluna] = !candidata[linha][coluna];
      }
    }
    gravaFormato(candidata, mascara);

    const nota = penalidade(candidata);
    if (nota < menorPenalidade) {
      menorPenalidade = nota;
      melhor = candidata;
    }
  }

  return melhor!;
}
