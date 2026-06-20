// Base de dados com os repositórios oficiais do Jhaylson no GitHub
const meusProjetos = [
    {
        titulo: "Gerador de Resumo de Código",
        tecnologia: "python",
        tagTexto: "Automação | Python",
        descricao: "Analisador inteligente onde o usuário fornece um arquivo .py e o sistema interpreta sua arquitetura para gerar resumos descritivos automatizados.",
        linkProducao: "https://github.com"
    },
    {
        titulo: "Detector de Olhos Abertos/Fechados",
        tecnologia: "python",
        tagTexto: "Visão Computacional | Python",
        descricao: "Algoritmo de inteligência artificial voltado ao processamento de imagens em tempo real para rastreamento e avaliação de estados de abertura ocular.",
        linkProducao: "https://github.com"
    },
    {
        titulo: "Simulador de Entrevistas Oficial",
        tecnologia: "python",
        tagTexto: "Inteligência Artificial | Python",
        descricao: "Ambiente interativo focado em recriar processos seletivos e entrevistas técnicas computacionais, fornecendo feedbacks parametrizados.",
        linkProducao: "https://github.com"
    },
    {
        titulo: "Calculadora Cobradora",
        tecnologia: "javascript",
        tagTexto: "Utilitário | JavaScript",
        descricao: "Interface reativa desenvolvida para automatizar lógicas financeiras e estruturar regras de cobranças de forma ágil.",
        linkProducao: "https://github.com"
    }
];

// Função para renderizar os cards e aplicar o efeito de transição suave
function renderizarProjetos(filtro = "todos") {
    const container = document.getElementById("projects-container");
    container.innerHTML = ""; 

    meusProjetos.forEach(projeto => {
        if (filtro === "todos" || projeto.tecnologia === filtro) {
            const card = document.createElement("div");
            card.classList.add("card");
            
            card.innerHTML = `
                <div>
                    <span class="badge">${projeto.tagTexto}</span>
                    <h3>${projeto.titulo}</h3>
                    <p>${projeto.descricao}</p>
                </div>
                <a href="${projeto.linkProducao}" target="_blank" class="btn-project">Acessar no GitHub</a>
            `;
            container.appendChild(card);
        }
    });
}

// Inicializa a escuta dos botões de tecnologia
function inicializarFiltros() {
    const botoes = document.querySelectorAll(".filter-btn");
    
    botoes.forEach(botao => {
        botao.addEventListener("click", (e) => {
            botoes.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            
            const filtroSelecionado = e.target.getAttribute("data-filter");
            renderizarProjetos(filtroSelecionado);
        });
    });
}

// Gerencia a troca de temas mantendo a elegância visual
function inicializarTema() {
    const themeBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    themeBtn.addEventListener("click", () => {
        const temaAtual = htmlElement.getAttribute("data-theme");
        const novoTema = temaAtual === "dark" ? "light" : "dark";
        htmlElement.setAttribute("data-theme", novoTema);
    });
}

// Inicialização total
window.onload = () => {
    renderizarProjetos();
    inicializarFiltros();
    inicializarTema();
};
