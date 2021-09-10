const fs = require('fs')

//RESTAURAÇÃO DO BRONKEN-DATABASE.JSON
//#region 

//Lendo os dados do json corrompido.
const data = fs.readFileSync('broken-database.json');
const dataBase = JSON.parse(data);

//Corrigindo os caracteres corrompidos.
for (var i = 0; i < dataBase.length; i++) {
  dataBase[i].name = dataBase[i].name.toString().replace(/æ/g, "a");
  dataBase[i].name = dataBase[i].name.toString().replace(/ß/g, "b");
  dataBase[i].name = dataBase[i].name.toString().replace(/¢/g, "c");
  dataBase[i].name = dataBase[i].name.toString().replace(/ø/g, "o");

  if (dataBase[i].price.typeof != "number") {
    dataBase[i].price = parseFloat(dataBase[i].price);
  }

  if (dataBase[i].quantity === undefined) {
    dataBase[i].quantity = 0;
  }
}

//Saída do arquivo restaurado.
fs.writeFileSync('./saida.json', JSON.stringify(dataBase, null, 2), err => {
  if (err) {
    console.log(err);
  } else {
    console.log("Arquivo gerado com sucesso!");
  }
})
//#endregion

//CHECANDO CORREÇÕES E INCLUINDO FUNÇÕES DE SOMA.
//#region
//Definindo as váriaveis (s = soma ,sQ = soma quantia, l = lista).
var sQEletrodomesticos = 0;
var sQEletronicos = 0;
var sQPanelas = 0;
var sQAcessorios = 0;

var sEletrodomesticos = 0;
var sEletronicos = 0;
var sPanelas = 0;
var sAcessorios = 0;

var lista = [];

//Lendo os dados do json restaurado.
const restoredData = fs.readFileSync('./saida.json');
const restoredDataBase = JSON.parse(restoredData);

//Retorno da lista com os nomes dos produtos.

//Somas da quantidade de estoque por categoria, valor total e criação da lista com categora, id e nome.
for (var i = 0; i < restoredDataBase.length; i++) {
  if (restoredDataBase[i].category === "Acessórios") {
    sQAcessorios += restoredDataBase[i].quantity;
    sAcessorios += restoredDataBase[i].price * restoredDataBase[i].quantity
    lista[i] = [restoredDataBase[i].category, restoredDataBase[i].id, restoredDataBase[i].name];
  }
  else if (restoredDataBase[i].category === "Eletrodomésticos") {
    sEletrodomesticos += restoredDataBase[i].price * restoredDataBase[i].quantity;
    sQEletrodomesticos += restoredDataBase[i].quantity;
    lista[i] = [restoredDataBase[i].category, restoredDataBase[i].id, restoredDataBase[i].name];
  }
  else if (restoredDataBase[i].category === "Eletrônicos") {
    sQEletronicos += restoredDataBase[i].quantity;
    sEletronicos += restoredDataBase[i].price * restoredDataBase[i].quantity
    lista[i] = [restoredDataBase[i].category, restoredDataBase[i].id, restoredDataBase[i].name];
  } else {
    sQPanelas += restoredDataBase[i].quantity;
    sPanelas += restoredDataBase[i].price * restoredDataBase[i].quantity
    lista[i] = [restoredDataBase[i].category, restoredDataBase[i].id, restoredDataBase[i].name];
  }
}

console.log(lista.sort());

//Espaçamento
console.log("-----------------------------------------");

//Deixar a variável "sEletrodomesticos" com apenas duas casas decimais.
var fixDecimal = parseFloat(sEletrodomesticos.toFixed(2));

//Retorno da quantia total de estoque por categoria.
console.log("Soma dos estoques por categoria")
console.log("Soma do estoque de Acessórios: " + sQAcessorios);
console.log("Soma do estoque de Eletrodomésticos: " + sQEletrodomesticos);
console.log("Soma do estoque de Eletrônicos: " + sQEletronicos);
console.log("Soma do estoque de Panelas: " + sQPanelas);

//Espaçamento
console.log("-----------------------------------------");

//Retorno da soma total dos valores de cada uma das categorias, separado por categoria.
console.log("Soma do total dos valores")
console.log("Soma do total dos valores de Acessórios: " + sAcessorios);
console.log("Soma do total dos valores de Eletrodomésticos: " + fixDecimal);
console.log("Soma do total dos valores de Eletrônicos: " + sEletronicos);
console.log("Soma do total dos valores de Panelas: " + sPanelas);
//#endregion