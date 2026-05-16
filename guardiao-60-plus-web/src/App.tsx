import './App.css'

const modules = [
  {
    title: 'Modulo 1: Localizacao e seguranca',
    items: [
      'Localizacao em tempo real com ultima atualizacao.',
      'Cerca virtual com alerta de saida e retorno.',
      'Bateria da tag GPS e status offline.',
      'SOS com escalonamento para familia.',
    ],
  },
  {
    title: 'Modulo 2: Saude basica',
    items: [
      'Batimentos, passos e tempo de descanso.',
      'Uso do relogio e alertas de inatividade.',
      'Resumo semanal simples para cuidadores.',
      'Sem diagnostico medico no MVP.',
    ],
  },
  {
    title: 'Modulo 3: IA de rotina',
    items: [
      'Detecta quebra de padrao de deslocamento.',
      'Prioriza alertas por risco operacional.',
      'Explica o motivo do alerta em linguagem humana.',
      'Resumo diario de acompanhamento familiar.',
    ],
  },
]

const plans = [
  {
    name: 'Familiar Basico',
    price: 'R$ 39,90/mês',
    items: [
      '1 idoso monitorado',
      '2 familiares',
      'Geofence + alertas',
      'Historico de deslocamento',
    ],
  },
  {
    name: 'Familiar Completo',
    price: 'R$ 79,90/mês',
    items: [
      'Ate 5 familiares',
      'Saude basica integrada',
      'IA de rotina',
      'WhatsApp e SMS de alerta',
    ],
  },
  {
    name: 'B2B Care',
    price: 'Sob proposta',
    items: [
      'Clinicas e home care',
      'Multi-unidade',
      'Painel de operacao',
      'Treinamento e onboarding',
    ],
  },
]

const faq = [
  {
    q: 'O idoso precisa usar celular?',
    a: 'Nao. O fluxo principal usa tag GPS e smartwatch compativel, com app apenas para familiar/cuidador.',
  },
  {
    q: 'Vocês fazem diagnostico medico?',
    a: 'Nao. O produto trabalha com sinais de atencao e rotina, sem recomendacao clinica automatica.',
  },
  {
    q: 'Como fica LGPD e consentimento?',
    a: 'Consentimento registrado, controle por perfil de acesso, auditoria de visualizacao e politica de exclusao.',
  },
  {
    q: 'Quando comeca a operacao?',
    a: 'A operacao inicia com onboarding do kit e configuracao de areas seguras no primeiro dia.',
  },
]

function App() {
  return (
    <main className="page">
      <header className="hero section">
        <p className="tag">Guardiao 60+</p>
        <h1>Seguranca familiar para idosos com monitoramento remoto real.</h1>
        <p className="subtitle">
          Plataforma para filho, cuidador e home care acompanharem localizacao,
          rotina e alertas em um painel unico.
        </p>
        <div className="hero-cta">
          <a href="#planos" className="btn btn-primary">
            Ver planos
          </a>
          <a href="#demo" className="btn btn-secondary">
            Agendar demonstracao
          </a>
        </div>
      </header>

      <section className="section panel">
        <h2>Dor que resolve</h2>
        <div className="grid-3">
          <article>
            <h3>Familia sem visibilidade</h3>
            <p>
              Quando o idoso sai, a familia nao sabe se esta seguro ou se precisa
              agir.
            </p>
          </article>
          <article>
            <h3>Alerta tecnico confuso</h3>
            <p>
              Mensagens tecnicas geram atraso de resposta. Aqui o alerta sai em
              linguagem clara.
            </p>
          </article>
          <article>
            <h3>Operacao sem padrao</h3>
            <p>
              Home care e clinicas precisam de trilha de eventos e registro de
              quem visualizou.
            </p>
          </article>
        </div>
      </section>

      <section className="section panel">
        <h2>Como funciona</h2>
        <div className="flow">
          <div>Tag GPS 4G e smartwatch</div>
          <div>Backend Guardiao 60+</div>
          <div>App do familiar/cuidador</div>
          <div>Alertas push/WhatsApp/SMS</div>
        </div>
      </section>

      <section className="section panel">
        <h2>Modulos do produto</h2>
        <div className="grid-3">
          {modules.map((module) => (
            <article key={module.title} className="module">
              <h3>{module.title}</h3>
              <ul>
                {module.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section panel">
        <h2>Confianca operacional</h2>
        <div className="grid-2">
          <article>
            <h3>LGPD by design</h3>
            <ul>
              <li>Consentimento separado para localizacao e saude.</li>
              <li>Auditoria de acesso por usuario e horario.</li>
              <li>Politica de retencao e exclusao de dados.</li>
            </ul>
          </article>
          <article>
            <h3>Hardware orientado a campo</h3>
            <ul>
              <li>Tag GPS homologada Anatel.</li>
              <li>Bateria monitorada com alerta antecipado.</li>
              <li>SOS fisico para acao imediata.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="planos" className="section panel">
        <h2>Planos comerciais</h2>
        <div className="grid-3">
          {plans.map((plan) => (
            <article key={plan.name} className="plan">
              <h3>{plan.name}</h3>
              <p className="price">{plan.price}</p>
              <ul>
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section panel">
        <h2>FAQ</h2>
        <div className="faq-list">
          {faq.map((item) => (
            <article key={item.q} className="faq">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="demo" className="section cta-final">
        <h2>Pronto para ativar o Guardiao 60+ em operacao real?</h2>
        <p>
          Implantacao com checklist, treinamento inicial e configuracao das areas
          seguras da familia ou unidade de cuidado.
        </p>
        <a className="btn btn-primary" href="mailto:contato@guardiao60mais.com">
          Solicitar proposta
        </a>
      </section>
    </main>
  )
}

export default App
