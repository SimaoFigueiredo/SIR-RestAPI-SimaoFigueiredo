const API_URL = "http://localhost:3000/alunos";
const listaAlunos = document.querySelector("#lista-alunos");
const formAluno = document.querySelector("#form-aluno");
const mensagem = document.querySelector("#mensagem");

async function carregarAlunos() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os alunos.");
        }

        const alunos = await resposta.json();
        listaAlunos.innerHTML = "";

        alunos.forEach((aluno) => {
            const item = document.createElement("li");
            item.textContent = `${aluno.nome} ${aluno.apelido} - Curso: ${aluno.idCurso} - Ano: ${aluno.anoCurricular}`;

            const botaoApagar = document.createElement("button");
            botaoApagar.textContent = "Apagar";
            botaoApagar.addEventListener("click", () => apagarAluno(aluno.id));

            item.appendChild(document.createTextNode(" "));
            item.appendChild(botaoApagar);
            listaAlunos.appendChild(item);
        });
    } catch (erro) {
        listaAlunos.innerHTML = `<li>Erro: ${erro.message}</li>`;
    }
}

async function apagarAluno(id) {
    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível apagar o aluno.");
        }

        carregarAlunos();
    } catch (erro) {
        mensagem.textContent = `Erro: ${erro.message}`;
    }
}

carregarAlunos();

formAluno.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const novoAluno = {
        nome: document.querySelector("#nome").value,
        apelido: document.querySelector("#apelido").value,
        idCurso: Number(document.querySelector("#idCurso").value),
        anoCurricular: Number(document.querySelector("#anoCurricular").value),
        idade: Number(document.querySelector("#idade").value)
    };

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAluno)
        });

        if (!resposta.ok) {
            throw new Error("Não foi possível adicionar o aluno.");
        }

        formAluno.reset();
        mensagem.textContent = "Aluno adicionado com sucesso.";
        carregarAlunos();
    } catch (erro) {
        mensagem.textContent = `Erro: ${erro.message}`;
    }
});
