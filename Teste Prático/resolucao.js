const fs = require("fs");
const { setTimeout } = require("timers");

function jsonReader(filePath, cb) {
  fs.readFile(filePath, "utf-8", (err, filePath) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(filePath);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

jsonReader("./broken-database.json", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    for (let i = 0; i < data.length; i++) {
      data[i].name = data[i].name.toString().replace(/æ/g, "a");
      data[i].name = data[i].name.toString().replace(/ß/g, "b");
      data[i].name = data[i].name.toString().replace(/¢/g, "c");
      data[i].name = data[i].name.toString().replace(/ø/g, "o");

      if (data[i].price.typeof != "number") {
        data[i].price = parseFloat(data[i].price);
      }

      if (data[i].quantity === undefined) {
        data[i].quantity = 0;
      }
    }
    fs.writeFile("./saida.json", JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

setTimeout(() => {
  jsonReader("./saida.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let sQEletrodomesticos = 0;
      let sQEletronicos = 0;
      let sQPanelas = 0;
      let sQAcessorios = 0;

      let sEletrodomesticos = 0;
      let sEletronicos = 0;
      let sPanelas = 0;
      let sAcessorios = 0;

      let lista = [];

      for (var i = 0; i < data.length; i++) {
        if (data[i].category === "Acessórios") {
          sQAcessorios += data[i].quantity;
          sAcessorios += data[i].price * data[i].quantity;
          lista[i] = [data[i].category, data[i].id, data[i].name];
        } else if (data[i].category === "Eletrodomésticos") {
          sEletrodomesticos += data[i].price * data[i].quantity;
          sQEletrodomesticos += data[i].quantity;
          lista[i] = [data[i].category, data[i].id, data[i].name];
        } else if (data[i].category === "Eletrônicos") {
          sQEletronicos += data[i].quantity;
          sEletronicos += data[i].price * data[i].quantity;
          lista[i] = [data[i].category, data[i].id, data[i].name];
        } else {
          sQPanelas += data[i].quantity;
          sPanelas += data[i].price * data[i].quantity;
          lista[i] = [data[i].category, data[i].id, data[i].name];
        }
      }
      console.log(lista.sort());

      //Espaçamento
      console.log("-----------------------------------------");

      //Deixar a variável "sEletrodomesticos" com apenas duas casas decimais.
      let fixDecimal = parseFloat(sEletrodomesticos.toFixed(2));

      //Retorno da quantia total de estoque por categoria.
      console.log("Soma dos estoques por categoria");
      console.log("Soma do estoque de Acessórios: " + sQAcessorios);
      console.log("Soma do estoque de Eletrodomésticos: " + sQEletrodomesticos);
      console.log("Soma do estoque de Eletrônicos: " + sQEletronicos);
      console.log("Soma do estoque de Panelas: " + sQPanelas);

      //Espaçamento
      console.log("-----------------------------------------");

      //Retorno da soma total dos valores de cada uma das categorias, separado por categoria.
      console.log("Soma do total dos valores");
      console.log("Soma do total dos valores de Acessórios: " + sAcessorios);
      console.log(
        "Soma do total dos valores de Eletrodomésticos: " + fixDecimal
      );
      console.log("Soma do total dos valores de Eletrônicos: " + sEletronicos);
      console.log("Soma do total dos valores de Panelas: " + sPanelas);
    }
  });
});
