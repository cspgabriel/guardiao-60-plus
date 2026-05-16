import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Guardião 60+</p>
        <h1>Seguranca familiar para idosos, com rastreamento consentido.</h1>
        <p className="lead">
          MVP ativo: localizacao em tempo real, cerca virtual, bateria dos
          dispositivos, SOS e alertas por prioridade.
        </p>
        <a className="cta" href="#mvp">Ver escopo do MVP</a>
      </header>

      <section id="mvp" className="grid">
        <article className="card">
          <h2>Modulo 1: Localizacao e seguranca</h2>
          <ul>
            <li>Mapa com localizacao atual e ultima atualizacao.</li>
            <li>Cercas virtuais com alertas de saida e retorno.</li>
            <li>Bateria da tag GPS e status online/offline.</li>
            <li>Botao SOS e compartilhamento entre familiares.</li>
          </ul>
        </article>

        <article className="card">
          <h2>Modulo 2: Saude basica (fase seguinte)</h2>
          <ul>
            <li>Batimentos, passos e descanso.</li>
            <li>Alertas de atencao sem diagnostico medico.</li>
            <li>Resumo simples de rotina para cuidador.</li>
          </ul>
        </article>

        <article className="card">
          <h2>Governanca LGPD</h2>
          <ul>
            <li>Consentimento separado para localizacao e saude.</li>
            <li>Auditoria de acesso e exclusao de dados.</li>
            <li>Criptografia em transito e em repouso.</li>
          </ul>
        </article>
      </section>

      <section className="status">
        <h2>Status do projeto</h2>
        <p>Repositorio pronto para evolucao do app mobile + backend.</p>
        <p>Esta pagina esta publicada via GitHub Pages.</p>
      </section>
    </main>
  )
}

export default App
