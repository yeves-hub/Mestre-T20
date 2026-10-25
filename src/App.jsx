import React, { useState } from "react";

// ═══════════════════════════════════════════════════
// SEÇÃO 1 — ESTILOS GLOBAIS
// ═══════════════════════════════════════════════════
const s = {
  root: {
    minHeight: "100vh",
    background: "linear-gradient(160deg,#1c0e00,#0d0700)",
    color: "#f0d8a0",
    fontFamily: "'IM Fell English', Georgia, serif",
    padding: "16px",
    boxSizing: "border-box",
  },
  topo: {
    textAlign: "center",
    marginBottom: 20,
    padding: "16px 8px",
    borderBottom: "1px solid #8b5e1a55",
  },
  topoTitulo: {
    fontFamily: "'Cinzel Decorative','Cinzel',serif",
    fontSize: 28,
    fontWeight: 900,
    color: "#e8a020",
    letterSpacing: 3,
    margin: 0,
  },
  topoSub: {
    fontFamily: "'Cinzel',serif",
    fontSize: 10,
    letterSpacing: 3,
    color: "#7a5020",
    marginTop: 4,
  },
  secao: {
    marginBottom: 18,
    padding: "14px",
    border: "1px solid #8b5e1a55",
    borderRadius: 8,
    background: "linear-gradient(135deg,#22120066,#180d0066)",
  },
  secaoTitulo: {
    fontFamily: "'Cinzel',serif",
    fontSize: 11,
    letterSpacing: 2,
    color: "#e8a020",
    textTransform: "uppercase",
    marginBottom: 10,
    borderBottom: "1px solid #8b5e1a55",
    paddingBottom: 6,
  },
  label: {
    fontFamily: "'Cinzel',serif",
    fontSize: 9,
    letterSpacing: 2,
    color: "#7a5020",
    textTransform: "uppercase",
    display: "block",
    marginBottom: 4,
  },
  input: {
    background: "#0d070088",
    border: "1px solid #8b5e1a55",
    borderRadius: 5,
    color: "#f0d8a0",
    fontFamily: "'IM Fell English',Georgia,serif",
    fontSize: 13,
    padding: "7px 10px",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  btn: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "1px solid #8b5e1a",
    background: "linear-gradient(180deg,#3a1e00,#1c0e00)",
    color: "#c8922a",
    fontFamily: "'Cinzel',serif",
    fontSize: 10,
    letterSpacing: 2,
    cursor: "pointer",
    textTransform: "uppercase",
  },
  btnPrimario: {
    padding: "12px 20px",
    borderRadius: 6,
    border: "1px solid #c8922a",
    background: "linear-gradient(180deg,#5a3010,#2a1800)",
    color: "#e8a020",
    fontFamily: "'Cinzel',serif",
    fontSize: 11,
    letterSpacing: 2,
    cursor: "pointer",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg,transparent,#8b5e1a,transparent)",
    margin: "16px 0",
  },
};

// ═══════════════════════════════════════════════════
// SEÇÃO 2 — TABELAS DO LIVRO
// ══════════════════════════════════════════════════

const T8_1 = {
  "1/4": {
    dinheiro: [[1,30,"—"],[31,70,"1d6×10 TC"],[71,95,"1d4×100 TC"],[96,100,"1d6×10 T$"]],
    itens: [[1,50,"—"],[51,75,"Diverso"],[76,100,"Equipamento"]]
  },
  "1/2": {
    dinheiro: [[1,25,"—"],[26,70,"2d6×10 TC"],[71,95,"2d8×10 T$"],[96,100,"1d4×100 T$"]],
    itens: [[1,45,"—"],[46,70,"Diverso"],[71,100,"Equipamento"]]
  },
  "1": {
    dinheiro: [[1,20,"—"],[21,70,"3d8×10 T$"],[71,95,"4d12×10 T$"],[96,100,"1 riqueza menor"]],
    itens: [[1,40,"—"],[41,65,"Diverso"],[66,90,"Equipamento"],[91,100,"1 poção"]]
  },
  "2": {
    dinheiro: [[1,15,"—"],[16,55,"3d10×10 T$"],[56,85,"2d4×100 T$"],[86,95,"2d6+1×100 T$"],[96,100,"1 riqueza menor"]],
    itens: [[1,30,"—"],[31,40,"Diverso"],[41,70,"Equipamento"],[71,90,"1 poção"],[91,100,"Superior (1 melhoria)"]]
  },
  "3": {
    dinheiro: [[1,10,"—"],[11,20,"4d12×10 T$"],[21,60,"1d4×100 T$"],[61,90,"1d8×10 TO"],[91,100,"1d3 riquezas menores"]],
    itens: [[1,25,"—"],[26,35,"Diverso"],[36,60,"Equipamento"],[61,85,"1 poção"],[86,100,"Superior (1 melhoria)"]]
  },
  "4": {
    dinheiro: [[1,10,"—"],[11,50,"1d6×100 T$"],[51,80,"1d12×100 T$"],[81,90,"1 riqueza menor +%"],[91,100,"1d3 riquezas menores +%"]],
    itens: [[1,20,"—"],[21,30,"Diverso"],[31,55,"Equipamento 2D"],[56,80,"1 poção +%"],[81,100,"Superior (1 melhoria) 2D"]]
  },
  "5": {
    dinheiro: [[1,15,"—"],[16,65,"1d8×100 T$"],[66,95,"3d4×10 TO"],[96,100,"1 riqueza média"]],
    itens: [[1,20,"—"],[21,70,"1 poção"],[71,90,"Superior (1 melhoria)"],[91,100,"Superior (2 melhorias)"]]
  },
  "6": {
    dinheiro: [[1,15,"—"],[16,60,"2d6×100 T$"],[61,90,"2d10×100 T$"],[91,100,"1d3+1 riquezas menores"]],
    itens: [[1,20,"—"],[21,65,"1 poção +%"],[66,95,"Superior (1 melhoria)"],[96,100,"Superior (2 melhorias) 2D"]]
  },
  "7": {
    dinheiro: [[1,10,"—"],[11,60,"2d8×100 T$"],[61,90,"2d12×10 TO"],[91,100,"1d4+1 riquezas menores"]],
    itens: [[1,20,"—"],[21,60,"1d3 poções"],[61,90,"Superior (2 melhorias)"],[91,100,"Superior (3 melhorias)"]]
  },
  "8": {
    dinheiro: [[1,10,"—"],[11,55,"2d10×100 T$"],[56,95,"1d4+1 riquezas menores"],[96,100,"1 riqueza média +%"]],
    itens: [[1,20,"—"],[21,75,"1d3 poções"],[76,95,"Superior (2 melhorias)"],[96,100,"Superior (3 melhorias) 2D"]]
  },
  "9": {
    dinheiro: [[1,10,"—"],[11,35,"1 riqueza média"],[36,85,"4d6×100 T$"],[86,100,"1d3 riquezas médias"]],
    itens: [[1,20,"—"],[21,70,"1 poção +%"],[71,95,"Superior (3 melhorias)"],[96,100,"Mágico (menor)"]]
  },
  "10": {
    dinheiro: [[1,10,"—"],[11,30,"4d6×100 T$"],[31,85,"4d10×10 TO"],[86,100,"1d3+1 riquezas médias"]],
    itens: [[1,50,"—"],[51,75,"1d3+1 poções"],[76,90,"Superior (3 melhorias)"],[91,100,"Mágico (menor)"]]
  },
  "11": {
    dinheiro: [[1,10,"—"],[11,45,"2d4×1.000 T$"],[46,85,"1d3 riquezas médias"],[86,100,"2d6×100 TO"]],
    itens: [[1,45,"—"],[46,70,"1d4+1 poções"],[71,90,"Superior (3 melhorias)"],[91,100,"Mágico (menor) 2D"]]
  },
  "12": {
    dinheiro: [[1,10,"—"],[11,45,"1 riqueza média +%"],[46,80,"2d6×1.000 T$"],[81,100,"1d4+1 riquezas médias"]],
    itens: [[1,45,"—"],[46,70,"1d3+1 poções +%"],[71,85,"Superior (4 melhorias)"],[86,100,"Mágico (menor)"]]
  },
  "13": {
    dinheiro: [[1,10,"—"],[11,45,"4d4×1.000 T$"],[46,80,"1d3+1 riquezas médias"],[81,100,"4d6×100 TO"]],
    itens: [[1,40,"—"],[41,65,"1d4+1 poções +%"],[66,95,"Superior (4 melhorias)"],[96,100,"Mágico (médio)"]]
  },
  "14": {
    dinheiro: [[1,10,"—"],[11,45,"1d3+1 riquezas médias"],[46,80,"3d6×1.000 T$"],[81,100,"1 riqueza maior"]],
    itens: [[1,40,"—"],[41,65,"1d4+1 poções +%"],[66,90,"Superior (4 melhorias)"],[91,100,"Mágico (médio)"]]
  },
  "15": {
    dinheiro: [[1,10,"—"],[11,45,"1 riqueza média +%"],[46,80,"2d10×1.000 T$"],[81,100,"1d4×1.000 TO"]],
    itens: [[1,35,"—"],[36,45,"1d6+1 poções"],[46,85,"Superior (4 melhorias) 2D"],[86,100,"Mágico (médio)"]]
  },
  "16": {
    dinheiro: [[1,10,"—"],[11,40,"3d6×1.000 T$"],[41,75,"3d10×100 TO"],[76,100,"1d3 riquezas maiores"]],
    itens: [[1,35,"—"],[36,45,"1d6+1 poções +%"],[46,80,"Superior (4 melhorias) 2D"],[81,100,"Mágico (médio)"]]
  },
  "17": {
    dinheiro: [[1,5,"—"],[6,40,"4d6×1.000 T$"],[41,75,"1d3 riquezas médias +%"],[76,100,"2d4×1.000 TO"]],
    itens: [[1,20,"—"],[21,40,"Mágico (menor)"],[41,80,"Mágico (médio)"],[81,100,"Mágico (maior)"]]
  },
  "18": {
    dinheiro: [[1,5,"—"],[6,40,"4d10×1.000 T$"],[41,75,"1 riqueza maior"],[76,100,"1d3+1 riquezas maiores"]],
    itens: [[1,15,"—"],[16,40,"Mágico (menor) 2D"],[41,70,"Mágico (médio)"],[71,100,"Mágico (maior)"]]
  },
  "19": {
    dinheiro: [[1,5,"—"],[6,40,"4d12×1.000 T$"],[41,75,"1 riqueza maior +%"],[76,100,"1d12×1.000 TO"]],
    itens: [[1,10,"—"],[11,40,"Mágico (menor) 2D"],[41,60,"Mágico (médio) 2D"],[61,100,"Mágico (maior)"]]
  },
  "20": {
    dinheiro: [[1,5,"—"],[6,40,"2d4×1.000 TO"],[41,75,"1d3 riquezas maiores"],[76,100,"1d3+1 riquezas maiores +%"]],
    itens: [[1,5,"—"],[6,40,"Mágico (menor) 2D"],[41,50,"Mágico (médio) 2D"],[51,100,"Mágico (maior) 2D"]]
  }
};

const T8_2 = [
  ["1-25","—","—","4d4 (10)","Ágata ou hematita (1/2); barril de farinha ou gaiola com galinhas (5)"],
  ["26-40","—","—","1d4×10 (25)","Quartzo rosa ou topázio (1/2); caixa de tabaco ou rolo de linho (1); jarro de especiarias (2)"],
  ["41-55","01-10","—","2d4×10 (50)","Bracelete de ouro finamente trabalhado (1/2); estatueta de osso ou marfim (1); vaso de prata (2)"],
  ["56-70","11-30","—","4d6×10 (140)","Ametista ou pérola branca (1/2); lingote de prata ou cálice de prata (1); tapeçaria grande de lã (5)"],
  ["71-85","31-50","01-05","1d6×100 (350)","Alexandrita ou pérola negra (1/2); espada cerimonial ornada com prata (1)"],
  ["86-95","51-65","06-15","2d6×100 (700)","Pente em forma de dragão com olhos de gema vermelha (1); harpa de madeira exótica (5)"],
  ["96-99","66-80","16-25","2d8×100 (900)","Opala negra ou tapa-olho com olho falso de safira (1/2); luva bordada com gemas (1); lingote de ouro (2)"],
  ["100","81-90","26-40","4d10×100 (2.200)","Esmeralda verde ou pingente de safira (1/2); caixinha de música de ouro (1); manto bordado com pedras preciosas (2)"],
  ["—","91-95","41-60","6d12×100 (3.900)","Anel de prata e safira ou correntinha com pérolas rosas (1/2); ídolo de ouro puro maciço (5)"],
  ["—","96-99","61-75","2d10×1.000 (11.000)","Anel de ouro e rubi ou diamante vermelho (1/2); conjunto de taças de ouro com esmeraldas (2)"],
  ["—","100","76-85","6d8×1.000 (27.000)","Coroa de ouro adornada com centenas de gemas (1); baú de mitral com coleção de diamantes (2)"],
  ["—","—","86-95","1d10×10.000 (55.000)","Arca de madeira reforçada repleta de lingotes de prata e ouro (20)"],
  ["—","—","96-100","4d12×10.000 (260.000)","Uma sala forrada de moedas!"]
];

const T8_3 = [
  [1,2,"Ácido"],[3,4,"Água benta"],[5,5,"Alaúde élfico"],[6,6,"Algemas"],
  [7,8,"Baga-de-fogo"],[9,23,"Bálsamo restaurador"],[24,24,"Bandana"],
  [25,25,"Bandoleira de poções"],[26,30,"Bomba"],[31,31,"Botas reforçadas"],
  [32,32,"Camisa bufante"],[33,33,"Capa esvoaçante"],[34,34,"Capa pesada"],
  [35,35,"Casaco longo"],[36,36,"Chapéu arcano"],[37,38,"Coleção de livros"],
  [39,40,"Cosmético"],[41,42,"Dente-de-dragão"],[43,43,"Enfeite de elmo"],
  [44,44,"Elixir do amor"],[45,46,"Equipamento de viagem"],[47,56,"Essência de mana"],
  [57,57,"Estojo de disfarces"],[58,58,"Farrapos de ermitão"],[59,59,"Flauta mística"],
  [60,66,"Fogo alquímico"],[67,67,"Gorro de ervas"],[68,69,"Líquen lilás"],
  [70,70,"Luneta"],[71,71,"Luva de pelica"],[72,73,"Maleta de medicamentos"],
  [74,74,"Manopla"],[75,75,"Manto eclesiástico"],[76,78,"Mochila de aventureiro"],
  [79,80,"Musgo púrpura"],[81,81,"Organizador de pergaminhos"],[82,83,"Ossos de monstro"],
  [84,85,"Pó de cristal"],[86,87,"Pó de giz"],[88,88,"Pó do desaparecimento"],
  [89,89,"Robe místico"],[90,91,"Saco de sal"],[92,92,"Sapatos de camurça"],
  [93,94,"Seixo de âmbar"],[95,95,"Sela"],[96,96,"Tabardo"],[97,97,"Traje da corte"],
  [98,99,"Terra de cemitério"],[100,100,"Veste de seda"]
];

const T8_4 = {
  armas: [
    [1,3,"Adaga"],[4,5,"Alabarda"],[6,7,"Alfange"],[8,10,"Arco curto"],
    [11,13,"Arco longo"],[14,15,"Azagaia"],[16,16,"Balas (20)"],[17,18,"Besta leve"],
    [19,20,"Besta pesada"],[21,23,"Bordão"],[24,24,"Chicote"],[25,27,"Cimitarra"],
    [28,30,"Clava"],[31,31,"Corrente de espinhos"],[32,33,"Espada bastarda"],
    [34,38,"Espada curta"],[39,43,"Espada longa"],[44,46,"Flechas (20)"],
    [47,49,"Florete"],[50,51,"Foice"],[52,53,"Funda"],[54,55,"Gadanho"],
    [56,56,"Katana"],[57,59,"Lança"],[60,60,"Lança montada"],[61,63,"Maça"],
    [64,66,"Machadinha"],[67,67,"Machado anão"],[68,70,"Machado de batalha"],
    [71,73,"Machado de guerra"],[74,74,"Machado túrquico"],[75,76,"Mangual"],
    [77,77,"Marreta"],[78,80,"Martelo de guerra"],[81,83,"Montante"],
    [84,84,"Mosquete"],[85,85,"Pedras (20)"],[86,88,"Picareta"],[89,90,"Pique"],
    [91,92,"Pistola"],[93,93,"Rede"],[94,96,"Tacape"],[97,98,"Tridente"],[99,100,"Virote (20)"]
  ],
  // Dados extras: Categoria, Uso, Tipo de dano
  detalhesArmas: {
    "Adaga": { categoria: "Simples", uso: "Uma mão", tipo: "Perfuração" },
    "Alabarda": { categoria: "Marcial", uso: "Duas mãos", tipo: "Corte/Perfuração" },
    "Alfange": { categoria: "Marcial", uso: "Uma mão", tipo: "Corte" },
    "Arco curto": { categoria: "Simples", uso: "Duas mãos", tipo: "Perfuração", alcance: "Curto" },
    "Arco longo": { categoria: "Marcial", uso: "Duas mãos", tipo: "Perfuração", alcance: "Médio" },
    "Azagaia": { categoria: "Simples", uso: "Uma mão", tipo: "Perfuração" },
    "Balas (20)": { categoria: "Munição", uso: "—", tipo: "Impacto" },
    "Besta leve": { categoria: "Simples", uso: "Duas mãos", tipo: "Perfuração", alcance: "Curto" },
    "Besta pesada": { categoria: "Marcial", uso: "Duas mãos", tipo: "Perfuração", alcance: "Médio" },
    "Bordão": { categoria: "Simples", uso: "Duas mãos", tipo: "Impacto" },
    "Chicote": { categoria: "Exótica", uso: "Uma mão", tipo: "Corte" },
    "Cimitarra": { categoria: "Marcial", uso: "Uma mão", tipo: "Corte" },
    "Clava": { categoria: "Simples", uso: "Uma mão", tipo: "Impacto" },
    "Corrente de espinhos": { categoria: "Exótica", uso: "Duas mãos", tipo: "Corte" },
    "Espada bastarda": { categoria: "Exótica", uso: "Uma/duas mãos", tipo: "Corte" },
    "Espada curta": { categoria: "Marcial", uso: "Uma mão", tipo: "Perfuração" },
    "Espada longa": { categoria: "Marcial", uso: "Uma mão", tipo: "Corte" },
    "Flechas (20)": { categoria: "Munição", uso: "—", tipo: "Perfuração" },
    "Florete": { categoria: "Marcial", uso: "Uma mão", tipo: "Perfuração" },
    "Foice": { categoria: "Simples", uso: "Duas mãos", tipo: "Corte" },
    "Funda": { categoria: "Simples", uso: "Uma mão", tipo: "Impacto", alcance: "Curto" },
    "Gadanho": { categoria: "Marcial", uso: "Duas mãos", tipo: "Corte" },
    "Katana": { categoria: "Exótica", uso: "Uma mão", tipo: "Corte" },
    "Lança": { categoria: "Simples", uso: "Uma mão", tipo: "Perfuração" },
    "Lança montada": { categoria: "Marcial", uso: "Uma mão", tipo: "Perfuração" },
    "Maça": { categoria: "Simples", uso: "Uma mão", tipo: "Impacto" },
    "Machadinha": { categoria: "Marcial", uso: "Uma mão", tipo: "Corte" },
    "Machado anão": { categoria: "Exótica", uso: "Uma mão", tipo: "Corte" },
    "Machado de batalha": { categoria: "Marcial", uso: "Uma mão", tipo: "Corte" },
    "Machado de guerra": { categoria: "Marcial", uso: "Uma mão", tipo: "Corte" },
    "Machado túrquico": { categoria: "Exótica", uso: "Uma mão", tipo: "Corte" },
    "Mangual": { categoria: "Marcial", uso: "Uma mão", tipo: "Impacto" },
    "Marreta": { categoria: "Marcial", uso: "Duas mãos", tipo: "Impacto" },
    "Martelo de guerra": { categoria: "Marcial", uso: "Uma mão", tipo: "Impacto" },
    "Montante": { categoria: "Marcial", uso: "Duas mãos", tipo: "Corte" },
    "Mosquete": { categoria: "Exótica", uso: "Duas mãos", tipo: "Perfuração", alcance: "Longo" },
    "Pedras (20)": { categoria: "Munição", uso: "—", tipo: "Impacto" },
    "Picareta": { categoria: "Marcial", uso: "Uma mão", tipo: "Perfuração" },
    "Pique": { categoria: "Marcial", uso: "Duas mãos", tipo: "Perfuração" },
    "Pistola": { categoria: "Exótica", uso: "Uma mão", tipo: "Perfuração", alcance: "Curto" },
    "Rede": { categoria: "Exótica", uso: "Duas mãos", tipo: "—" },
    "Tacape": { categoria: "Simples", uso: "Duas mãos", tipo: "Impacto" },
    "Tridente": { categoria: "Marcial", uso: "Uma mão", tipo: "Perfuração" },
    "Virote (20)": { categoria: "Munição", uso: "—", tipo: "Perfuração" }
  },
  armaduras: [
    [1,5,"Couro"],[6,10,"Brunea"],[11,25,"Completa"],[26,30,"Cota de malha"],
    [31,45,"Couraça"],[46,55,"Couro batido"],[56,65,"Escudo leve"],
    [66,80,"Escudo pesado"],[81,85,"Gibão de peles"],[86,90,"Loriga segmentada"],
    [91,100,"Meia armadura"]
  ],
  esotericos: [
    [1,10,"Bolsa de pó"],[11,25,"Cajado arcano"],[26,35,"Cetro elemental"],
    [36,42,"Costela de lich"],[43,50,"Dedo de ente"],[51,55,"Luva de ferro"],
    [56,65,"Medalhão de prata"],[66,75,"Orbe cristalina"],[76,85,"Tomo hermético"],
    [86,100,"Varinha arcana"]
  ],
  detalhesArmaduras: {
    "Couro": { categoria: "Leve", penalidade: 0, tipo: "Couro" },
    "Brunea": { categoria: "Leve", penalidade: -2, tipo: "Couro metalizado" },
    "Completa": { categoria: "Pesada", penalidade: -4, tipo: "Placas" },
    "Cota de malha": { categoria: "Média", penalidade: -2, tipo: "Malha" },
    "Couraça": { categoria: "Média", penalidade: -2, tipo: "Couro reforçado" },
    "Couro batido": { categoria: "Leve", penalidade: -1, tipo: "Couro endurecido" },
    "Escudo leve": { categoria: "Escudo", penalidade: -1, tipo: "Madeira/metal" },
    "Escudo pesado": { categoria: "Escudo", penalidade: -2, tipo: "Madeira/metal" },
    "Gibão de peles": { categoria: "Leve", penalidade: -3, tipo: "Couro/aspecto selvagem" },
    "Loriga segmentada": { categoria: "Média", penalidade: -2, tipo: "Malha segmentada" },
    "Meia armadura": { categoria: "Média", penalidade: -3, tipo: "Placas parciais" }
  }
};


const T8_5 = {
  armas: [
    [1,10,"Atroz"],[11,13,"Banhada a ouro"],[14,23,"Certeira"],
    [24,26,"Cravejada de gemas"],[27,36,"Cruel"],[37,39,"Discreta"],
    [40,44,"Equilibrada"],[45,48,"Harmonizada"],[49,53,"Injeção alquímica"],
    [54,55,"Macabra"],[56,65,"Maciça"],[66,75,"Material especial"],
    [76,80,"Mira telescópica"],[81,90,"Precisa"],[91,100,"Pungente"]
  ],
  armaduras: [
    [1,15,"Ajustada"],[16,19,"Banhada a ouro"],[20,23,"Cravejada de gemas"],
    [24,28,"Delicada"],[29,32,"Discreta"],[33,37,"Espinhos"],
    [38,40,"Macabra"],[41,50,"Material especial"],[51,55,"Polida"],
    [56,80,"Reforçada"],[81,90,"Selada"],[91,100,"Sob medida"]
  ],
  esotericos: [
    [1,4,"Banhado a ouro"],[5,19,"Canalizador"],[20,23,"Cravejado de gemas"],
    [24,27,"Discreto"],[28,42,"Energético"],[43,57,"Harmonizado"],
    [58,60,"Macabro"],[61,69,"Material especial"],[70,85,"Canalizador"],
    [86,100,"Vigilante"]
  ]
};

const T8_8 = [
  [1,5,"Ameaçadora","Duplica margem de ameaça"],
  [6,10,"Anticriatura","Bônus contra tipo de criatura"],
  [11,12,"Arremesso","Pode ser arremessada"],
  [13,14,"Assassina","Aumenta ataque furtivo"],
  [15,16,"Caçadora","Ignora camuflagem leve e cobertura leve"],
  [17,21,"Congelante","+1d6 de dano de frio"],
  [22,23,"Conjuradora","Pode guardar e lançar magias"],
  [24,28,"Corrosiva","+1d6 de dano de ácido"],
  [29,30,"Dançarina","Ataca sozinha"],
  [31,34,"Defensora","Defesa +2"],
  [35,36,"Destruidora","Bônus contra construtos"],
  [37,38,"Dilacerante","+10 de dano em acertos críticos"],
  [39,40,"Drenante","Crítico drena vítima"],
  [41,45,"Elétrica","+1d6 de dano de eletricidade"],
  [46,46,"Energética","Bônus em ataque"],
  [47,48,"Excruciante","Causa fraqueza"],
  [49,53,"Flamejante","+1d6 de dano de fogo"],
  [54,63,"Formidável","Ataque e dano +2"],
  [64,64,"Lacinante","Causa crítico terrível"],
  [65,72,"Magnífica","Ataque e dano +4"],
  [73,74,"Piedosa","Dano não letal"],
  [75,76,"Profana","Bônus contra devotos do Bem"],
  [77,78,"Sagrada","Bônus contra devotos do Mal"],
  [79,80,"Sanguinária","Causa sangramento"],
  [81,82,"Trovejante","Causa atordoamento"],
  [83,84,"Tumular","+1d8 de dano de trevas"],
  [85,88,"Veloz","Fornece ataque extra"],
  [89,90,"Venenosa","Causa envenenamento"],
  [91,100,"→ Arma específica","Rola na Tabela 8-9"]
];

const T8_9 = [
  [1,5,"Azagaia dos relâmpagos",30000],[6,15,"Espada baronial",30000],
  [16,25,"Lâmina da luz",45000],[26,30,"Lança animalesca",45000],
  [31,35,"Maça do terror",45000],[36,40,"Florete fugaz",50000],
  [41,45,"Cajado da destruição",60000],[46,50,"Cajado da vida",60000],
  [51,55,"Machado silvestre",70000],[56,60,"Martelo de Doherimm",70000],
  [61,67,"Arco do poder",90000],[68,72,"Língua do deserto",90000],
  [73,77,"Besta explosiva",100000],[78,82,"Punhal sszaazita",100000],
  [83,87,"Espada sortuda",110000],[88,92,"Avalanche",140000],
  [93,95,"Cajado do poder",180000],[96,100,"Vingadora sagrada",200000]
];

const T8_10 = [
  [1,6,"Abascanto","Resistência contra magia"],
  [7,10,"Abençoado","Resistência contra trevas"],
  [11,12,"Acrobático","Bônus em Acrobacia"],
  [13,14,"Alado","Deslocamento de voo 12m"],
  [15,16,"Animado","Escudo defende sozinho"],
  [17,18,"Assustador","Causa efeito de medo"],
  [19,22,"Cáustica","Resistência contra ácido"],
  [23,32,"Defensor","Defesa +2"],
  [33,34,"Escorregadio","Bônus para escapar"],
  [35,36,"Esmagador","Escudo causa mais dano"],
  [37,38,"Fantasmagórico","Lança Manto de Sombras"],
  [39,40,"Fortificado","Chance de ignorar crítico"],
  [41,44,"Gélido","Resistência contra frio"],
  [45,54,"Guardião","Defesa +4"],
  [55,56,"Hipnótico","Fascina inimigos"],
  [57,58,"Ilusório","Camufla-se como item comum"],
  [59,62,"Incandescente","Resistência contra fogo"],
  [63,68,"Invulnerável","Redução de dano"],
  [69,72,"Opaco","Redução de energia"],
  [73,78,"Protetor","Resistência +2"],
  [79,80,"Refletor","Reflete magia"],
  [81,84,"Relampejante","Resistência contra eletricidade"],
  [85,86,"Reluzente","Causa efeito de cegueira"],
  [87,88,"Sombrio","Bônus em Furtividade"],
  [89,90,"Zeloso","Atrai ataques em aliados"],
  [91,100,"→ Item específico","Rola na Tabela 8-11"]
];

const T8_11 = [
  [1,10,"Cota élfica",30000],[11,20,"Couro de monstro",36000],
  [21,25,"Escudo do conjurador",45000],[26,32,"Loriga do centurião",45000],
  [33,42,"Manto da noite",45000],[43,49,"Couraça do comando",45000],
  [50,59,"Baluarte anão",50000],[60,66,"Escudo espinhoso",50000],
  [67,76,"Escudo do leão",50000],[77,83,"Carapaça demoníaca",63000],
  [84,88,"Escudo do eclipse",70000],[89,93,"Escudo de Azgher",140000],
  [94,100,"Armadura da luz",150000]
];

const T8_12 = [
  [1,1,"Abençoar Alimentos (óleo)",30],[2,3,"Área Escorregadia (granada)",30],
  [4,6,"Arma Mágica (óleo)",30],[7,7,"Compreensão",30],
  [8,15,"Curar Ferimentos (2d8+2 PV)",30],[16,18,"Disfarce Ilusório",30],
  [19,20,"Escuridão (óleo)",30],[21,22,"Luz (óleo)",30],
  [23,24,"Névoa (granada)",30],[25,26,"Primor Atlético",30],
  [27,28,"Proteção Divina",30],[29,30,"Resistência a Energia",30],
  [31,32,"Sono",30],[33,33,"Suporte Ambiental",30],
  [34,34,"Tranca Arcana (óleo)",30],[35,35,"Visão Mística",30],
  [36,36,"Vitalidade Fantasma",30],[37,38,"Escudo da Fé",120],
  [39,40,"Alterar Tamanho",270],[41,42,"Aparência Perfeita",270],
  [43,43,"Armamento da Natureza",270],[44,49,"Bola de Fogo (granada)",270],
  [50,51,"Camuflagem Ilusória",270],[52,53,"Concentração de Combate",270],
  [54,62,"Curar Ferimentos (4d8+4 PV)",270],[63,66,"Físico Divino",270],
  [67,68,"Mente Divina",270],[69,70,"Metamorfose",270],
  [71,75,"Purificação",270],[76,77,"Velocidade",270],
  [78,79,"Vestimenta da Fé (óleo)",270],[80,80,"Voz Divina",270],
  [81,82,"Arma Mágica (óleo; bônus +3)",750],
  [83,88,"Curar Ferimentos (7d8+7 PV)",1080],
  [89,89,"Físico Divino (três atributos)",1080],
  [90,92,"Invisibilidade (duração cena)",1080],
  [93,96,"Bola de Fogo (10d6 de dano)",1470],
  [97,100,"Curar Ferimentos (11d8+11 PV)",3000]
];

const T8_13 = [
  [1,2,"Anel do sustento",3000],[3,7,"Bainha mágica",3000],
  [8,12,"Corda da escalada",3000],[13,14,"Ferraduras da velocidade",3000],
  [15,19,"Garrafa da fumaça eterna",3000],[20,24,"Gema de luminosidade",3000],
  [25,29,"Manto élfico",3000],[30,34,"Mochila de carga",3000],
  [35,40,"Brincos da sagacidade",4500],[41,46,"Luvas da delicadeza",4500],
  [47,52,"Manoplas da força do ogro",4500],[53,59,"Manto da resistência",4500],
  [60,65,"Manto do fascínio",4500],[66,71,"Pingente da sensatez",4500],
  [72,77,"Torque do vigor",4500],[78,82,"Chapéu do disfarce",6000],
  [83,84,"Flauta fantasma",6000],[85,89,"Lanterna da revelação",6000],
  [90,96,"Anel da proteção",9000],[97,98,"Anel do escudo mental",9000],
  [99,100,"Pingente da saúde",9000]
];

const T8_14 = [
  [1,4,"Anel de telecinesia",10500],[5,8,"Bola de cristal",10500],
  [9,10,"Caveira maldita",10500],[11,14,"Botas aladas",15000],
  [15,18,"Braceletes de bronze",16500],[19,24,"Anel da energia",21000],
  [25,30,"Anel da vitalidade",21000],[31,34,"Anel de invisibilidade",21000],
  [35,38,"Braçadeiras do arqueiro",21000],[39,42,"Brincos de Marah",21000],
  [43,46,"Faixas do pugilista",21000],[47,50,"Manto da aranha",21000],
  [51,54,"Vassoura voadora",21000],[55,58,"Símbolo abençoado",21000],
  [59,64,"Amuleto da robustez",25500],[65,68,"Botas velozes",25500],
  [69,74,"Cinto da força do gigante",25500],[75,80,"Coroa majestosa",25500],
  [81,86,"Estola da serenidade",25500],[87,88,"Manto do morcego",25500],
  [89,94,"Pulseiras da celeridade",25500],[95,100,"Tiara da sapiência",25500]
];

const T8_15 = [
  [1,2,"Elmo do teletransporte",30000],[3,4,"Gema da telepatia",30000],
  [5,9,"Gema elemental",30000],[10,15,"Manual da saúde corporal",30000],
  [16,21,"Manual do bom exercício",30000],[22,27,"Manual dos movimentos precisos",30000],
  [28,34,"Medalhão de Lena",30000],[35,40,"Tomo da compreensão",30000],
  [41,46,"Tomo da liderança e influência",30000],[47,52,"Tomo dos grandes pensamentos",30000],
  [53,57,"Anel refletor",51000],[58,60,"Cinto do campeão",51000],
  [61,67,"Colar guardião",51000],[68,72,"Estatueta animista",51000],
  [73,77,"Anel da liberdade",60000],[78,82,"Tapete voador",60000],
  [83,87,"Braceletes de ouro",64500],[88,89,"Espelho da oposição",75000],
  [90,94,"Robe do arquimago",90000],[95,96,"Orbe das tempestades",97500],
  [97,98,"Anel da regeneração",150000],[99,100,"Espelho do aprisionamento",150000]
];

// ══════════════════════════════════════════════════
// SEÇÃO 3 — FUNÇÕES DE ROLAGEM
// ═══════════════════════════════════════════════════

function rolarDado(lados) {
  return Math.floor(Math.random() * lados) + 1;
}

function rolarNd(n, lados) {
  let total = 0;
  for (let i = 0; i < n; i++) {
    total += rolarDado(lados);
  }
  return total;
}

function rolarD100() {
  return rolarDado(100);
}

// Consulta tabela d%
function consultarTabela(tabela, resultado) {
  for (const row of tabela) {
    const min = row[0];
    const max = row[1];
    const rest = row.slice(2);
    
    // Ignora linhas com min = "—" (usadas na T8_2)
    if (min === "—") continue;
    
    if (resultado >= min && resultado <= max) {
      return { min, max, valor: rest.length === 1 ? rest[0] : rest, resultado };
    }
  }
  return { min: 0, max: 0, valor: "???", resultado };
}

// Interpreta expressões como "1d6×10 TC"
function interpretarExpressao(expr) {
  const limpo = expr.replace(/\s/g, "").replace(/\./g, "");
  const moedaMatch = limpo.match(/(TC|T\$|TO)$/);
  const moeda = moedaMatch ? moedaMatch[1] : "";
  const semMoeda = moedaMatch ? limpo.replace(moedaMatch[0], "") : limpo;
  
  const match = semMoeda.match(/^(\d+)d(\d+)(?:\+(\d+))?×(\d+)$/);
  
  if (match) {
    const n = parseInt(match[1]);
    const lados = parseInt(match[2]);
    const bonus = match[3] ? parseInt(match[3]) : 0;
    const mult = parseInt(match[4]);
    
    const somaDados = rolarNd(n, lados);
    const valor = (somaDados + bonus) * mult;
    
    return {
      tipo: "Moedas",
      valor: valor,
      moeda: moeda,
      texto: `${expr} → [${somaDados}${bonus ? "+"+bonus : ""}] × ${mult} = ${valor} ${moeda}`,
      detalhes: `Rolou ${n}d${lados}${bonus ? "+"+bonus : ""} = ${somaDados + bonus}, multiplicado por ${mult}`
    };
  }
  
  return { valor: 0, moeda: "", texto: expr, detalhes: "Expressão não interpretada" };
}

// Interpreta quantidade como "1d3 poções" ou "1d4+1 riquezas"
function interpretarQuantidade(expr) {
  const match = expr.match(/^(\d+)d(\d+)(?:\+(\d+))?$/);
  if (match) {
    const n = parseInt(match[1]);
    const lados = parseInt(match[2]);
    const bonus = match[3] ? parseInt(match[3]) : 0;
    const quantidade = rolarNd(n, lados) + bonus;
    return { quantidade, detalhes: `Rolou ${n}d${lados}${bonus ? "+"+bonus : ""} = ${quantidade}` };
  }
  const matchSimples = expr.match(/^(\d+)$/);
  if (matchSimples) {
    return { quantidade: parseInt(matchSimples[1]), detalhes: `Quantidade fixa: ${matchSimples[1]}` };
  }
  return { quantidade: 1, detalhes: "Quantidade padrão: 1" };
}

function interpretarValorRiqueza(expr) {
  // Pega só a parte antes do parêntese: ex "6d8×1.000 (27.000)" -> "6d8×1.000"
  const antesParentese = expr.split("(")[0].trim();
  const limpo = antesParentese.replace(/\./g, ""); // remove pontos de milhar

  const match = limpo.match(/^(\d+)d(\d+)(?:×(\d+))?$/);
  if (!match) return { total: 0, detalhes: "Valor não interpretado" };

  const n = parseInt(match[1]);
  const lados = parseInt(match[2]);
  const mult = match[3] ? parseInt(match[3]) : 1;

  const somaDados = rolarNd(n, lados);
  const total = somaDados * mult;

  const detalhes = `Rolou ${n}d${lados} = ${somaDados}${mult !== 1 ? ` × ${mult.toLocaleString("pt-BR")}` : ""} = ${total.toLocaleString("pt-BR")} T$`;

  return { total, detalhes };
}

// ═══════════════════════════════════════════════════
// SEÇÃO 4 — LÓGICA DE RESOLUÇÃO DE ITENS
// ═══════════════════════════════════════════════════

function rolarDiverso() {
  const roll = rolarD100();
  const resultado = consultarTabela(T8_3, roll);
  return { tipo: "Diverso", roll, item: resultado.valor };
}

function rolarEquipamento(usar2D = false) {
  let rollTipo;
  if (usar2D) {
    const d1 = rolarDado(6);
    const d2 = rolarDado(6);
    rollTipo = Math.min(d1, d2); // Escolhe o menor (Mestre escolhe)
  } else {
    rollTipo = rolarDado(6);
  }
  
  let tipo, tabela;
  if (rollTipo <= 3) {
    tipo = "Arma";
    tabela = T8_4.armas;
  } else if (rollTipo <= 5) {
    tipo = "Armadura/Escudo";
    tabela = T8_4.armaduras;
  } else {
    tipo = "Esotérico";
    tabela = T8_4.esotericos;
  }
  
  const rollItem = rolarD100();
  const resultado = consultarTabela(tabela, rollItem);
  
  const detalhes = tipo === "Arma" ? (T8_4.detalhesArmas[resultado.valor] || null) : null;
  
  return {
    tipo: "Equipamento",
    rollTipo,
    tipoEquipamento: tipo,
    rollItem,
    item: resultado.valor,
    detalhes,
    usar2D
  };
}

function rolarPocao(quantidadeExpr, usarBonus = false) {
  const { quantidade, detalhes: detalhesQtd } = interpretarQuantidade(quantidadeExpr);
  const pocoes = [];
  
  for (let i = 0; i < quantidade; i++) {
    let roll = rolarD100();
    if (usarBonus) {
      roll = Math.min(roll + 20, 100); // +% = +20%, máximo 100
    }
    const resultado = consultarTabela(T8_12, roll);
    pocoes.push({ roll, pocao: resultado.valor[0], preco: resultado.valor[1] });
  }
  
  return { tipo: "Poção", quantidade, pocoes, detalhesQtd, usarBonus };
}

function rolarMaterialEspecial() {
  const materiais = {
    1: "Aço-rubi",
    2: "Adamante",
    3: "Gelo eterno",
    4: "Madeira Tollon",
    5: "Matéria vermelha",
    6: "Mitral"
  };
  const roll = rolarDado(6);
  return { roll, material: materiais[roll] };
}

function rolarSuperior(qtdMelhoriasExpr, usar2D = false) {
  const { quantidade, detalhes: detalhesQtd } = interpretarQuantidade(qtdMelhoriasExpr);
  
  // Rola tipo (arma/armadura/esotérico)
  let rollTipo;
  if (usar2D) {
    const d1 = rolarDado(6);
    const d2 = rolarDado(6);
    rollTipo = Math.min(d1, d2);
  } else {
    rollTipo = rolarDado(6);
  }
  
  let tipoEquipamento, tabela, tabelaBase;
  if (rollTipo <= 3) {
    tipoEquipamento = "Arma";
    tabela = T8_5.armas;
    tabelaBase = T8_4.armas;
  } else if (rollTipo <= 5) {
    tipoEquipamento = "Armadura/Escudo";
    tabela = T8_5.armaduras;
    tabelaBase = T8_4.armaduras;
  } else {
    tipoEquipamento = "Esotérico";
    tabela = T8_5.esotericos;
    tabelaBase = T8_4.esotericos;
  }
  
  // Rola o item base na Tabela 8-4
  const rollItemBase = rolarD100();
  const resultadoBase = consultarTabela(tabelaBase, rollItemBase);
  const itemBase = resultadoBase.valor;
  const detalhesBase = tipoEquipamento === "Arma" ? (T8_4.detalhesArmas[itemBase] || null) :
                       tipoEquipamento === "Armadura/Escudo" ? (T8_4.detalhesArmaduras[itemBase] || null) : null;
  
  // Rola as melhorias
  const melhorias = [];
  for (let i = 0; i < quantidade; i++) {
    const roll = rolarD100();
    const resultado = consultarTabela(tabela, roll);
    const melhoria = { roll, melhoria: resultado.valor };
    
    if (resultado.valor === "Material especial") {
      melhoria.material = rolarMaterialEspecial();
    }
    
    melhorias.push(melhoria);
  }
  
  return {
    tipo: "Superior",
    rollTipo,
    tipoEquipamento,
    rollItemBase,
    itemBase,
    detalhesBase,
    melhorias,
    detalhesQtd,
    usar2D
  };
}

function rolarMagico(tipoMagico, usar2D = false) {
  // Rola tipo (1-2 arma, 3 armadura/escudo, 4-6 acessório)
  let rollTipo;
  if (usar2D) {
    const d1 = rolarDado(6);
    const d2 = rolarDado(6);
    rollTipo = Math.min(d1, d2);
  } else {
    rollTipo = rolarDado(6);
  }
  
  let tipoItem, tabelaEncantos, tabelaEspecifica, tabelaAcessorios, tabelaBase;
  
  if (rollTipo <= 2) {
    tipoItem = "Arma";
    tabelaEncantos = T8_8;
    tabelaEspecifica = T8_9;
    tabelaBase = T8_4.armas;
  } else if (rollTipo === 3) {
    tipoItem = "Armadura/Escudo";
    tabelaEncantos = T8_10;
    tabelaEspecifica = T8_11;
    tabelaBase = T8_4.armaduras;
  } else {
    tipoItem = "Acessório";
    if (tipoMagico === "menor") tabelaAcessorios = T8_13;
    else if (tipoMagico === "médio") tabelaAcessorios = T8_14;
    else tabelaAcessorios = T8_15;
  }
  
  let resultado;
  
  if (tipoItem === "Acessório") {
    const roll = rolarD100();
    const res = consultarTabela(tabelaAcessorios, roll);
    resultado = { roll, acessorio: res.valor[0], preco: res.valor[1] };
  } else {
    // Rola item base na Tabela 8-4
    const rollItemBase = rolarD100();
    const resBase = consultarTabela(tabelaBase, rollItemBase);
    const itemBase = resBase.valor;
    const detalhesBase = tipoItem === "Arma" ? (T8_4.detalhesArmas[itemBase] || null) :
                         tipoItem === "Armadura/Escudo" ? (T8_4.detalhesArmaduras[itemBase] || null) : null;
    
    // Rola encanto
    const rollEncanto = rolarD100();
    const resEncanto = consultarTabela(tabelaEncantos, rollEncanto);
    const encanto = resEncanto.valor[0];
    const efeito = resEncanto.valor[1];
    
    // Se cair em "→ Arma específica" ou "→ Item específico", rola na tabela específica
    let itemEspecifico = null;
    if (encanto.includes("→")) {
      const rollEspecifico = rolarD100();
      const resEspecifico = consultarTabela(tabelaEspecifica, rollEspecifico);
      itemEspecifico = { roll: rollEspecifico, item: resEspecifico.valor[0], preco: resEspecifico.valor[1] };
    }
    
    resultado = { rollItemBase, itemBase, detalhesBase, rollEncanto, encanto, efeito, itemEspecifico };
  }
  
  return {
    tipo: "Mágico",
    tipoMagico,
    rollTipo,
    tipoItem,
    resultado,
    usar2D
  };
}

function rerolarMelhoriasSuperior(resolvidoAtual) {
  const tipoEquipamento = resolvidoAtual.tipoEquipamento;
  const tabela = tipoEquipamento === "Arma" ? T8_5.armas :
                 tipoEquipamento === "Armadura/Escudo" ? T8_5.armaduras :
                 T8_5.esotericos;

  const quantidade = resolvidoAtual.melhorias.length;
  const novasMelhorias = [];

  for (let i = 0; i < quantidade; i++) {
    const roll = rolarD100();
    const resultado = consultarTabela(tabela, roll);
    const melhoria = { roll, melhoria: resultado.valor };

    if (resultado.valor === "Material especial") {
      melhoria.material = rolarMaterialEspecial();
    }

    novasMelhorias.push(melhoria);
  }

  return {
    ...resolvidoAtual,
    melhorias: novasMelhorias
  };
}

function rerolarMelhoriaSuperior(resolvidoAtual, indice) {
  const tipoEquipamento = resolvidoAtual.tipoEquipamento;
  const tabela = tipoEquipamento === "Arma" ? T8_5.armas :
                 tipoEquipamento === "Armadura/Escudo" ? T8_5.armaduras :
                 T8_5.esotericos;

  const novasMelhorias = resolvidoAtual.melhorias.map((melhoria, i) => {
    if (i !== indice) return melhoria;

    const roll = rolarD100();
    const resultado = consultarTabela(tabela, roll);
    const novaMelhoria = { roll, melhoria: resultado.valor };

    if (resultado.valor === "Material especial") {
      novaMelhoria.material = rolarMaterialEspecial();
    }

    return novaMelhoria;
  });

  return {
    ...resolvidoAtual,
    melhorias: novasMelhorias
  };
}

function rerolarEncantoMagico(resolvidoAtual) {
  const tipoItem = resolvidoAtual.tipoItem;
  if (tipoItem !== "Arma" && tipoItem !== "Armadura/Escudo") return resolvidoAtual;

  const tabelaEncantos = tipoItem === "Arma" ? T8_8 : T8_10;
  const tabelaEspecifica = tipoItem === "Arma" ? T8_9 : T8_11;

  const rollEncanto = rolarD100();
  const resEncanto = consultarTabela(tabelaEncantos, rollEncanto);
  const encanto = resEncanto.valor[0];
  const efeito = resEncanto.valor[1];

  let itemEspecifico = null;
  if (encanto.includes("→")) {
    const rollEspecifico = rolarD100();
    const resEspecifico = consultarTabela(tabelaEspecifica, rollEspecifico);
    itemEspecifico = {
      roll: rollEspecifico,
      item: resEspecifico.valor[0],
      preco: resEspecifico.valor[1]
    };
  }

  const novoResultado = {
    ...resolvidoAtual.resultado,
    rollEncanto,
    encanto,
    efeito,
    itemEspecifico
  };

  return {
    ...resolvidoAtual,
    resultado: novoResultado
  };
}

function rolarRiqueza(tipoRiqueza, usarBonus = false) {
  // T8_2 agora é consistente: coluna 0=menor, 1=média, 2=maior, 3=valor T$, 4=exemplos
  const coluna = tipoRiqueza === "menor" ? 0 : tipoRiqueza === "média" ? 1 : 2;
  
  let roll = rolarD100();
  if (usarBonus) {
    roll = Math.min(roll + 20, 100);
  }
  
  let resultado = null;
  for (const row of T8_2) {
    const faixa = row[coluna];
    if (faixa === "—") continue;
    
    const partes = faixa.split("-");
    const min = Number(partes[0]);
    const max = partes[1] ? Number(partes[1]) : min;
    
    if (roll >= min && roll <= max) {
      const valorInfo = interpretarValorRiqueza(row[3]);
      resultado = {
        roll,
        valor: row[3],
        exemplos: row[4],
        tipo: tipoRiqueza,
        valorTotal: valorInfo.total,
        detalhesValor: valorInfo.detalhes
      };
      break;
    }
  }
  
  return resultado;
}

// ══════════════════════════════════════════════════
// SEÇÃO 5 — ROLADOR PRINCIPAL
// ═══════════════════════════════════════════════════

function rolarTesouro(nd) {
  const tabela = T8_1[nd];
  if (!tabela) return null;
  
  // Rola d% para Dinheiro
  const rollDinheiro = rolarD100();
  const resultadoDinheiro = consultarTabela(tabela.dinheiro, rollDinheiro);
  const expressaoDinheiro = resultadoDinheiro.valor;
  
  // Verifica se tem +%
  const temBonusDinheiro = expressaoDinheiro.includes("+%");
  const expressaoLimpa = expressaoDinheiro.replace(" +%", "");
  
  let dinheiroResolvido = null;
  
  if (expressaoLimpa === "—") {
    dinheiroResolvido = { tipo: "Nenhum" };
  } else if (expressaoLimpa.includes("riqueza")) {
    // Ex: "1 riqueza menor", "1d3 riquezas médias"
    const match = expressaoLimpa.match(/(\d+d\d+(?:\+\d+)?)\s+riquezas?\s+(menor|média|maior)/);
    const matchSimples = expressaoLimpa.match(/(\d+)\s+riqueza\s+(menor|média|maior)/);
    
    if (match) {
      const { quantidade, detalhes } = interpretarQuantidade(match[1]);
      const tipoRiqueza = match[2];
      const riquezas = [];
      for (let i = 0; i < quantidade; i++) {
        riquezas.push(rolarRiqueza(tipoRiqueza, temBonusDinheiro));
      }
      dinheiroResolvido = { tipo: "Riqueza", tipoRiqueza, riquezas, detalhes, temBonus: temBonusDinheiro };
    } else if (matchSimples) {
      const quantidade = parseInt(matchSimples[1]);
      const tipoRiqueza = matchSimples[2];
      const riquezas = [];
      for (let i = 0; i < quantidade; i++) {
        riquezas.push(rolarRiqueza(tipoRiqueza, temBonusDinheiro));
      }
      dinheiroResolvido = { tipo: "Riqueza", tipoRiqueza, riquezas, detalhes: `Quantidade fixa: ${quantidade}`, temBonus: temBonusDinheiro };
    }
  } else {
    // Expressão de dados (ex: "1d6×10 TC")
    dinheiroResolvido = interpretarExpressao(expressaoLimpa);
  }
  
  // Rola d% para Itens
  const rollItens = rolarD100();
  const resultadoItens = consultarTabela(tabela.itens, rollItens);
  const expressaoItens = resultadoItens.valor;
  
  // Verifica flags
  const temBonusItens = expressaoItens.includes("+%");
  const usar2D = expressaoItens.includes("2D");
  const expressaoItensLimpa = expressaoItens.replace(" +%", "").replace(" 2D", "");
  
  let itensResolvido = null;
  
  if (expressaoItensLimpa === "—") {
    itensResolvido = { tipo: "Nenhum" };
  } else if (expressaoItensLimpa === "Diverso") {
    itensResolvido = rolarDiverso();
  } else if (expressaoItensLimpa === "Equipamento") {
    itensResolvido = rolarEquipamento(usar2D);
  } else if (expressaoItensLimpa.includes("poção")) {
    const match = expressaoItensLimpa.match(/^(\d+d\d+(?:\+\d+)?|\d+)\s+poções?$/);
    if (match) {
      itensResolvido = rolarPocao(match[1], temBonusItens);
    } else {
      itensResolvido = rolarPocao("1", temBonusItens);
    }
  } else if (expressaoItensLimpa.includes("Superior")) {
    const match = expressaoItensLimpa.match(/Superior\s+\((\d+d\d+(?:\+\d+)?|\d+)\s+melhorias?\)/);
    if (match) {
      itensResolvido = rolarSuperior(match[1], usar2D);
    }
  } else if (expressaoItensLimpa.includes("Mágico")) {
    const match = expressaoItensLimpa.match(/Mágico\s+\((menor|médio|maior)\)/);
    if (match) {
      itensResolvido = rolarMagico(match[1], usar2D);
    }
  }
  
  return {
    nd,
    dinheiro: {
      roll: rollDinheiro,
      faixa: `${resultadoDinheiro.min}-${resultadoDinheiro.max}`,
      expressao: expressaoDinheiro,
      resolvido: dinheiroResolvido
    },
    itens: {
      roll: rollItens,
      faixa: `${resultadoItens.min}-${resultadoItens.max}`,
      expressao: expressaoItens,
      resolvido: itensResolvido
    }
  };
}

// ═══════════════════════════════════════════════════
// SEÇÃO 6 — COMPONENTES VISUAIS
// ═══════════════════════════════════════════════════

function DiamondDivider() {
  return <div style={s.divider} />;
}

function Secao({ icone, titulo, children }) {
  return (
    <div style={s.secao}>
      <div style={s.secaoTitulo}>
        {icone} {titulo}
      </div>
      {children}
    </div>
  );
}

function ResultadoDinheiro({ dinheiro }) {
  if (!dinheiro || !dinheiro.resolvido) return null;
  const { resolvido } = dinheiro;
  
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 1, color: "#7a5020", marginBottom: 6 }}>
        💰 DINHEIRO
      </div>
      <div style={{ fontFamily: "'IM Fell English',Georgia,serif", fontSize: 13, color: "#f0d8a0", lineHeight: 1.6 }}>
        <div>Rolagem: <b style={{ color: "#e8a020" }}>{dinheiro.roll}</b> (faixa {dinheiro.faixa})</div>
        <div>Resultado: <b style={{ color: "#c8922a", fontSize: 14 }}>{dinheiro.expressao}</b></div>
        
        {resolvido.tipo === "Nenhum" && (
          <div style={{ marginTop: 6, color: "#7a5020", fontStyle: "italic" }}>Nenhum dinheiro encontrado</div>
        )}
        
        {resolvido.tipo && !resolvido.tipo.includes("Riqueza") && resolvido.tipo !== "Nenhum" && (
          <div style={{
            marginTop: 6,
            padding: 8,
            borderRadius: 4,
            background: "#0d070088",
            borderLeft: "3px solid #c8922a"
          }}>
            <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 15 }}>
              {resolvido.valor} {resolvido.moeda}
            </div>
            <div style={{ color: "#7a5020", fontSize: 11, marginTop: 4 }}>
              {resolvido.detalhes}
            </div>
          </div>
        )}
        
        {resolvido.tipo === "Riqueza" && (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: "#7a5020", fontSize: 11, marginBottom: 6 }}>{resolvido.detalhes}</div>
            {resolvido.riquezas.map((r, i) => (
              <div key={i} style={{
                padding: 8,
                marginBottom: 6,
                borderRadius: 4,
                background: "#0d070088",
                borderLeft: "3px solid #c8922a"
              }}>
                <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 13 }}>
                  Riqueza {resolvido.tipoRiqueza} #{i+1}
                </div>
                <div style={{ color: "#f0d8a0", fontSize: 12, marginTop: 4 }}>
                  Rolagem: {r.roll} → {r.valor}
                </div>
                {r.detalhesValor && (
                  <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 13, marginTop: 4 }}>
                    {r.detalhesValor}
                  </div>
                )}
                <div style={{ color: "#7a5020", fontSize: 11, marginTop: 4, fontStyle: "italic" }}>
                  {r.exemplos}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultadoItens({ itens, onRerollSuperior, onRerollMagico, onRerollMelhoriaSuperior }) {
  if (!itens || !itens.resolvido) return null;
  const { resolvido } = itens;
  
  return (
    <div>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: 1, color: "#7a5020", marginBottom: 6 }}>
         ITENS
      </div>
      <div style={{ fontFamily: "'IM Fell English',Georgia,serif", fontSize: 13, color: "#f0d8a0", lineHeight: 1.6 }}>
        <div>Rolagem: <b style={{ color: "#e8a020" }}>{itens.roll}</b> (faixa {itens.faixa})</div>
        <div>Resultado: <b style={{ color: "#c8922a", fontSize: 14 }}>{itens.expressao}</b></div>
        
        {resolvido.tipo === "Nenhum" && (
          <div style={{ marginTop: 6, color: "#7a5020", fontStyle: "italic" }}>Nenhum item encontrado</div>
        )}
        
        {resolvido.tipo === "Diverso" && (
          <div style={{
            marginTop: 6,
            padding: 8,
            borderRadius: 4,
            background: "#0d070088",
            borderLeft: "3px solid #c8922a"
          }}>
            <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 14 }}>
              {resolvido.item}
            </div>
            <div style={{ color: "#7a5020", fontSize: 11, marginTop: 4 }}>
              Rolagem d%: {resolvido.roll}
            </div>
          </div>
        )}
        
        {resolvido.tipo === "Equipamento" && (
          <div style={{
            marginTop: 6,
            padding: 8,
            borderRadius: 4,
            background: "#0d070088",
            borderLeft: "3px solid #c8922a"
          }}>
            <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 14 }}>
              {resolvido.tipoEquipamento}: {resolvido.item}
            </div>
            <div style={{ color: "#7a5020", fontSize: 11, marginTop: 4 }}>
              Tipo (1d6): {resolvido.rollTipo} → {resolvido.tipoEquipamento}
              {resolvido.usar2D && " (2D: escolheu o menor)"}
              <br />
              Item (d%): {resolvido.rollItem}
            </div>
                                   
            {resolvido.detalhes ? (
              <div style={{ marginTop: 8, padding: 8, background: "#1c0e0088", borderRadius: 4, color: "#c8922a", fontSize: 12 }}>
                <b>Detalhes:</b> {resolvido.detalhes.categoria} · {resolvido.detalhes.uso}
                {resolvido.detalhes.tipo !== "—" && ` · ${resolvido.detalhes.tipo}`}
                {resolvido.detalhes.alcance && ` · Alcance ${resolvido.detalhes.alcance}`}
              </div>
            ) : resolvido.tipoEquipamento === "Arma" && (
              <div style={{ marginTop: 8, color: "#7a5020", fontSize: 11, fontStyle: "italic" }}>
                Detalhes da arma não encontrados
              </div>
            )}
          </div>
        )}
        
        {resolvido.tipo === "Poção" && (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: "#7a5020", fontSize: 11, marginBottom: 6 }}>{resolvido.detalhesQtd}</div>
            {resolvido.pocoes.map((p, i) => (
              <div key={i} style={{
                padding: 8,
                marginBottom: 6,
                borderRadius: 4,
                background: "#0d070088",
                borderLeft: "3px solid #c8922a"
              }}>
                <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 13 }}>
                  Poção #{i+1}: {p.pocao}
                </div>
                <div style={{ color: "#f0d8a0", fontSize: 12, marginTop: 4 }}>
                  Rolagem: {p.roll} → Preço: T$ {p.preco}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {resolvido.tipo === "Superior" && (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: "#7a5020", fontSize: 11, marginBottom: 6 }}>
              Tipo (1d6): {resolvido.rollTipo} → {resolvido.tipoEquipamento}
              {resolvido.usar2D && " (2D: escolheu o menor)"}
            </div>
            <div style={{
              padding: 8,
              marginBottom: 8,
              borderRadius: 4,
              background: "#0d070088",
              borderLeft: "3px solid #c8922a"
            }}>
              <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 14 }}>
                Item base: {resolvido.itemBase}
              </div>
              <div style={{ color: "#7a5020", fontSize: 11, marginTop: 4 }}>
                Item base (d%): {resolvido.rollItemBase}
              </div>
              {resolvido.detalhesBase && (
                <div style={{ marginTop: 6, color: "#c8922a", fontSize: 12 }}>
                  {resolvido.detalhesBase.categoria} · {resolvido.detalhesBase.uso}
                  {resolvido.detalhesBase.tipo && resolvido.detalhesBase.tipo !== "—" && ` · ${resolvido.detalhesBase.tipo}`}
                  {resolvido.detalhesBase.alcance && ` · Alcance ${resolvido.detalhesBase.alcance}`}
                  {resolvido.detalhesBase.penalidade !== undefined && ` · Penalidade ${resolvido.detalhesBase.penalidade}`}
                </div>
              )}
            </div>
            <div style={{ color: "#7a5020", fontSize: 11, marginBottom: 6 }}>{resolvido.detalhesQtd}</div>

            {resolvido.melhorias.map((m, i) => (
              <div key={i} style={{
                padding: 8,
                marginBottom: 6,
                borderRadius: 4,
                background: "#0d070088",
                borderLeft: "3px solid #c8922a",
                display: "flex",
                flexDirection: "column",
                gap: 4
              }}>
                <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 13 }}>
                  Melhoria #{i+1}: {m.melhoria}
                </div>
                {m.material && (
                  <div style={{ color: "#c8922a", fontSize: 12, fontWeight: 700 }}>
                    Material: {m.material.material} (1d6 = {m.material.roll})
                  </div>
                )}
                <div style={{ color: "#7a5020", fontSize: 11 }}>
                  Rolagem: {m.roll}
                </div>
                <button
                  onClick={() => onRerollMelhoriaSuperior(i)}
                  style={{
                    marginTop: 2,
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: "1px solid #8b5e1a",
                    background: "#2a1800",
                    color: "#c8922a",
                    fontFamily: "'Cinzel',serif",
                    fontSize: 9,
                    letterSpacing: 1,
                    cursor: "pointer"
                  }}
                >
                  🎲 Re-rolar esta melhoria
                </button>
              </div>
            ))}

            <button
              onClick={onRerollSuperior}
              style={{
                marginTop: 8,
                padding: "6px 12px",
                borderRadius: 4,
                border: "1px solid #8b5e1a",
                background: "#3a1e00",
                color: "#c8922a",
                fontFamily: "'Cinzel',serif",
                fontSize: 10,
                letterSpacing: 1,
                cursor: "pointer"
              }}
            >
              🎲 Rolar melhorias novamente
            </button>
          </div>
        )}
            
        
        {resolvido.tipo === "Mágico" && (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: "#7a5020", fontSize: 11, marginBottom: 6 }}>
              Tipo (1d6): {resolvido.rollTipo} → {resolvido.tipoItem}
              {resolvido.usar2D && " (2D: escolheu o menor)"}
              <br />
              Poder: {resolvido.tipoMagico}
            </div>
            
            {resolvido.tipoItem === "Acessório" && (
              <div style={{
                padding: 8,
                borderRadius: 4,
                background: "#0d070088",
                borderLeft: "3px solid #c8922a"
              }}>
                <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 14 }}>
                  {resolvido.resultado.acessorio}
                </div>
                <div style={{ color: "#f0d8a0", fontSize: 12, marginTop: 4 }}>
                  Rolagem: {resolvido.resultado.roll} → Preço: T$ {resolvido.resultado.preco}
                </div>
              </div>
            )}
            
            {(resolvido.tipoItem === "Arma" || resolvido.tipoItem === "Armadura/Escudo") && (
              <div style={{
                padding: 8,
                borderRadius: 4,
                background: "#0d070088",
                borderLeft: "3px solid #c8922a"
              }}>
                <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 14 }}>
                  Item base: {resolvido.resultado.itemBase}
                </div>
                <div style={{ color: "#7a5020", fontSize: 11, marginTop: 4 }}>
                  Item base (d%): {resolvido.resultado.rollItemBase}
                </div>
                {resolvido.resultado.detalhesBase && (
                  <div style={{ marginTop: 6, color: "#c8922a", fontSize: 12 }}>
                    {resolvido.resultado.detalhesBase.categoria} · {resolvido.resultado.detalhesBase.uso}
                    {resolvido.resultado.detalhesBase.tipo && resolvido.resultado.detalhesBase.tipo !== "—" && ` · ${resolvido.resultado.detalhesBase.tipo}`}
                    {resolvido.resultado.detalhesBase.alcance && ` · Alcance ${resolvido.resultado.detalhesBase.alcance}`}
                    {resolvido.resultado.detalhesBase.penalidade !== undefined && ` · Penalidade ${resolvido.resultado.detalhesBase.penalidade}`}
                  </div>
                )}
                <div style={{ marginTop: 10, borderTop: "1px solid #8b5e1a55", paddingTop: 8 }}>
                  <div style={{ color: "#e8a020", fontWeight: 700, fontSize: 14 }}>
                    Encanto: {resolvido.resultado.encanto}
                  </div>
                  <div style={{ color: "#f0d8a0", fontSize: 12, marginTop: 4 }}>
                    Efeito: {resolvido.resultado.efeito}
                  </div>
                  <div style={{ color: "#7a5020", fontSize: 11, marginTop: 4 }}>
                    Rolagem encanto: {resolvido.resultado.rollEncanto}
                  </div>
                </div>
                {resolvido.resultado.itemEspecifico && (
                  <div style={{ marginTop: 8, padding: 8, background: "#1c0e0088", borderRadius: 4 }}>
                    <div style={{ color: "#c8922a", fontWeight: 700, fontSize: 13 }}>
                      → Item Específico: {resolvido.resultado.itemEspecifico.item}
                    </div>
                    <div style={{ color: "#f0d8a0", fontSize: 12, marginTop: 4 }}>
                      Rolagem: {resolvido.resultado.itemEspecifico.roll} → Preço: T$ {resolvido.resultado.itemEspecifico.preco}
                    </div>
                  </div>
                )}
                <button
                  onClick={onRerollMagico}
                  style={{
                    marginTop: 8,
                    padding: "6px 12px",
                    borderRadius: 4,
                    border: "1px solid #8b5e1a",
                    background: "#3a1e00",
                    color: "#c8922a",
                    fontFamily: "'Cinzel',serif",
                    fontSize: 10,
                    letterSpacing: 1,
                    cursor: "pointer"
                  }}
                >
                  🎲 Rolar encanto novamente
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultadoTesouro({ resultado, onRerollSuperior, onRerollMagico, onRerollMelhoriaSuperior }) {
  if (!resultado) return null;
  const { nd, dinheiro, itens } = resultado;
  
  return (
    <div style={{
      padding: 14,
      borderRadius: 8,
      background: "linear-gradient(135deg,#3a1e0044,#1c0e0044)",
      border: "1px solid #c8922a55",
      marginTop: 12
    }}>
      <div style={{
        fontFamily: "'Cinzel',serif",
        fontSize: 12,
        letterSpacing: 2,
        color: "#e8a020",
        marginBottom: 12,
        textAlign: "center",
        borderBottom: "1px solid #8b5e1a55",
        paddingBottom: 8
      }}>
        ⚔ TESOURO · ND {nd} ⚔
      </div>
      
      <ResultadoDinheiro dinheiro={dinheiro} />
      <ResultadoItens
        itens={itens}
        onRerollSuperior={onRerollSuperior}
        onRerollMagico={onRerollMagico}
        onRerollMelhoriaSuperior={onRerollMelhoriaSuperior}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════
// SEÇÃO 7 — APP PRINCIPAL
// ═══════════════════════════════════════════════════
export default function App() {
  const [ndSelecionado, setNdSelecionado] = useState("5");
  const [ultimoResultado, setUltimoResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  const ndsDisponiveis = Object.keys(T8_1);

  const handleRolar = () => {
    const resultado = rolarTesouro(ndSelecionado);
    setUltimoResultado(resultado);
    setHistorico(prev => [resultado, ...prev].slice(0, 10));
  };

  const handleLimpar = () => {
    setUltimoResultado(null);
    setHistorico([]);
  };

  const handleRerollSuperior = () => {
    setUltimoResultado(prev => {
      if (!prev || !prev.itens.resolvido || prev.itens.resolvido.tipo !== "Superior") return prev;
      const novoResolvido = rerolarMelhoriasSuperior(prev.itens.resolvido);
      return {
        ...prev,
        itens: {
          ...prev.itens,
          resolvido: novoResolvido
        }
      };
    });
  };

  const handleRerollMelhoriaSuperior = (indice) => {
    setUltimoResultado(prev => {
      if (!prev || !prev.itens.resolvido || prev.itens.resolvido.tipo !== "Superior") return prev;
      const novoResolvido = rerolarMelhoriaSuperior(prev.itens.resolvido, indice);
      return {
        ...prev,
        itens: {
          ...prev.itens,
          resolvido: novoResolvido
        }
      };
    });
  };

  const handleRerollMagico = () => {
    setUltimoResultado(prev => {
      if (!prev || !prev.itens.resolvido || prev.itens.resolvido.tipo !== "Mágico") return prev;
      const novoResolvido = rerolarEncantoMagico(prev.itens.resolvido);
      return {
        ...prev,
        itens: {
          ...prev.itens,
          resolvido: novoResolvido
        }
      };
    });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@400;700;900&family=IM+Fell+English&family=Merriweather:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <div style={s.root}>
        <div style={s.topo}>
          <h1 style={s.topoTitulo}>⚔ MESTRE T20 ⚔</h1>
          <div style={s.topoSub}>FERRAMENTAS PARA O MESTRE DE TORMENTA 20</div>
        </div>

        <Secao icone="🎲" titulo="Rolador de Tesouros">
          <label style={s.label}>Nível de Desafio do Encontro</label>
          <select
            value={ndSelecionado}
            onChange={e => setNdSelecionado(e.target.value)}
            style={{
              ...s.input,
              fontFamily: "'Cinzel',serif",
              fontSize: 14,
              fontWeight: 700,
              color: "#e8a020",
              cursor: "pointer",
              marginBottom: 12
            }}
          >
            {ndsDisponiveis.map(nd => (
              <option key={nd} value={nd} style={{ background: "#1c0e00" }}>
                ND {nd}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={handleRolar} style={{ ...s.btnPrimario, flex: 1 }}>
              🎲 Rolar Tesouro
            </button>
            <button onClick={handleLimpar} style={{ ...s.btn, flex: 0.4 }}>
              🗑 Limpar
            </button>
          </div>

          {ultimoResultado && (
            <ResultadoTesouro
              resultado={ultimoResultado}
              onRerollSuperior={handleRerollSuperior}
              onRerollMagico={handleRerollMagico}
              onRerollMelhoriaSuperior={handleRerollMelhoriaSuperior}
            />
          )}
        </Secao>

        <DiamondDivider />

        {historico.length > 0 && (
          <Secao icone="📜" titulo={`Histórico (${historico.length})`}>
            {historico.map((r, i) => (
              <div key={i} style={{
                padding: 8,
                marginBottom: 8,
                borderRadius: 4,
                background: "#0d070088",
                borderLeft: "2px solid #8b5e1a",
                fontFamily: "'IM Fell English',Georgia,serif",
                fontSize: 12,
                color: "#f0d8a0"
              }}>
                <div style={{ color: "#e8a020", fontWeight: 700, marginBottom: 4 }}>
                  ND {r.nd}
                </div>
                <div>💰 {r.dinheiro.expressao}</div>
                <div> {r.itens.expressao}</div>
              </div>
            ))}
          </Secao>
        )}

        <DiamondDivider />

        <div style={{
          textAlign: "center",
          fontFamily: "'Cinzel',serif",
          fontSize: 9,
          letterSpacing: 2,
          color: "#7a5020",
          marginTop: 20
        }}>
          MESTRE T20 · ROLADOR COMPLETO
        </div>
      </div>
    </>
  );
}
