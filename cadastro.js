let produtos = [];

const form = document.getElementById('Form')
const botao = document.getElementById('btAdd')
const lista = document.getElementById('minhaLista')
const preco = document.getElementById('preco')
const categoria=document.getElementById('categoria')
const origem=document.getElementById('origem')
const lote= document.getElementById('lote')
const validade= document.getElementById('validade')

form.addEventListener("submit", function (event) {
  event.preventDefault();
});

botao.addEventListener("click", adicionarItem);



function adicionarItem() {
  const produto = {
    nome: nome.value.trim(),
    preco: preco.value.trim(),
    categoria: categoria.value.trim(),
    origem: origem.value.trim(),
    lote: lote.value,
    validade: validade.value
  };

  if (produto.nome && produto.preco && produto.categoria && produto.origem && produto.lote && produto.validade) {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosSalvos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtosSalvos));

   
    nome.value = "";
    preco.value = "";
    categoria.value = "";
    origem.value = "";
    lote.value = "";
    validade.value = "";

    alert('Produto adicionado com sucesso!');
  } else {
    alert('Por favor, preencha todos os campos!');
  }

   
 
}

 

