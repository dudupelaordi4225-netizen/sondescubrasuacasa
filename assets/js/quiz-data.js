/* =========================================================
   QUIZ-DATA.JS — Descubra sua Casa | SON
   Conteúdo do experimento: características, perfis das Casas,
   banco de perguntas e mensagens. Edite este arquivo livremente
   sem tocar na lógica em app.js.

   Estrutura:
     1. TRAITS            - as 10 características avaliadas
     2. CATEGORIES         - mesmas 10 características, usadas
                              para agrupar o banco de perguntas
                              e garantir variedade em cada teste
     3. HOUSE_PROFILES    - vetor de características por Casa
     4. HOUSES            - conteúdo textual das 4 Casas
     5. QUESTION_POOL      - banco com ~40 perguntas (4 por
                              categoria). A cada teste, o app.js
                              sorteia 12 delas, uma de cada
                              categoria no mínimo, com alternativas
                              embaralhadas (ver getRandomQuestions
                              em app.js).
     6. PROGRESS_MESSAGES - mensagens de progresso do quiz
     7. LOADING_SEQUENCE  - mensagens da revelação
     8. TRAIT_LABELS      - rótulos para a seção de perfil
   ========================================================= */

/* =======================================================
   1. TRAITS
======================================================= */
const TRAITS = [
  "lideranca",
  "comunicacao",
  "missao",
  "iniciativa",
  "espiritualidade",
  "fraternidade",
  "acolhimento",
  "servico",
  "perseveranca",
  "sabedoria"
];

/* =======================================================
   2. CATEGORIES
   Usadas apenas para organizar o banco de perguntas (não
   alteram o cálculo, que continua baseado 100% em TRAITS).
   Mantidas iguais a TRAITS para que cada categoria tenha um
   tema humano reconhecível (ver TRAIT_LABELS para os nomes).
======================================================= */
const CATEGORIES = [
  "lideranca",
  "comunicacao",
  "missao",
  "iniciativa",
  "espiritualidade",
  "fraternidade",
  "acolhimento",
  "servico",
  "perseveranca",
  "sabedoria"
];

/* =======================================================
   3. HOUSE_PROFILES
   Cada Casa é um vetor com as 10 características de TRAITS,
   de 0 (não representa) a 5 (representa totalmente).
   O algoritmo compara o vetor do jovem com estes perfis por
   similaridade de cosseno (app.js -> computeResult).
======================================================= */
const HOUSE_PROFILES = {

  // Águia — visão, liderança, iniciativa, missão, comunicação
  aguia: {
    lideranca: 5, comunicacao: 5, missao: 5, iniciativa: 5,
    espiritualidade: 3, fraternidade: 2, acolhimento: 2,
    servico: 2, perseveranca: 3, sabedoria: 3
  },

  // Árvore da Vida — enraizamento, fraternidade, acolhimento, sabedoria
  arvore: {
    lideranca: 2, comunicacao: 3, missao: 3, iniciativa: 2,
    espiritualidade: 5, fraternidade: 5, acolhimento: 5,
    servico: 3, perseveranca: 4, sabedoria: 5
  },

  // Grão de Trigo — serviço silencioso, perseverança, entrega
  grao: {
    lideranca: 2, comunicacao: 2, missao: 4, iniciativa: 2,
    espiritualidade: 4, fraternidade: 3, acolhimento: 3,
    servico: 5, perseveranca: 5, sabedoria: 3
  },

  // Cruz — oração, profundidade espiritual, fidelidade, discernimento
  cruz: {
    lideranca: 3, comunicacao: 3, missao: 4, iniciativa: 2,
    espiritualidade: 5, fraternidade: 3, acolhimento: 3,
    servico: 4, perseveranca: 5, sabedoria: 5
  }

};

/* =======================================================
   4. HOUSES
   Ordem das chaves = ordem dos escudos na interface.
======================================================= */
const HOUSES = {

  aguia: {
    name: "Casa Águia",
    shortName: "Águia",
    tagline: "Renovados para voar",
    image: "images/houses/aguia.webp",
    description:
      "Você foi criado para enxergar além e conduzir pelo exemplo. Como a águia, Deus o chama a voar alto na fé e a abrir caminhos para que outros também subam.",
    verse:
      "\u201cOs que esperam no Senhor renovam as suas forças, voam alto como águias.\u201d",
    verseRef: "Isaías 40,31",
    whyFit:
      "Suas respostas revelam alguém que percebe o próximo passo antes dos outros, comunica com clareza e não teme assumir a frente quando é preciso decidir.",
    whatYouWillLive: [
      "Formação em liderança e discernimento vocacional",
      "Oportunidades reais de conduzir projetos e pequenos grupos",
      "Acompanhamento espiritual para lapidar sua visão a serviço da missão"
    ]
  },

  arvore: {
    name: "Casa Árvore da Vida",
    shortName: "Árvore da Vida",
    tagline: "Permanecer para dar frutos",
    image: "images/houses/arvore.webp",
    description:
      "Você é chamado a permanecer unido a Cristo, como o ramo que só dá fruto porque está ligado à videira. Sua vida floresce quando permanece enraizada na oração, na comunidade e na escuta da Palavra — e por isso você também ajuda outros a permanecerem firmes na fé.",
    verse:
      "\u201cEu sou a videira verdadeira, e meu Pai é o agricultor. Todo ramo que, estando em mim, não dá fruto, ele corta; e todo que dá fruto, ele poda, para que dê mais fruto.\u201d",
    verseRef: "João 15,1\u20132",
    whyFit:
      "Suas respostas revelam alguém que cresce em comunhão, permanece fiel aos vínculos que constrói e floresce quando está enraizado na comunidade e na presença de Deus.",
    whatYouWillLive: [
      "Formação espiritual contínua e vida de oração",
      "Vida fraterna profunda e amizades que sustentam a fé",
      "Missão vivida com constância, cuidado e escuta"
    ]
  },

  grao: {
    name: "Casa Grão de Trigo",
    shortName: "Grão de Trigo",
    tagline: "Morrer para frutificar",
    image: "images/houses/grao.webp",
    description:
      "Você entende, no fundo do coração, que só se dá fruto quando se entrega. Como o grão que morre escondido na terra, sua vida floresce quando você se despoja de si mesmo para gerar vida nova em quem está ao seu redor.",
    verse:
      "\u201cSe o grão de trigo não cair na terra e não morrer, fica só; mas, se morrer, dá muito fruto.\u201d",
    verseRef: "João 12,24",
    whyFit:
      "Suas respostas mostram alguém que se doa nas pequenas coisas, aceita morrer para o próprio interesse e encontra em Deus a força para permanecer, mesmo sem ser visto.",
    whatYouWillLive: [
      "Experiências práticas de serviço dentro e fora do grupo",
      "Uma comunidade que valoriza cada gesto discreto de cuidado",
      "Crescimento espiritual pela entrega e pela perseverança"
    ]
  },

  cruz: {
    name: "Casa Cruz",
    shortName: "Cruz",
    tagline: "Negar-se para seguir",
    image: "images/houses/cruz.webp",
    description:
      "Sua caminhada nasce da oração e se firma na fidelidade. Na Cruz você aprende a negar-se a si mesmo, a permanecer quando é difícil e a transformar entrega em vida nova.",
    verse:
      "\u201cSe alguém quer vir após mim, negue-se a si mesmo, tome cada dia a sua cruz e siga-me.\u201d",
    verseRef: "Lucas 9,23",
    whyFit:
      "Suas respostas revelam alguém que busca a vontade de Deus antes de agir, escuta com profundidade e permanece fiel mesmo quando o caminho pesa.",
    whatYouWillLive: [
      "Vida de oração, silêncio e escuta da Palavra",
      "Acompanhamento espiritual e discernimento do seu chamado",
      "Missão sustentada pela intercessão e pela fidelidade diária"
    ]
  }

};

/* =======================================================
   5. QUESTION_POOL
   Banco com 40 perguntas de discernimento baseadas em
   situações reais vividas dentro do SON (encontros, retiros,
   missão, oração, acolhida, convivência, evangelização,
   organização, serviço). Cada alternativa distribui pesos
   entre 3 e 4 características, sem apontar diretamente para
   nenhuma Casa. Cada pergunta tem uma "category" (uma das
   CATEGORIES) usada só para garantir variedade no sorteio —
   o cálculo do resultado usa exclusivamente os "weights".
======================================================= */
const QUESTION_POOL = [

  /* ---------- acolhimento ---------- */
  {
    category: "acolhimento",
    text: "Você chegou ao SON pela primeira vez. Enquanto espera o encontro começar, percebe que o ambiente ainda está sendo preparado. O que você faz naturalmente?",
    options: [
      { text: "Cumprimento as pessoas e começo a conhecer quem está por perto.", weights: { comunicacao: 2, fraternidade: 2, acolhimento: 2, iniciativa: 1 } },
      { text: "Observo primeiro como tudo funciona antes de decidir onde posso ajudar.", weights: { sabedoria: 2, espiritualidade: 2, perseveranca: 2, acolhimento: 1 } },
      { text: "Percebo que algumas pessoas estão organizando o espaço e me ofereço para colaborar.", weights: { servico: 3, perseveranca: 2, iniciativa: 1, fraternidade: 1 } },
      { text: "Procuro a coordenação para entender como posso contribuir durante o encontro.", weights: { lideranca: 2, missao: 2, comunicacao: 1, iniciativa: 2 } }
    ]
  },
  {
    category: "acolhimento",
    text: "Durante um retiro você percebe que um integrante está desanimado. Qual atitude é mais natural para você?",
    options: [
      { text: "Converso com ele e procuro motivá-lo.", weights: { comunicacao: 2, acolhimento: 2, fraternidade: 2, lideranca: 1 } },
      { text: "Fico ao lado dele, mesmo sem dizer muitas palavras.", weights: { espiritualidade: 2, acolhimento: 2, sabedoria: 2, fraternidade: 1 } },
      { text: "Chamo outras pessoas para ajudá-lo também.", weights: { lideranca: 2, fraternidade: 2, comunicacao: 2, servico: 1 } },
      { text: "Rezo por ele e continuo acompanhando discretamente.", weights: { espiritualidade: 3, servico: 2, perseveranca: 2 } }
    ]
  },
  {
    category: "acolhimento",
    text: "Uma pessoa nova chega ao grupo trazida por um amigo, sem conhecer ninguém. Qual sua atitude?",
    options: [
      { text: "Vou até ela para me apresentar e puxar conversa.", weights: { acolhimento: 3, comunicacao: 2 } },
      { text: "Apresento essa pessoa a outros do grupo aos poucos.", weights: { acolhimento: 2, fraternidade: 2, comunicacao: 1 } },
      { text: "Fico por perto, disponível, sem forçar aproximação.", weights: { acolhimento: 2, sabedoria: 1, espiritualidade: 1 } },
      { text: "Convido para participar de alguma atividade prática comigo.", weights: { acolhimento: 2, servico: 1, iniciativa: 1 } }
    ]
  },
  {
    category: "acolhimento",
    text: "Alguém do grupo se sente deslocado por não conhecer bem as dinâmicas. Como você ajuda?",
    options: [
      { text: "Explico com paciência como tudo funciona.", weights: { acolhimento: 3, comunicacao: 1, sabedoria: 1 } },
      { text: "Fico ao lado dessa pessoa durante a atividade.", weights: { acolhimento: 2, fraternidade: 2 } },
      { text: "Peço para outras pessoas também ajudarem a incluí-la.", weights: { lideranca: 1, acolhimento: 2, comunicacao: 1 } },
      { text: "Ofereço para fazer a atividade em dupla com ela.", weights: { acolhimento: 2, servico: 1, fraternidade: 1 } }
    ]
  },

  /* ---------- lideranca ---------- */
  {
    category: "lideranca",
    text: "Pouco antes do encontro começar acontece um imprevisto. Qual seria sua reação mais natural?",
    options: [
      { text: "Organizo rapidamente quem pode resolver a situação.", weights: { lideranca: 2, iniciativa: 2, comunicacao: 2, missao: 1 } },
      { text: "Vou ajudar diretamente a resolver o problema.", weights: { servico: 3, perseveranca: 2, iniciativa: 1, missao: 1 } },
      { text: "Procuro tranquilizar quem ficou preocupado.", weights: { acolhimento: 3, fraternidade: 2, sabedoria: 1, espiritualidade: 1 } },
      { text: "Analiso a situação antes de decidir qual é a melhor solução.", weights: { sabedoria: 3, perseveranca: 2, lideranca: 1, iniciativa: 1 } }
    ]
  },
  {
    category: "lideranca",
    text: "Você foi convidado a coordenar uma pequena equipe para organizar o próximo encontro. Como você começa?",
    options: [
      { text: "Reúno o grupo, defino tarefas e prazos para cada um.", weights: { lideranca: 3, comunicacao: 2, iniciativa: 1 } },
      { text: "Pergunto a cada um o que prefere fazer antes de decidir.", weights: { lideranca: 2, acolhimento: 2, fraternidade: 1, sabedoria: 1 } },
      { text: "Coloco a mão na massa primeiro, para dar o exemplo.", weights: { lideranca: 2, servico: 2, iniciativa: 1, perseveranca: 1 } },
      { text: "Busco orientação com alguém mais experiente antes de agir.", weights: { sabedoria: 2, lideranca: 1, espiritualidade: 2 } }
    ]
  },
  {
    category: "lideranca",
    text: "No meio de uma atividade, você percebe que ninguém está tomando a frente para decidir o próximo passo. O que você faz?",
    options: [
      { text: "Assumo a decisão e comunico o caminho a seguir.", weights: { lideranca: 3, comunicacao: 2, iniciativa: 1 } },
      { text: "Sugiro uma ideia, mas deixo o grupo decidir junto.", weights: { lideranca: 2, fraternidade: 2, comunicacao: 1, sabedoria: 1 } },
      { text: "Espero mais um pouco, observando quem vai se posicionar.", weights: { sabedoria: 2, perseveranca: 1, lideranca: 1 } },
      { text: "Pergunto quem gostaria de liderar esse momento.", weights: { lideranca: 2, acolhimento: 2, comunicacao: 1 } }
    ]
  },
  {
    category: "lideranca",
    text: "Ao final de um projeto que você ajudou a conduzir, o resultado não foi o esperado. Qual sua reação?",
    options: [
      { text: "Assumo a responsabilidade e já penso em como melhorar da próxima vez.", weights: { lideranca: 3, perseveranca: 2, sabedoria: 1 } },
      { text: "Reúno a equipe para entender juntos o que aconteceu.", weights: { lideranca: 2, comunicacao: 2, fraternidade: 1, sabedoria: 1 } },
      { text: "Agradeço a todos pelo esforço, mesmo sem o resultado esperado.", weights: { acolhimento: 2, fraternidade: 2, lideranca: 1 } },
      { text: "Levo a situação para a oração antes de qualquer decisão.", weights: { espiritualidade: 3, sabedoria: 2, lideranca: 1 } }
    ]
  },

  /* ---------- espiritualidade ---------- */
  {
    category: "espiritualidade",
    text: "Durante um momento de oração, qual atitude mais representa você?",
    options: [
      { text: "Sinto vontade de incentivar outras pessoas a se aproximarem de Deus.", weights: { comunicacao: 2, missao: 2, lideranca: 1, espiritualidade: 2 } },
      { text: "Permaneço em silêncio, buscando ouvir a voz de Deus.", weights: { espiritualidade: 3, sabedoria: 2, perseveranca: 2 } },
      { text: "Rezo especialmente pelas pessoas que estão passando por dificuldades.", weights: { acolhimento: 2, fraternidade: 2, espiritualidade: 2, servico: 1 } },
      { text: "Peço força para viver minha missão com fidelidade.", weights: { missao: 3, perseveranca: 2, espiritualidade: 2 } }
    ]
  },
  {
    category: "espiritualidade",
    text: "Ao terminar essa experiência, qual frase representa melhor o desejo que existe em seu coração?",
    options: [
      { text: "Quero inspirar outras pessoas a caminhar com Cristo.", weights: { lideranca: 2, missao: 3, comunicacao: 2 } },
      { text: "Quero construir amizades que fortaleçam a fé de todos.", weights: { fraternidade: 3, acolhimento: 2, espiritualidade: 2 } },
      { text: "Quero servir com alegria, mesmo nas pequenas tarefas.", weights: { servico: 3, perseveranca: 2, espiritualidade: 2 } },
      { text: "Quero crescer espiritualmente e descobrir cada vez mais meu chamado.", weights: { espiritualidade: 3, sabedoria: 2, missao: 2 } }
    ]
  },
  {
    category: "espiritualidade",
    text: "Antes de uma decisão importante na sua vida, o que costuma fazer primeiro?",
    options: [
      { text: "Busco um tempo de oração e silêncio.", weights: { espiritualidade: 3, sabedoria: 1 } },
      { text: "Converso com alguém de confiança na fé.", weights: { espiritualidade: 2, fraternidade: 2, sabedoria: 1 } },
      { text: "Reflito sozinho sobre os prós e contras.", weights: { sabedoria: 2, espiritualidade: 1, perseveranca: 1 } },
      { text: "Sigo o que sinto no coração no momento.", weights: { espiritualidade: 2, iniciativa: 1 } }
    ]
  },
  {
    category: "espiritualidade",
    text: "Como você descreveria sua relação com a oração no dia a dia?",
    options: [
      { text: "É o momento mais importante do meu dia.", weights: { espiritualidade: 3, perseveranca: 1 } },
      { text: "Procuro rezar, mas ainda estou aprendendo a ter constância.", weights: { espiritualidade: 2, perseveranca: 2, sabedoria: 1 } },
      { text: "Rezo mais em comunidade do que sozinho.", weights: { espiritualidade: 2, fraternidade: 2 } },
      { text: "Sinto que a oração me dá força para servir melhor.", weights: { espiritualidade: 2, servico: 2 } }
    ]
  },

  /* ---------- fraternidade ---------- */
  {
    category: "fraternidade",
    text: "Você percebe um jovem que chegou sozinho e parece tímido. O que faz naturalmente?",
    options: [
      { text: "Vou conversar com ele e fazer com que se sinta bem-vindo.", weights: { acolhimento: 3, comunicacao: 2, fraternidade: 2 } },
      { text: "Convido outras pessoas para integrá-lo ao grupo.", weights: { lideranca: 2, fraternidade: 2, comunicacao: 2, missao: 1 } },
      { text: "Observo primeiro para entender como posso ajudá-lo da melhor forma.", weights: { sabedoria: 3, acolhimento: 2, espiritualidade: 1, perseveranca: 1 } },
      { text: "Encontro uma atividade para que ele participe desde o início.", weights: { iniciativa: 2, servico: 2, acolhimento: 2, missao: 1 } }
    ]
  },
  {
    category: "fraternidade",
    text: "Um amigo do grupo está passando por um momento difícil. O que você faz?",
    options: [
      { text: "Fico perto dele, mesmo sem saber exatamente o que dizer.", weights: { fraternidade: 3, acolhimento: 2 } },
      { text: "Organizo outras pessoas para apoiá-lo junto comigo.", weights: { lideranca: 1, fraternidade: 2, comunicacao: 1 } },
      { text: "Rezo por ele e ofereço ajuda prática no que for preciso.", weights: { espiritualidade: 2, servico: 2, fraternidade: 1 } },
      { text: "Dou espaço, mas deixo claro que estou disponível.", weights: { sabedoria: 1, fraternidade: 2, acolhimento: 1 } }
    ]
  },
  {
    category: "fraternidade",
    text: "Depois de um tempo longe do grupo, como você normalmente retoma o contato?",
    options: [
      { text: "Procuro cada amigo individualmente para reatar o vínculo.", weights: { fraternidade: 3, comunicacao: 1 } },
      { text: "Volto às atividades e deixo o vínculo se refazer naturalmente.", weights: { fraternidade: 2, perseveranca: 1 } },
      { text: "Pergunto como posso ajudar no que estiver acontecendo.", weights: { servico: 2, fraternidade: 2 } },
      { text: "Levo notícias e experiências novas para compartilhar com todos.", weights: { comunicacao: 2, fraternidade: 2 } }
    ]
  },
  {
    category: "fraternidade",
    text: "O grupo está dividido entre duas atividades no mesmo dia. Como você lida com isso?",
    options: [
      { text: "Tento reunir todos para decidir juntos, sem dividir o grupo.", weights: { fraternidade: 3, lideranca: 1, comunicacao: 1 } },
      { text: "Vou para onde meus amigos mais próximos estiverem.", weights: { fraternidade: 2, acolhimento: 1 } },
      { text: "Escolho pela atividade que mais precisa de ajuda.", weights: { servico: 2, fraternidade: 1, iniciativa: 1 } },
      { text: "Peço orientação a alguém mais experiente antes de escolher.", weights: { sabedoria: 2, fraternidade: 1 } }
    ]
  },

  /* ---------- missao ---------- */
  {
    category: "missao",
    text: "O SON vai realizar uma ação missionária na comunidade. Qual função mais combina com você?",
    options: [
      { text: "Organizar as equipes e definir como a missão acontecerá.", weights: { lideranca: 3, missao: 2, iniciativa: 2, comunicacao: 1 } },
      { text: "Conversar diretamente com as pessoas e anunciar a mensagem.", weights: { comunicacao: 3, missao: 2, acolhimento: 1, fraternidade: 1 } },
      { text: "Acompanhar quem demonstra mais dificuldade ou insegurança.", weights: { acolhimento: 2, fraternidade: 2, servico: 2, sabedoria: 1 } },
      { text: "Fazer qualquer tarefa necessária para que tudo aconteça bem.", weights: { servico: 3, perseveranca: 2, iniciativa: 1, missao: 1 } }
    ]
  },
  {
    category: "missao",
    text: "Você sabe que precisa convidar alguém de fora do grupo para conhecer o SON. Como se sente mais à vontade para isso?",
    options: [
      { text: "Falo abertamente sobre minha experiência de fé com essa pessoa.", weights: { missao: 3, comunicacao: 2, espiritualidade: 1 } },
      { text: "Convido para uma atividade e deixo a pessoa descobrir aos poucos.", weights: { missao: 2, acolhimento: 2, fraternidade: 1 } },
      { text: "Rezo por essa pessoa antes de qualquer convite.", weights: { espiritualidade: 2, missao: 2, perseveranca: 1 } },
      { text: "Ofereço ajuda prática primeiro, para criar confiança.", weights: { servico: 2, missao: 2, acolhimento: 1 } }
    ]
  },
  {
    category: "missao",
    text: "Um grupo de jovens de outra realidade vai receber uma visita do SON. Qual seria seu papel natural?",
    options: [
      { text: "Ajudo a planejar como a visita vai acontecer.", weights: { lideranca: 2, missao: 2, iniciativa: 1 } },
      { text: "Vou para conversar e criar vínculo com as pessoas de lá.", weights: { comunicacao: 2, missao: 2, fraternidade: 1 } },
      { text: "Cuido dos detalhes práticos para que tudo funcione bem.", weights: { servico: 2, missao: 1, iniciativa: 1, perseveranca: 1 } },
      { text: "Levo a missão na oração, mesmo antes de ela acontecer.", weights: { espiritualidade: 2, missao: 3 } }
    ]
  },
  {
    category: "missao",
    text: "Depois de uma experiência missionária marcante, o que fica mais forte em você?",
    options: [
      { text: "Vontade de contar para mais pessoas o que vivi.", weights: { comunicacao: 2, missao: 3 } },
      { text: "Desejo de continuar servindo mesmo depois que a experiência acabou.", weights: { servico: 2, missao: 2, perseveranca: 1 } },
      { text: "Gratidão profunda que vira oração.", weights: { espiritualidade: 3, missao: 2 } },
      { text: "Certeza de que quero fazer parte de mais experiências assim.", weights: { iniciativa: 2, missao: 2, perseveranca: 1 } }
    ]
  },

  /* ---------- comunicacao ---------- */
  {
    category: "comunicacao",
    text: "Durante uma reunião surgem opiniões diferentes sobre uma atividade. Como você costuma agir?",
    options: [
      { text: "Conduzo a conversa para que o grupo encontre uma decisão.", weights: { lideranca: 3, comunicacao: 2, sabedoria: 1, fraternidade: 1 } },
      { text: "Escuto todos antes de dar minha opinião.", weights: { sabedoria: 3, acolhimento: 2, espiritualidade: 1, fraternidade: 1 } },
      { text: "Busco uma solução que preserve a união entre todos.", weights: { fraternidade: 3, acolhimento: 2, comunicacao: 1, sabedoria: 1 } },
      { text: "Apoio a decisão tomada e ajudo para que ela aconteça.", weights: { servico: 2, perseveranca: 2, missao: 2, iniciativa: 1 } }
    ]
  },
  {
    category: "comunicacao",
    text: "Você precisa apresentar uma novidade importante para todo o grupo. Como prefere fazer isso?",
    options: [
      { text: "Falo diretamente e com entusiasmo para todos ao mesmo tempo.", weights: { comunicacao: 3, lideranca: 2, iniciativa: 1 } },
      { text: "Converso primeiro com algumas pessoas-chave antes do anúncio geral.", weights: { comunicacao: 2, sabedoria: 2, fraternidade: 1, lideranca: 1 } },
      { text: "Preparo um material simples para que a mensagem fique clara para todos.", weights: { comunicacao: 2, servico: 2, iniciativa: 1 } },
      { text: "Peço a Deus as palavras certas antes de falar.", weights: { espiritualidade: 2, comunicacao: 2, sabedoria: 1 } }
    ]
  },
  {
    category: "comunicacao",
    text: "Um colega do grupo entendeu errado algo que você disse. O que você faz?",
    options: [
      { text: "Procuro ele imediatamente para esclarecer com calma.", weights: { comunicacao: 3, acolhimento: 2, fraternidade: 1 } },
      { text: "Explico de um jeito diferente, buscando outras palavras.", weights: { comunicacao: 2, sabedoria: 2, iniciativa: 1 } },
      { text: "Peço desculpas se falei de um jeito que confundiu.", weights: { acolhimento: 2, comunicacao: 2, fraternidade: 1 } },
      { text: "Deixo que ele pergunte quando sentir necessidade.", weights: { sabedoria: 2, perseveranca: 1, comunicacao: 1 } }
    ]
  },
  {
    category: "comunicacao",
    text: "Durante uma dinâmica em grupo, você percebe que a comunicação está confusa e as pessoas não se entendem. Como agir?",
    options: [
      { text: "Assumo a palavra e tento organizar a conversa.", weights: { comunicacao: 3, lideranca: 2, iniciativa: 1 } },
      { text: "Escuto cada um separadamente para entender os pontos de vista.", weights: { comunicacao: 2, sabedoria: 2, acolhimento: 1 } },
      { text: "Proponho uma pausa para que todos respirem antes de continuar.", weights: { fraternidade: 2, comunicacao: 1, sabedoria: 2 } },
      { text: "Ajudo silenciosamente quem está com mais dificuldade de se expressar.", weights: { servico: 2, acolhimento: 2, comunicacao: 1 } }
    ]
  },

  /* ---------- servico ---------- */
  {
    category: "servico",
    text: "O encontro terminou, mas ainda há bastante trabalho para guardar tudo. Qual atitude mais representa você?",
    options: [
      { text: "Ajudo a organizar quem fará cada tarefa.", weights: { lideranca: 2, comunicacao: 2, iniciativa: 2, servico: 1 } },
      { text: "Começo imediatamente a ajudar no que estiver mais urgente.", weights: { servico: 3, perseveranca: 2, iniciativa: 2 } },
      { text: "Percebo quem está cansado e vou ajudá-lo primeiro.", weights: { acolhimento: 2, fraternidade: 2, servico: 2, espiritualidade: 1 } },
      { text: "Permaneço até que tudo esteja finalizado, mesmo que demore.", weights: { perseveranca: 3, servico: 2, missao: 1, espiritualidade: 1 } }
    ]
  },
  {
    category: "servico",
    text: "No fim de um evento, faltam pessoas para arrumar o espaço. O que você faz?",
    options: [
      { text: "Fico até o fim ajudando, mesmo cansado.", weights: { servico: 3, perseveranca: 2 } },
      { text: "Organizo rapidamente quem pode ajudar em cada parte.", weights: { lideranca: 1, servico: 2, comunicacao: 1 } },
      { text: "Faço minha parte e depois vejo onde mais posso ajudar.", weights: { servico: 2, iniciativa: 1, perseveranca: 1 } },
      { text: "Pergunto quem está mais cansado para ajudar primeiro.", weights: { acolhimento: 2, servico: 2 } }
    ]
  },
  {
    category: "servico",
    text: "Você percebe uma tarefa chata que ninguém quer fazer. Qual sua reação mais comum?",
    options: [
      { text: "Assumo a tarefa sem esperar que peçam.", weights: { servico: 3, iniciativa: 1 } },
      { text: "Faço a tarefa junto com alguém, para ficar mais leve.", weights: { servico: 2, fraternidade: 2 } },
      { text: "Ofereço em oração esse pequeno sacrifício.", weights: { espiritualidade: 2, servico: 2 } },
      { text: "Organizo um revezamento para que ninguém fique sobrecarregado.", weights: { lideranca: 1, servico: 2, comunicacao: 1 } }
    ]
  },
  {
    category: "servico",
    text: "Depois de servir bastante em uma atividade, alguém elogia seu esforço publicamente. Como você reage?",
    options: [
      { text: "Agradeço, mas devolvo o mérito para toda a equipe.", weights: { servico: 2, fraternidade: 2, sabedoria: 1 } },
      { text: "Fico feliz, mas logo já penso em onde posso ajudar de novo.", weights: { servico: 3, perseveranca: 1 } },
      { text: "Sinto que é só o que Deus pediu de mim naquele momento.", weights: { espiritualidade: 2, servico: 2 } },
      { text: "Fico um pouco sem graça, pois prefiro passar despercebido.", weights: { servico: 2, sabedoria: 1, acolhimento: 1 } }
    ]
  },

  /* ---------- iniciativa ---------- */
  {
    category: "iniciativa",
    text: "O SON decidiu iniciar um novo projeto de evangelização. Qual papel você assume naturalmente?",
    options: [
      { text: "Planejo como tudo será feito e ajudo a coordenar a equipe.", weights: { lideranca: 3, iniciativa: 2, missao: 2, comunicacao: 1 } },
      { text: "Penso em maneiras criativas de aproximar mais jovens do grupo.", weights: { comunicacao: 2, missao: 2, sabedoria: 2, iniciativa: 1 } },
      { text: "Quero garantir que todos se sintam parte do projeto.", weights: { acolhimento: 3, fraternidade: 2, servico: 1, espiritualidade: 1 } },
      { text: "Prefiro trabalhar nos bastidores para que tudo aconteça da melhor forma.", weights: { servico: 3, perseveranca: 2, espiritualidade: 1, fraternidade: 1 } }
    ]
  },
  {
    category: "iniciativa",
    text: "Você percebe uma necessidade no grupo que ninguém comentou ainda. O que faz?",
    options: [
      { text: "Tomo a iniciativa de resolver antes que se torne um problema maior.", weights: { iniciativa: 3, lideranca: 1, servico: 1 } },
      { text: "Comento com a coordenação para que decidam o melhor caminho.", weights: { comunicacao: 2, sabedoria: 1, iniciativa: 1 } },
      { text: "Espero para ver se outra pessoa vai perceber também.", weights: { sabedoria: 1, perseveranca: 1 } },
      { text: "Já começo a agir, mesmo sem pedir autorização.", weights: { iniciativa: 3, servico: 1, lideranca: 1 } }
    ]
  },
  {
    category: "iniciativa",
    text: "Surge a oportunidade de propor algo novo para o grupo. Como você reage?",
    options: [
      { text: "Já apresento a ideia com entusiasmo, mesmo que ainda não esteja pronta.", weights: { iniciativa: 3, comunicacao: 2 } },
      { text: "Penso bastante antes de compartilhar, para chegar com algo mais elaborado.", weights: { sabedoria: 2, iniciativa: 1, perseveranca: 1 } },
      { text: "Converso com um ou dois amigos antes de propor ao grupo todo.", weights: { fraternidade: 2, iniciativa: 1, comunicacao: 1 } },
      { text: "Prefiro deixar que outra pessoa proponha e eu ajudo a executar.", weights: { servico: 2, perseveranca: 1, iniciativa: 1 } }
    ]
  },
  {
    category: "iniciativa",
    text: "Uma atividade precisa ser adaptada de última hora. Qual sua reação mais natural?",
    options: [
      { text: "Já penso em uma alternativa e proponho na hora.", weights: { iniciativa: 3, lideranca: 1, sabedoria: 1 } },
      { text: "Ajudo a colocar em prática a solução que for decidida.", weights: { servico: 2, perseveranca: 1, iniciativa: 1 } },
      { text: "Procuro manter todos calmos enquanto a solução é pensada.", weights: { acolhimento: 2, fraternidade: 1, iniciativa: 1 } },
      { text: "Confio que Deus vai abrir o caminho certo.", weights: { espiritualidade: 2, sabedoria: 1, iniciativa: 1 } }
    ]
  },

  /* ---------- perseveranca ---------- */
  {
    category: "perseveranca",
    text: "Depois de algumas semanas, o projeto enfrenta dificuldades e parte da equipe desanima. O que você faz primeiro?",
    options: [
      { text: "Procuro um novo caminho e incentivo todos a continuar.", weights: { lideranca: 2, missao: 2, iniciativa: 2, perseveranca: 1 } },
      { text: "Converso individualmente com quem está desanimado.", weights: { acolhimento: 3, fraternidade: 2, comunicacao: 1, sabedoria: 1 } },
      { text: "Continuo fazendo minha parte com dedicação, dando exemplo.", weights: { servico: 3, perseveranca: 3, espiritualidade: 1 } },
      { text: "Analiso tudo o que aconteceu antes de sugerir mudanças.", weights: { sabedoria: 3, espiritualidade: 2, lideranca: 1, perseveranca: 1 } }
    ]
  },
  {
    category: "perseveranca",
    text: "Um compromisso do SON caiu em uma semana muito cansativa para você. O que faz?",
    options: [
      { text: "Vou mesmo assim, porque assumi esse compromisso.", weights: { perseveranca: 3, servico: 1 } },
      { text: "Aviso que preciso descansar, mas me organizo para não faltar de novo.", weights: { sabedoria: 2, perseveranca: 1, comunicacao: 1 } },
      { text: "Peço força a Deus para continuar mesmo cansado.", weights: { espiritualidade: 2, perseveranca: 2 } },
      { text: "Vou, mesmo sem muita energia, pensando no grupo que me espera.", weights: { fraternidade: 2, perseveranca: 2 } }
    ]
  },
  {
    category: "perseveranca",
    text: "Você começou um compromisso espiritual (como um terço diário) mas está sendo difícil manter. O que faz?",
    options: [
      { text: "Continuo tentando, mesmo quando falho em alguns dias.", weights: { perseveranca: 3, espiritualidade: 1 } },
      { text: "Peço ajuda a alguém para me manter firme.", weights: { fraternidade: 2, perseveranca: 1, sabedoria: 1 } },
      { text: "Ajusto a meta para algo mais possível, mas sem desistir.", weights: { sabedoria: 2, perseveranca: 2 } },
      { text: "Ofereço as dificuldades como parte da própria caminhada.", weights: { espiritualidade: 2, perseveranca: 2 } }
    ]
  },
  {
    category: "perseveranca",
    text: "Depois de meses de dedicação, um projeto do grupo não deu o resultado esperado. Como você reage?",
    options: [
      { text: "Continuo participando, acreditando que o fruto ainda vai aparecer.", weights: { perseveranca: 3, espiritualidade: 1 } },
      { text: "Reavalio o que pode ser melhorado da próxima vez.", weights: { sabedoria: 2, perseveranca: 1, lideranca: 1 } },
      { text: "Agradeço pelo aprendizado, mesmo com a frustração.", weights: { espiritualidade: 2, perseveranca: 1, sabedoria: 1 } },
      { text: "Incentivo o grupo a não desanimar.", weights: { comunicacao: 1, fraternidade: 1, perseveranca: 2 } }
    ]
  },

  /* ---------- sabedoria ---------- */
  {
    category: "sabedoria",
    text: "Imagine que Deus lhe confia uma missão importante dentro do SON. Qual atitude mais representa seu coração?",
    options: [
      { text: "Aceito o desafio e procuro conduzir outras pessoas pelo exemplo.", weights: { lideranca: 3, missao: 2, comunicacao: 2 } },
      { text: "Quero caminhar junto das pessoas, ajudando cada uma a crescer.", weights: { fraternidade: 3, acolhimento: 2, espiritualidade: 2 } },
      { text: "Estou disposto a servir onde houver necessidade, mesmo sem reconhecimento.", weights: { servico: 3, perseveranca: 2, espiritualidade: 2 } },
      { text: "Antes de qualquer decisão, busco compreender a vontade de Deus.", weights: { sabedoria: 3, espiritualidade: 3, missao: 1 } }
    ]
  },
  {
    category: "sabedoria",
    text: "Você precisa dar um conselho a um amigo do grupo sobre uma decisão importante. Como age?",
    options: [
      { text: "Escuto bastante antes de dizer qualquer coisa.", weights: { sabedoria: 3, acolhimento: 1 } },
      { text: "Compartilho minha experiência, mas deixo a decisão com ele.", weights: { sabedoria: 2, comunicacao: 1, fraternidade: 1 } },
      { text: "Sugiro que ele leve isso para a oração antes de decidir.", weights: { espiritualidade: 2, sabedoria: 2 } },
      { text: "Ajudo a pensar nos prós e contras com calma.", weights: { sabedoria: 2, iniciativa: 1, perseveranca: 1 } }
    ]
  },
  {
    category: "sabedoria",
    text: "Duas pessoas do grupo estão em desacordo sobre algo simples. Qual sua atitude mais natural?",
    options: [
      { text: "Escuto os dois lados antes de dizer alguma coisa.", weights: { sabedoria: 3, comunicacao: 1 } },
      { text: "Ajudo a encontrar um meio-termo entre as duas ideias.", weights: { sabedoria: 2, fraternidade: 2 } },
      { text: "Deixo que resolvam sozinhos, confiando na maturidade deles.", weights: { sabedoria: 2, perseveranca: 1 } },
      { text: "Sugiro rezarem juntos antes de continuar a conversa.", weights: { espiritualidade: 2, sabedoria: 1, fraternidade: 1 } }
    ]
  },
  {
    category: "sabedoria",
    text: "Você recebe uma crítica sobre algo que fez no grupo. Como costuma reagir?",
    options: [
      { text: "Reflito com calma antes de responder qualquer coisa.", weights: { sabedoria: 3, perseveranca: 1 } },
      { text: "Agradeço e procuro entender o que posso melhorar.", weights: { sabedoria: 2, servico: 1, acolhimento: 1 } },
      { text: "Levo para a oração antes de tirar qualquer conclusão.", weights: { espiritualidade: 2, sabedoria: 2 } },
      { text: "Converso abertamente com quem criticou para entender melhor.", weights: { comunicacao: 2, sabedoria: 2 } }
    ]
  }

];

/* =======================================================
   6. PROGRESS_MESSAGES — durante o quiz
======================================================= */
const PROGRESS_MESSAGES = [
  { until: 0.15, text: "Estamos conhecendo sua caminhada" },
  { until: 0.4,  text: "Cada resposta revela um pouco mais da sua missão" },
  { until: 0.7,  text: "Discernindo seus dons" },
  { until: 0.95, text: "Quase lá" },
  { until: 1.01, text: "Preparando sua Casa" }
];

/* =======================================================
   7. LOADING_SEQUENCE — revelação cinematográfica
   A ordem é exatamente a ordem exibida na tela.
======================================================= */
const LOADING_SEQUENCE = [
  "Analisando sua caminhada...",
  "Comparando seu perfil...",
  "Discernindo sua missão...",
  "Preparando sua Casa..."
];

/* =======================================================
   8. TRAIT_LABELS — usados na seção de perfil
======================================================= */
const TRAIT_LABELS = {
  lideranca:       { name: "Liderança",       phrase: "liderança e visão" },
  comunicacao:     { name: "Comunicação",     phrase: "comunicação clara" },
  missao:          { name: "Missão",          phrase: "compromisso missionário" },
  iniciativa:      { name: "Iniciativa",      phrase: "iniciativa e coragem" },
  espiritualidade: { name: "Espiritualidade", phrase: "profundidade espiritual" },
  fraternidade:    { name: "Fraternidade",    phrase: "espírito fraterno" },
  acolhimento:     { name: "Acolhimento",     phrase: "acolhimento e cuidado" },
  servico:         { name: "Serviço",         phrase: "dedicação ao serviço" },
  perseveranca:    { name: "Perseverança",    phrase: "perseverança e constância" },
  sabedoria:       { name: "Sabedoria",       phrase: "sabedoria e discernimento" }
};

/* Congela os dados de conteúdo para dificultar alterações simples
   via console do navegador. Proteção adicional — não substitui o
   fato de que todo código enviado ao navegador é, por natureza,
   visível a quem quiser inspecionar. */
if (typeof Object.freeze === "function") {
  Object.freeze(TRAITS);
  Object.freeze(CATEGORIES);
  Object.freeze(HOUSE_PROFILES);
  Object.freeze(QUESTION_POOL);
}
