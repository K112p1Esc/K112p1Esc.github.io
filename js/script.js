// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', function () {

  // =============================================
  // =========== MENU MOBILE ====================
  // =============================================

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active'); // Adiciona efeito ao ícone
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });

  // =============================================
  // =========== SCROLL SUAVE ===================
  // =============================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // =============================================
  // =========== ANIMAÇÕES DE SCROLL =============
  // =============================================

  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.achievement-card, .jogador-card, .staff-card, .history-content, .section-title, .section-subtitle');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  document.querySelectorAll('.achievement-card, .jogador-card, .staff-card, .history-content, .section-title, .section-subtitle').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // =============================================
  // =========== CHATBOT ========================
  // =============================================

  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotContainer = document.getElementById('chatbot');
  const minimizeChat = document.getElementById('minimizeChat');
  const closeChat = document.getElementById('closeChat');
  const sendMessageBtn = document.getElementById('sendMessage');
  const userInput = document.getElementById('userInput');
  const chatlogs = document.getElementById('chatlogs');
  const quickQuestions = document.querySelector('.quick-questions');

  // =========== CONTROLES DO CHATBOT ============

  chatbotToggle.addEventListener('click', function () {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
      // Mostra perguntas rápidas apenas quando o chat está aberto
      quickQuestions.style.display = 'flex';
      // Adiciona mensagem de boas-vindas quando abre
    } else {
      quickQuestions.style.display = 'none';
    }
  });

  minimizeChat.addEventListener('click', function () {
    chatbotContainer.classList.remove('active');
    quickQuestions.style.display = 'none';
  });

  closeChat.addEventListener('click', function () {
    chatbotContainer.classList.remove('active');
    quickQuestions.style.display = 'none';
    // Limpa o chat quando fecha
    chatlogs.innerHTML = '';
  });

  // =========== ENVIO DE MENSAGENS ==============

  userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  sendMessageBtn.addEventListener('click', sendMessage);

  document.querySelectorAll('.quick-question').forEach(button => {
    button.addEventListener('click', function () {
      const question = this.getAttribute('data-question');
      userInput.value = question;
      sendMessage();
    });
  });

  // =========== FUNÇÕES DO CHATBOT ==============

  function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    addMessage('user', message);
    userInput.value = '';

    // Mostra estado de "digitando" antes da resposta
    showTypingIndicator();

    // Delay antes de responder (simulando processamento)
    setTimeout(() => {
      const botResponse = getBotResponse(message);

      // Remove o indicador de digitando
      removeTypingIndicator();

      // Adiciona a resposta com efeito de digitação
      typeMessage('bot', botResponse);

      // Mostra sugestões após a resposta do bot
      setTimeout(() => {
        showSuggestions(message);
      }, 500);
    }, 1500); // Delay de 1.5 segundos antes de começar a "digitar"
  }

  // Função para mostrar indicador de que o bot está digitando
  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('bot-message', 'typing-indicator');
    typingDiv.id = 'typingIndicator';

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');

    // Adiciona pontos de animação
    contentDiv.innerHTML = `
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;

    typingDiv.appendChild(contentDiv);
    chatlogs.appendChild(typingDiv);
    chatlogs.scrollTop = chatlogs.scrollHeight;
  }

  // Função para remover o indicador de digitando
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Função para simular digitação letra por letra
  function typeMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${sender}-message`);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');

    messageDiv.appendChild(contentDiv);
    chatlogs.appendChild(messageDiv);

    let i = 0;
    const typingSpeed = 20; // Velocidade de digitação em ms

    const typingInterval = setInterval(() => {
      if (i < message.length) {
        contentDiv.innerHTML = `<p>${message.substring(0, i + 1)}</p>`;
        i++;
        chatlogs.scrollTop = chatlogs.scrollHeight;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  }

  function addMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${sender}-message`);

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = `<p>${message}</p>`;

    messageDiv.appendChild(contentDiv);
    chatlogs.appendChild(messageDiv);

    chatlogs.scrollTop = chatlogs.scrollHeight;
  }

  function showSuggestions(message) {
    // Sua implementação existente para mostrar sugestões
  }

  function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();

    // ========== RESPOSTAS PRÉ-DEFINIDAS ==========

    // Saudação
    if (lowerMessage.includes('oi') || lowerMessage.includes('olá') || lowerMessage.includes('ola') || lowerMessage.includes('hello') || lowerMessage.includes('eae')) {
      return "Olá, Furioso! 👋 Como posso te ajudar hoje?";
    }

    // Agradecimento
    if (lowerMessage.includes('obrigado') || lowerMessage.includes('obg') || lowerMessage.includes('valeu') || lowerMessage.includes('agradeço')) {
      return "De nada! Estou aqui para ajudar. 😊 Precisa de mais alguma informação?";
    }

    // Base
    if (lowerMessage.includes('base') || lowerMessage.includes('academia') || lowerMessage.includes('jovem') || lowerMessage.includes('novo') || lowerMessage.includes('revelação') || lowerMessage.includes('revelacao')) {
      return "A FURIA tem um projeto de base sólido para revelar novos talentos. O FURIA Academy identifica e desenvolve jovens promessas do cenário brasileiro. Alguns jogadores revelados pela base já atuam em times profissionais.";
    }

    // Jogadores
    if (lowerMessage.includes('jogador') || lowerMessage.includes('elenco') || lowerMessage.includes('time') || lowerMessage.includes('equipe') || lowerMessage.includes('plantel') || lowerMessage.includes('roster')) {
      return `O elenco atual da FURIA no CS2 é composto por:<br><br>- KSCERATO (Rifler)<br>- yuurih (Entry Fragger)<br>- FalleN (AWPer/Capitão)<br>- molodoy (AWPer)<br>- Yekindar (Rifler)<br><br>- Sidde (Coach)<br><br>Quer saber mais sobre algum jogador específico?`;
    }

    // Conquistas
    if (lowerMessage.includes('conquista') || lowerMessage.includes('título') || lowerMessage.includes('titulo') || lowerMessage.includes('prêmio') || lowerMessage.includes('premio') || lowerMessage.includes('troféu') || lowerMessage.includes('trofeu')) {
      return `A FURIA já conquistou:<br><br>🥉 Top 3 no IEM Rio Major 2022 (Melhor colocação BR em Major)<br>🏆 ESL Pro League Season 12 (2020)<br>🏆 DreamHack Open Rio 2019<br>🏆 Elisa Masters Espoo 2024<br><br>Além de vários outros pódios em torneios internacionais!`;
    }

    // Loja
    if (lowerMessage.includes('loja') || lowerMessage.includes('camisa') || lowerMessage.includes('produto') || lowerMessage.includes('comprar') || lowerMessage.includes('roupa') || lowerMessage.includes('merch') || lowerMessage.includes('produto')) {
      return `Você pode encontrar todos os produtos oficiais da FURIA na nossa loja online:<br><br>🔗 <a href="https://furia.gg" target="_blank" style="color: var(--primary-color);">furia.gg</a><br><br>Lá temos camisas, moletons, acessórios e muito mais com o design exclusivo da FURIA!`;
    }

    // História
    if (lowerMessage.includes('história') || lowerMessage.includes('historia') || lowerMessage.includes('começo') || lowerMessage.includes('comeco') || lowerMessage.includes('fundação') || lowerMessage.includes('fundacao') || lowerMessage.includes('origem')) {
      return `A FURIA foi fundada em 2017 e rapidamente se tornou uma das principais equipes de CS:GO do Brasil. Em 2020, conquistou seu primeiro título internacional na ESL Pro League Season 12. Em 2022, fez história no IEM Rio Major, chegando às semifinais - a melhor colocação de um time brasileiro em um Major. Em 2024, venceu o Elisa Masters Espoo com a nova formação.`;
    }

    // Redes sociais
    if (lowerMessage.includes('rede social') || lowerMessage.includes('redes sociais') || lowerMessage.includes('twitter') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook') || lowerMessage.includes('youtube') || lowerMessage.includes('twitch')) {
      return `Siga a FURIA nas redes sociais:<br><br>
        📷 Instagram: <a href="https://instagram.com/furiagg" target="_blank" style="color: var(--primary-color);">@furiagg</a><br>
        🐦 Twitter: <a href="https://twitter.com/FURIA" target="_blank" style="color: var(--primary-color);">@FURIA</a><br>
        ▶️ YouTube: <a href="https://youtube.com/furiagg" target="_blank" style="color: var(--primary-color);">furiagg</a><br>
        📱 TikTok: <a href="https://tiktok.com/@furiagg" target="_blank" style="color: var(--primary-color);">@furiagg</a><br>
        🎮 Twitch: <a href="https://www.twitch.tv/furiatv" target="_blank" style="color: var(--primary-color);">furiagg</a>`;
    }

    // Próximos jogos
    if (lowerMessage.includes('jogo') || lowerMessage.includes('partida') || lowerMessage.includes('calendário') || lowerMessage.includes('calendario') || lowerMessage.includes('agenda') || lowerMessage.includes('próximo') || lowerMessage.includes('proximo')) {
      return `Os próximos jogos da FURIA podem ser acompanhados no calendário da DRAFT5:<br><br>
        📅 <a href="https://draft5.gg/equipe/330-FURIA/proximas-partidas" target="_blank" style="color: var(--primary-color);">Calendário de Jogos</a><br><br>
        Ou acompanhe nossas redes sociais para atualizações em tempo real!`;
    }

    // Patrocinadores
    if (lowerMessage.includes('patrocinador') || lowerMessage.includes('patrocinio') || lowerMessage.includes('sponsor') || lowerMessage.includes('marca') || lowerMessage.includes('parceiro')) {
      return `A FURIA conta com grandes patrocinadores na sua equipe de CS:<br><br>
    🎮 HyperX<br>
    🥫 Hellmann's<br>
    🥤 Red Bull<br>
    💻 Lenovo Legion<br>
    🎰 Betnacional<br>
    🖱️ AGON by AOC<br>
    ♠️ PokerStars<br><br>`;
    }

    // KSCERATO
    if (lowerMessage.includes('kscerato') || lowerMessage.includes('kaike')) {
      return "KSCERATO (Kaike Cerato) é um dos destaques da FURIA desde 2018, conhecido por sua consistência. Em 2023, foi top 19 do mundo pela HLTV e venceu torneios como o RMR Americas e Elisa Masters Espoo. Seu estilo de jogo equilibrado e preciso o torna um dos melhores riflers do cenário.";
    }

    // FalleN
    if (lowerMessage.includes('fallen') || lowerMessage.includes('gabriel')) {
      return "FalleN (Gabriel Toledo), lenda do CS brasileiro e vencedor de dois Majors, entrou para a FURIA em 2023. Em 2024, disputou seu 16º Major e conquistou o Elisa Masters Espoo, seu primeiro título internacional com a equipe. Além de jogador, é capitão e um dos maiores influenciadores do cenário.";
    }

    // Yuurih
    if (lowerMessage.includes('yuurih') || lowerMessage.includes('yurih') || lowerMessage.includes('yuuri') || lowerMessage.includes('yuri') || lowerMessage.includes('andrei')) {
      return "Yuurih (Yuri Boian), na FURIA desde 2017, é um dos pilares da equipe. Com mais de 1000 mapas disputados, foi eleito o 14º melhor jogador do mundo em 2020 e o 19º em 2022 pela HLTV. Conhecido por seu estilo agressivo e como excelente entry fragger.";
    }

    // Molodoy
    if (lowerMessage.includes('molodoy') || lowerMessage.includes('dmitry')) {
      return "Molodoy (Dmitry Smirnov), jovem AWPer do Cazaquistão, juntou-se à FURIA em abril de 2025. Com um rating de 1.23, ele traz uma nova perspectiva internacional e habilidades de alto nível para a equipe. Antes da FURIA, destacou-se na equipe Aurora.";
    }

    // Yekindar
    if (lowerMessage.includes('yekindar') || lowerMessage.includes('mareks')) {
      return "YEKINDAR (Mareks Gaļinskis), letão conhecido por seu estilo agressivo, entrou para a FURIA em abril de 2025. Ex-top 8 do mundo pela HLTV, traz experiência e impacto ao time. Antes da FURIA, jogou por Virtus.pro e Team Liquid, sendo um dos jogadores mais explosivos do cenário.";
    }

    // Sidde
    if (lowerMessage.includes('sidde') || lowerMessage.includes('coach') || lowerMessage.includes('técnico') || lowerMessage.includes('tecnico')) {
      return "Sidde (Carlos Henrique Elias) é o treinador principal da FURIA desde julho de 2024. Com passagens por Redemption POA, Liberty e ODDIK, ele se destaca por sua abordagem estratégica e foco no desenvolvimento dos jogadores. Foi fundamental na conquista do Elisa Masters Espoo 2024.";
    }

    // CS2
    if (lowerMessage.includes('cs2') || lowerMessage.includes('counter') || lowerMessage.includes('csgo') || lowerMessage.includes('jogo')) {
      return "A FURIA compete no Counter-Strike 2 (CS2), a versão mais recente do famoso jogo de tiro tático da Valve. O time brasileiro é um dos principais representantes das Américas no cenário internacional.";
    }

    // Treinos
    if (lowerMessage.includes('treino') || lowerMessage.includes('treinar') || lowerMessage.includes('prática') || lowerMessage.includes('pratica') || lowerMessage.includes('bootcamp')) {
      return "A FURIA realiza treinos diários e periódicos bootcamps para preparação em torneios. O time tem uma estrutura completa com:<br><br>- Analistas de jogos<br>- Psicólogos esportivos<br>- Preparadores físicos<br>- Nutricionistas<br><br>Tudo para manter o alto desempenho nos campeonatos!";
    }

    // Despedida
    if (lowerMessage.includes('tchau') || lowerMessage.includes('adeus') || lowerMessage.includes('até mais') || lowerMessage.includes('ate mais') || lowerMessage.includes('flw') || lowerMessage.includes('vlw')) {
      return "Até mais! Se precisar de algo, é só chamar. #VAMOFURIA 🐺";
    }

    // Resposta padrão para mensagens não reconhecidas
    return "Desculpe, não entendi sua pergunta. Posso te ajudar com informações sobre:<br><br>- Jogadores da FURIA<br>- Conquistas do time<br>- Produtos da loja<br>- História da organização<br>- Próximos jogos<br>- Redes sociais";
  }

});
