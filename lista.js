document.addEventListener('DOMContentLoaded', () => {
  const corpoTabela = document.getElementById('corpoTabela');
  const btnOrdenarValidade = document.getElementById('ordenarValidade');
  const btnBuscarProduto = document.getElementById('buscarProduto');

  let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  function renderizarTabela(lista = produtos) {
    corpoTabela.innerHTML = "";

    lista.forEach((produto, index) => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>            
        <td>${produto.categoria}</td>
        <td>${produto.origem}</td>
        <td>${produto.lote}</td>
        <td>${produto.validade}</td>
        <td>
          <button class=" btnEditar" onclick="editarProduto(${index})">Editar</button>
          <button class=" btnExcluir"  onclick="removerProduto(${index})">Remover</button>
        </td>
      `;

      corpoTabela.appendChild(linha);
    });
  }

  
  btnOrdenarValidade.addEventListener('click', () => {
    produtos.sort((a, b) => new Date(a.validade) - new Date(b.validade));
    localStorage.setItem('produtos', JSON.stringify(produtos));
    renderizarTabela();
  });

  
  btnBuscarProduto.addEventListener('click', () => {
    const termo = prompt("Digite o nome do produto que deseja buscar:");

    if (!termo) return;

    const resultados = produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termo.toLowerCase())
    );

    if (resultados.length === 0) {
      alert("Nenhum produto encontrado.");
      return;
    }

    renderizarTabela(resultados);
  });

  window.editarProduto = function(index) {
    const produto = produtos[index];

    const campo = prompt("Qual campo deseja editar? (nome, preco, categoria, origem, lote, validade)").toLowerCase();

    const camposValidos = ["nome", "preco", "categoria", "origem", "lote", "validade"];

    if (!camposValidos.includes(campo)) {
      alert("Campo inválido.");
      return;
    }

    const novoValor = prompt(`Informe o novo valor para ${campo}:`);
    if (novoValor !== null && novoValor.trim() !== "") {
      produtos[index][campo] = novoValor.trim();
      localStorage.setItem('produtos', JSON.stringify(produtos));
      renderizarTabela();
    }
  }

  window.removerProduto = function(index) {
    if (confirm("Deseja remover este produto?")) {
      produtos.splice(index, 1);
      localStorage.setItem('produtos', JSON.stringify(produtos));
      renderizarTabela();
    }
  }

  renderizarTabela();
});