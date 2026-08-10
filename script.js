(() => {
    const links = {
        github: 'https://github.com/leonardejhaylson-ui'
    };

    const projects = [
        { title: 'JARVIS WSL', technology: 'outros', language: 'Shell', status: 'Em desenvolvimento', featured: true, description: 'Projeto JARVIS disponível publicamente como base de automação em ambiente WSL. O destaque é mantido sem extrapolar funcionalidades não confirmadas no repositório público.', tags: ['JARVIS', 'Automação', 'WSL', 'Arquitetura modular'], github: `${links.github}/jarvis-wsl` },
        { title: 'RAG Pipeline', technology: 'python', language: 'Python', status: 'Público', description: 'Pipeline de IA e ingestão de dados com Python, FastAPI e PostgreSQL, voltado à organização de processamento e recuperação de informações.', tags: ['IA', 'Dados', 'Pipeline', 'Back-End'], github: `${links.github}/rag-pipeline` },
        { title: 'Desktop AI Agent', technology: 'python', language: 'Python', status: 'Público', description: 'Agente de IA desktop em Python, representando experimentação prática com automação e integração de recursos inteligentes.', tags: ['Python', 'IA', 'Automação'], github: `${links.github}/desktop-ai-agent` },
        { title: 'RAG Auth Service', technology: 'java', language: 'Java', status: 'Público', description: 'Serviço Java relacionado à autenticação para contexto RAG, útil para demonstrar separação de responsabilidades em Back-End.', tags: ['Java', 'Back-End', 'Auth', 'RAG'], github: `${links.github}/rag-auth-service` },
        { title: 'Sistema Vendas Backend', technology: 'java', language: 'Java', status: 'Público', description: 'Projeto Back-End em Java para domínio de vendas, com foco em regras de negócio e estruturação de serviço.', tags: ['Java', 'Back-End', 'Vendas'], github: `${links.github}/sistema-vendas-backend` },
        { title: 'Finance Dashboard', technology: 'javascript', language: 'JavaScript', status: 'Público', description: 'Dashboard financeiro em JavaScript para apresentação de dados e construção de interface web.', tags: ['JavaScript', 'Dashboard', 'Dados'], github: `${links.github}/finance-dashboard` },
        { title: 'Simulador de Entrevistas Oficial', technology: 'python', language: 'Python', status: 'Público', description: 'Simulador em Python para prática de entrevistas, com foco em interação, perguntas e preparação técnica.', tags: ['Python', 'IA', 'Simulação'], github: `${links.github}/Simulador-de-Entrevistas-Oficial` },
        { title: 'Detector de Olhos Abertos ou Fechados', technology: 'python', language: 'Python', status: 'Público', description: 'Projeto em Python voltado à detecção de olhos abertos ou fechados, conectado a visão computacional.', tags: ['Python', 'Visão Computacional', 'Reconhecimento'], github: `${links.github}/Detector-de-Olhos-Abertos-ou-Fechados` },
        { title: 'Gerador de Resumo de Código em Python', technology: 'python', language: 'Python', status: 'Público', description: 'Ferramenta em que o usuário envia um arquivo .py e o sistema analisa o código automaticamente para apoiar compreensão e documentação.', tags: ['Python', 'Automação', 'Análise de código'], github: `${links.github}/Gerador-de-resumo-de-c-digo-em-Python` },
        { title: 'Calculadora Cobradora', technology: 'javascript', language: 'JavaScript', status: 'Público', description: 'Utilitário web para automatizar lógicas de cobrança e cálculos financeiros simples.', tags: ['JavaScript', 'HTML', 'CSS'], github: `${links.github}/calculadora-cobradora` }
    ];

    const createElement = (html) => {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    };

    const projectCard = (project) => createElement(`
        <article class="project-card" data-technology="${project.technology}">
            <div class="project-meta"><span>${project.language}</span><span>•</span><span>${project.status}</span></div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="badge-list">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
            <div class="project-actions"><a class="project-link" href="${project.github}" target="_blank" rel="noopener noreferrer">Ver repositório</a></div>
        </article>
    `);

    const renderProjects = (filter = 'todos') => {
        const container = document.querySelector('#projects-container');
        if (!container) return;
        const visibleProjects = projects.filter((project) => filter === 'todos' || project.technology === filter);
        container.replaceChildren(...visibleProjects.map(projectCard));
    };

    const renderFeaturedProject = () => {
        const container = document.querySelector('#featured-project');
        const project = projects.find((item) => item.featured);
        if (!container || !project) return;
        container.innerHTML = `
            <p class="eyebrow">Projeto em destaque</p>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="badge-list">${project.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
            <div class="project-actions"><a class="project-link" href="${project.github}" target="_blank" rel="noopener noreferrer">Abrir JARVIS no GitHub</a></div>
        `;
    };

    const initFilters = () => {
        const buttons = [...document.querySelectorAll('.filter-btn')];
        buttons.forEach((button) => button.addEventListener('click', () => {
            buttons.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');
            renderProjects(button.dataset.filter);
        }));
    };

    const initTheme = () => {
        const button = document.querySelector('#theme-toggle');
        if (!button) return;
        const setPressed = () => button.setAttribute('aria-pressed', String(document.documentElement.dataset.theme === 'light'));
        setPressed();
        button.addEventListener('click', () => {
            const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            document.documentElement.dataset.theme = nextTheme;
            localStorage.setItem('portfolio-theme', nextTheme);
            setPressed();
        });
    };

    const initNavigation = () => {
        const toggle = document.querySelector('.menu-toggle');
        const linksContainer = document.querySelector('#nav-links');
        if (!toggle || !linksContainer) return;
        toggle.addEventListener('click', () => {
            const isOpen = linksContainer.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });
        linksContainer.addEventListener('click', (event) => {
            if (event.target.matches('a')) {
                linksContainer.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    };

    const initRevealAnimations = () => {
        const items = document.querySelectorAll('.reveal');
        if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            items.forEach((item) => item.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        items.forEach((item) => observer.observe(item));
    };

    document.addEventListener('DOMContentLoaded', () => {
        renderFeaturedProject();
        renderProjects();
        initFilters();
        initTheme();
        initNavigation();
        initRevealAnimations();
    });
})();
