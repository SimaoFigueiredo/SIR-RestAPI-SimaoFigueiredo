const API_URL = "http://localhost:3000/alunos";
const listaAlunos = document.querySelector("#lista-alunos");

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
            listaAlunos.appendChild(item);
        });
    } catch (erro) {
        listaAlunos.innerHTML = `<li>Erro: ${erro.message}</li>`;
    }
}

carregarAlunos();
