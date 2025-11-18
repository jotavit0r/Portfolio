document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleciona todas as seções que têm um ID
    // (Usamos 'section[id]' para pegar só as seções principais)
    const sections = document.querySelectorAll('section[id]');
    
    // 2. Seleciona todos os links da navegação de bolinhas
    const navLinks = document.querySelectorAll('.dot-navigation li a');

    if (sections.length === 0 || navLinks.length === 0) {
        console.warn('Scrollspy: Seções ou links de navegação não encontrados.');
        return;
    }

    // 3. Função para mudar o link ativo
    const changeActiveLink = (id) => {
        // Remove 'active' de todas as bolinhas
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Adiciona 'active' APENAS na bolinha que corresponde à seção
        const activeLink = document.querySelector(`.dot-navigation li a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

    // 4. Cria o "Observador"
    // IntersectionObserver é a forma moderna de detectar 
    // quando um elemento entra ou sai da tela.
   const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                changeActiveLink(entry.target.id);
            }
        });
    }, { 
        // --- SUBSTITUA POR ISSO ---
        
        // Define a "linha de gatilho" exatamente no meio da tela (50%).
        // (Encolhe a "área de observação" para uma linha no meio)
        rootMargin: "-50% 0px -50% 0px", 
        
        // Dispara assim que QUALQUER pixel da seção tocar essa linha.
        threshold: 0 
        
        // --- FIM DA SUBSTITUIÇÃO ---
    });

    // 5. Manda o Observador "assistir" a cada seção
    sections.forEach(section => {
        observer.observe(section);
    });

    // 6. (Opcional) Faz o clique na bolinha rolar a tela suavemente
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o "salto" brusco
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});