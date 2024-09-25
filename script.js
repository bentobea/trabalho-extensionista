let alunos = [];
let questoes = [
    {
        pergunta: "1- Qual é a capital do Brasil?",
        alternativas: ["Nenhuma das alternativas","São Paulo", "Brasília", "Rio de Janeiro"],
        resposta: 2
    },
    {
        pergunta: "2- Quantos continentes existem no mundo?",
        alternativas: ["Nenhuma das alternativas","5", "6", "7"],
        resposta: 3
    },
    {
        pergunta: "3-Qual é o maior animal terrestre?",
        alternativas: ["Nenhuma das alternativas","Elefante", "Girafa", "Urso"],
        resposta: 1
    },
    {
        pergunta: "4-Qual o resultado da operação 15 - 7?",
        alternativas: ["Nenhuma das alternativas","8", "7", "9"],
        resposta: 1
    },
    {
        pergunta: "5-Quem escreveu o livro O Pequeno Príncipe?",
        alternativas: ["Nenhuma das alternativas","Antoine de Saint-Exupéry", "Monteiro Lobato", "Jorge Amado"],
        resposta: 1
    },
    {
        pergunta: "6-Qual é o sistema de medida de temperaturas?",
        alternativas: ["Nenhuma das alternativas","joule", "Newton", "kelvin"],
        resposta: 3
    },
    {
        pergunta: "7-Quantos planetas existem no sistema solar?",
        alternativas: ["Nenhuma das alternativas","8", "9", "10"],
        resposta: 1
    },
    {
        pergunta: "8-Qual é a principal fonte de energia do planeta?",
        alternativas:["Nenhuma das alternativas","Vento", "Sol", "Água"],
        resposta: 2
    },
    {
        pergunta: "9-O que é uma fração?",
        alternativas: [" Nenhuma das alternativas","Um número inteiro", "Uma parte de um todo", "Um número decimal"],
        resposta: 2
    },
    {
        pergunta: "10-Qual é o maior oceano do mundo?",
        alternativas: ["Nenhuma das alternativas","Oceano Atlântico", "Oceano Índico", "Oceano Pacífico"],
        resposta: 3
    },
];

function registrarAluno() {
    const nome = document.getElementById('nome').value;
    const id = alunos.length + 1;

    if (nome) {
        alunos.push({ id, nome, respostas: [], nota: 0 });
        document.getElementById('nome').value = '';
        atualizarSelectAlunos();
        alert('Aluno '+`${nome}`+' registrado com sucesso! ID: '+`${id}`);
    }
     else {
        alert('Por favor, insira um nome.');
    }
}

function atualizarSelectAlunos() {
    const select = document.getElementById('alunoSelect');
    select.innerHTML = '';
    alunos.forEach(aluno => {
        const option = document.createElement('option');
        option.value = aluno.id;
        option.textContent = aluno.nome;
        select.appendChild(option);
    });
    document.getElementById('avaliacaoSection').classList.remove('hidden');
}

function carregarQuestoes() {
    const alunoId = document.getElementById('alunoSelect').value;
    const questionsDiv = document.getElementById('questions');
    questionsDiv.innerHTML = '';
    let divAux = "";
    if (alunoId) {
        questoes.forEach((questao, index) => {
            const questionElement = document.createElement('div');
            questionElement.innerHTML = '<p id="paragr-questions">'+`${questao.pergunta}`+'</p>';
            divAux = "";
            questao.alternativas.forEach((alternativa, i) => {
                //questionElement.innerHTML +=                          
                divAux += '<label><input type="radio" name="questao'+`${index}`+'" value="'+`${i}`+'">'+`${alternativa}`+'</label><br>';                
            });
            questionElement.innerHTML += '<div class="align-radio">'+divAux+'</div>';
            questionsDiv.appendChild(questionElement);
        });
        questionsDiv.classList.remove('hidden');
    }
}

function submeterAvaliação() {
    const alunoId = document.getElementById('alunoSelect').value;
    const aluno = alunos.find(a => a.id == alunoId);
    aluno.respostas = [];
    let nota = 0;
    questoes.forEach((questao, index) => {
        const resposta = document.querySelector('input[name="questao'+`${index}`+'"]:checked');
        if (resposta) {
            const respostaIndex = parseInt(resposta.value);
            aluno.respostas.push(respostaIndex);
            if (respostaIndex === questao.resposta) {
                nota++;
            }
        } else {
            aluno.respostas.push(null);
        }
    }
   );
    console.log(nota);
    aluno.nota = nota;
    document.getElementById('feedback').textContent =  'Avaliação concluída! Nota: '+`${nota}`+'/'+`${questoes.length}`;
}

function gerarRelatorio() {
    const relatorioElement = document.getElementById('relatorio');
    let relatorio = 'Relatório de Desempenho dos Alunos:\n\n';

    alunos.forEach(aluno => {
        relatorio += 'ID: '+`${aluno.id}`+', Nome: '+`${aluno.nome}`+', Nota: '+`${aluno.nota}`+'/'+`${questoes.length}`+', Respostas: '+`${aluno.respostas.join(', ')}`+'\n';
    });

    relatorioElement.textContent = relatorio;
}

// Atualiza o select de alunos ao carregar
document.getElementById('alunoSelect').addEventListener('change', carregarQuestoes);