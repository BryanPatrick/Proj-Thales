let inputNovaAtividade = document.querySelector("#inputNovaAtividade");
let btnAddAtividade = document.querySelector("#btnAddAtividade");
let listAtividades = document.querySelector("#listAtividades");
const btnExcluir = document.querySelector(".trash-btn");
const btnEditar = document.querySelector(".check-btn");
let arrayAtividade = [];

inputNovaAtividade.addEventListener("keypress", (e) => {
  if (e.keypress == 13 && inputNovaAtividade.value != "") {
    let atividade = {
      nome: inputNovaAtividade.value,
      id: gerarId(),
      status: 0,
    };
    addAtividade(atividade);
    arrayAtividade.push(atividade);
  }
});

btnAddAtividade.addEventListener("click", () => {
  if (inputNovaAtividade.value != "") {
    let atividade = {
      nome: inputNovaAtividade.value,
      id: gerarId(),
      status: 0,
    };
    addAtividade(atividade);
    arrayAtividade.push(atividade);
  }
});

function gerarId() {
  return Math.floor(Math.random() * 3000);
}

function addAtividade(atividade) {
  let div = criarTag(atividade);
  listAtividades.appendChild(div);
  inputNovaAtividade.value = "";
}

function criarTag(atividade) {
  let div = document.createElement("div");
  div.classList.add("todo");
  div.id = atividade.id;

  let li = document.createElement("li");
  li.classList.add("todo-item");
  li.innerHTML = atividade.nome;
  li.id = atividade.id;

  let BtnCheck = document.createElement("button");
  BtnCheck.classList.add("check-btn");
  BtnCheck.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
  BtnCheck.setAttribute("onclick", "editar(" + atividade.id + ")");

  let BtnExcluir = document.createElement("button");
  BtnExcluir.classList.add("trash-btn");
  BtnExcluir.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>';
  BtnExcluir.setAttribute("onclick", "excluir(" + atividade.id + ")");

  div.appendChild(li);
  div.appendChild(BtnCheck);
  div.appendChild(BtnExcluir);

  return div;
}

function editar(idAtividade) {
  let confirmacao = window.confirm("Tem certeza que deseja alterar?");
  let div = document.getElementById("" + idAtividade + "");

  if (confirmacao && div) {
    div.classList.toggle("completed");
  }
}

function excluir(idAtividade) {
  let confimacao = window.confirm("Tem certeza que deseja excluir?");

  if (confimacao) {
    let div = document.getElementById("" + idAtividade + "");
    if (div) {
      listAtividades.removeChild(div);
      arrayAtividade.splice(div, 1);
    }
  }
}

function filter(arrayAtividade) {
  let btnSlect = document.getElementById("option-list");
  if (btnSlect.value == "all") {
    return arrayAtividade;
  }
  if (btnSlect.value == "completed") {
    const array = arrayAtividade;
    array.map((item) => {
      return item.status !== 0;
    });
  }
  if (btnSlect.value == "uncompleted") {
    naoFinalizadas();
  }
}

function todas() {
  //   let clicados = document.querySelectorAll(".check-btn");
  //   for (let i = 0; i < arrayAtividade.length; i++) {
  //     let result = clicados[i].arrayAtividade.id;
  //     document.getElementById(result).style.display = "";
  //   }
}

function finalizadas() {
  let clicados = document.querySelectorAll(".check-btn");
  for (let i = 0; i < arrayAtividade.length; i++) {
    if (clicados[i].getAttribute("class") == "check-btn") {
      let result = clicados[i].parentNode.id;
      document.getElementById(result).style.display = "none";
    }
  }
}

function naoFinalizadas() {
  let clicados = document.querySelectorAll(".check-btn.completed");
  for (let i = 0; i < arrayAtividade.length; i++) {
    let result = clicados[i].parentNode.id;
    document.getElementById(result).style.display = "none";
  }
}

console.log(arrayAtividade);
