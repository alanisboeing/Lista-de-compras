const form = document.getElementById('novoItem');
const lista = document.querySelector('.lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];
nome.focus();

itens.forEach((elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", evento => {
    evento.preventDefault();

    const nome = evento.target.elements["nome"];
    const quantidade = evento.target.elements["quantidade"];
    const categoria = evento.target.elements["categoria"];

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
        "categoria": categoria.value,
    };

    const existe = itens.find(elemento=> elemento.nome === nome.value);

    if(existe){
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }
    else{
        itemAtual.id = Date.now();
        criaElemento(itemAtual);
        itens.push(itemAtual);
    }

    localStorage.setItem('itens', JSON.stringify(itens));

    nome.focus();
    form.reset();
});

function criaElemento(item){
    const novoItem = document.createElement('li');
    novoItem.classList.add("secundario");
    novoItem.classList.add(item.categoria);
    
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem);

    const listaCategoria = lista.querySelector("." + item.categoria);

    listaCategoria.appendChild(novoItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const botaoDeleta = document.createElement("button");
    botaoDeleta.innerText = "X";
    botaoDeleta.addEventListener("click", function(){
    deletaElemento(this.parentNode, id);
    nome.focus();

 })
    return botaoDeleta;
}
function deletaElemento(elemento,id) {
    elemento.remove();

    itens.splice(itens.findIndex(elemento=> elemento.id === id), 1)
    localStorage.setItem('itens', JSON.stringify(itens))
}