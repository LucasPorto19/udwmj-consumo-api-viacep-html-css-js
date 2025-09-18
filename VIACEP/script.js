document.addEventListener ('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cepInput');
    const searchButton = document.getElementById('searchButton');
    const resultBox = document.getElementById('result');
    const messageBox = document.getElementById('message');


const cepResult = document.getElementById('cepResult');
const logradouroResult = document.getElementById('logradouroResult');
const complementoResult = document.getElementById('complementoResult');
const bairroResult = document.getElementById('bairroResult');
const localidadeResult = document.getElementById('localidadeResult');
const ufResult = document.getElementById('ufResult');

function clearResults() {
    cepResult.textContent = '';
    logradouroResult.textContent = '';
    complementoResult.textContent = '';
    bairroResult.textContent = '';
    localidadeResult.textContent = '';
    ufResult.textContent = '';
    resultBox.classList.add('hidden');
    messageBox.classList.add('hidden');
    resultBox.textContent = '';
    messageBox.classList.remove('error')
}

function showMessage(msg, isError = false) {
    messageBox.textContent = msg;
    messageBox.classList.remove('hidden');
    if (isError) {
        messageBox.classList.add('error');
    } else {
        messageBox.classList.remove('error');
    }
}

async function searchCep() {
    clearResults ();
    const cep = cepInput.value.replace(/\D/g, '');

    if (cep.lenght !== 8) {
        showMessage('Por favor, digite um CEP válido', true);
        return;
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
       const response = await fetch(url);
       
       if (!response.ok) {
        throw new Error('Erro na requisição da API');
       }

       const data = await response.json();

       if (data.erro) {
        showMessage('CEP não encontrado!', true);
       } else {
        displayResults(data);
       }

    } catch (error) {
       console.log('ERRO: ', error);
       showMessage('Ocorreu um erro ao buscar o CEP.', true); 
    }

    function displayResults(data) {
        cepResult.textContent = data.cep;
        resultBox.classList.remove('hidden');
    }

    searchButton.addEventListener('click', searchCep);

    cepInput.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            searchCep();
        }
    });
}
});