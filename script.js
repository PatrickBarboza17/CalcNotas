const bandeiraBtns = document.querySelectorAll('.bandeira-btn');
const bandeiraInput = document.getElementById('bandeira'); // Campo oculto para armazenar a seleção
const form = document.getElementById('nota-form');
const valorInput = document.getElementById('valor');
const resumoSection = document.querySelector('.bandeiras-container');

// Dados das bandeiras
const bandeiras = {
  visa_debito: { nome: "Visa debito", total: 0, detalhes: [] },
  visa_credito: { nome: "visa credito", total: 0, detalhes: [] },
  mastercard: { nome: "mastercard", total: 0, detalhes: [] },
  maestro: { nome: "maestro", total: 0, detalhes: [] },
  elo: { nome: "elo", total: 0, detalhes: [] },
};

// Referência para os botões de bandeira
bandeiraBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    bandeiraBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    bandeiraInput.value = btn.getAttribute('data-value');
  });
});

// Atualiza o resumo de valores
function atualizarResumo() {
  resumoSection.innerHTML = ''; // Limpa o container antes de renderizar novamente

  Object.entries(bandeiras).forEach(([key, bandeira]) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${bandeira.nome}</h3>
      <p>Total: R$ ${bandeira.total.toFixed(2)}</p>
    `;
    resumoSection.appendChild(card); // Adiciona o cartão na interface
  });
}

// Adiciona valores ao formulário
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Previne o envio padrão do formulário
  const bandeira = bandeiraInput.value;
  const valor = parseFloat(valorInput.value);

  // Valida se uma bandeira foi selecionada
  if (!bandeira) {
    alert("Selecione uma bandeira antes de adicionar!");
    return;
  }

  // Valida se o valor é válido
  if (isNaN(valor) || valor <= 0) {
    alert("Por favor, insira um valor válido!");
    return;
  }

  // Processa os dados
  bandeiras[bandeira].total += valor;
  bandeiras[bandeira].detalhes.push(valor);
  atualizarResumo(); // Atualiza o resumo
  valorInput.value = ''; // Limpa o campo de valor
});

// Atualiza o resumo ao carregar a página
atualizarResumo();