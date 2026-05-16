import { useMemo, useState } from 'react'
import './App.css'

type View = 'overview' | 'alerts' | 'health' | 'family' | 'settings'
type Level = 'info' | 'attention' | 'urgent'

type AlertItem = {
  id: number
  level: Level
  title: string
  detail: string
  time: string
  done: boolean
}

const seedAlerts: AlertItem[] = [
  {
    id: 1,
    level: 'urgent',
    title: 'SOS acionado',
    detail: 'Botao fisico pressionado perto da Praca Aurora.',
    time: '14:42',
    done: false,
  },
  {
    id: 2,
    level: 'attention',
    title: 'Bateria baixa da tag',
    detail: 'Tag GPS com 17% de carga.',
    time: '14:20',
    done: false,
  },
  {
    id: 3,
    level: 'info',
    title: 'Chegada em casa',
    detail: 'Retorno para area segura confirmado.',
    time: '11:15',
    done: true,
  },
]

function App() {
  const [view, setView] = useState<View>('overview')
  const [alerts, setAlerts] = useState(seedAlerts)
  const [insideSafe, setInsideSafe] = useState(false)
  const [trackerBattery, setTrackerBattery] = useState(17)

  const openAlerts = useMemo(() => alerts.filter((a) => !a.done), [alerts])
  const urgentCount = useMemo(
    () => openAlerts.filter((a) => a.level === 'urgent').length,
    [openAlerts],
  )

  function addAlert(level: Level, title: string, detail: string) {
    const time = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setAlerts((prev) => [
      { id: Date.now(), level, title, detail, time, done: false },
      ...prev,
    ])
  }

  function markDone(id: number) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, done: true } : a)))
  }

  function simulateExit() {
    setInsideSafe(false)
    addAlert('attention', 'Saiu da area segura', 'Idoso fora da geofence Casa.')
  }

  function simulateReturn() {
    setInsideSafe(true)
    addAlert('info', 'Retorno para area segura', 'Idoso voltou para Casa.')
  }

  function simulateSOS() {
    addAlert('urgent', 'SOS acionado', 'Acompanhar localizacao e iniciar contato.')
  }

  function drainBattery() {
    setTrackerBattery((prev) => {
      const next = Math.max(3, prev - 5)
      if (next <= 20) {
        addAlert('attention', 'Bateria critica', `Tag GPS em ${next}%.`)
      }
      return next
    })
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <h1>Guardiao 60+</h1>
          <p>Ops Console</p>
        </div>
        <nav>
          <button className={view === 'overview' ? 'active' : ''} onClick={() => setView('overview')}>Visao Geral</button>
          <button className={view === 'alerts' ? 'active' : ''} onClick={() => setView('alerts')}>Alertas</button>
          <button className={view === 'health' ? 'active' : ''} onClick={() => setView('health')}>Saude</button>
          <button className={view === 'family' ? 'active' : ''} onClick={() => setView('family')}>Familia</button>
          <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}>Configuracoes</button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h2>Painel operacional</h2>
            <p>{urgentCount > 0 ? 'Urgente' : 'Monitoramento ativo'} - {openAlerts.length} alertas abertos</p>
          </div>
          <div className="topbar-actions">
            <button onClick={simulateSOS} className="danger">Simular SOS</button>
            <button onClick={simulateExit}>Simular Saida</button>
            <button onClick={simulateReturn}>Simular Retorno</button>
          </div>
        </header>

        {view === 'overview' && (
          <section className="content-grid">
            <article className="card kpi">
              <h3>Status da rotina</h3>
              <p className="big">{insideSafe ? 'Dentro da area segura' : 'Fora da area segura'}</p>
              <p>Ultima leitura: -22.9121, -43.2302 as 14:46</p>
            </article>
            <article className="card kpi">
              <h3>Dispositivos</h3>
              <p className="big">Tag {trackerBattery}% | Watch 63%</p>
              <button onClick={drainBattery}>Consumir bateria (teste)</button>
            </article>
            <article className="card kpi">
              <h3>Saude basica</h3>
              <p className="big">FC 78 bpm</p>
              <p>Passos hoje: 3.814 | Descanso: 6h 12m</p>
            </article>
            <article className="card map panel-wide">
              <h3>Mapa de acompanhamento</h3>
              <div className="mapbox">
                <div className="dot" />
                <span>Posicao atual do idoso</span>
              </div>
            </article>
          </section>
        )}

        {view === 'alerts' && (
          <section className="content-grid">
            <article className="card panel-wide">
              <h3>Fila de alertas</h3>
              <ul className="alert-list">
                {alerts.map((alert) => (
                  <li key={alert.id} className={`alert ${alert.level}`}>
                    <div>
                      <strong>{alert.title}</strong>
                      <p>{alert.detail}</p>
                      <small>{alert.time} - {alert.done ? 'Resolvido' : 'Pendente'}</small>
                    </div>
                    {!alert.done && <button onClick={() => markDone(alert.id)}>Resolver</button>}
                  </li>
                ))}
              </ul>
            </article>
          </section>
        )}

        {view === 'health' && (
          <section className="content-grid">
            <article className="card">
              <h3>Frequencia cardiaca</h3>
              <p className="big">Media 77 bpm</p>
              <p>Pico hoje: 108 bpm</p>
            </article>
            <article className="card">
              <h3>Movimento</h3>
              <p className="big">3.814 passos</p>
              <p>Tempo sem movimento: 1h 08m</p>
            </article>
            <article className="card panel-wide">
              <h3>Resumo de rotina</h3>
              <p>Hoje saiu 08:04, passou na farmacia e voltou para casa 10:26.</p>
              <p>Recomendacao operacional: manter check-in de bateria as 18:00.</p>
            </article>
          </section>
        )}

        {view === 'family' && (
          <section className="content-grid">
            <article className="card panel-wide">
              <h3>Familiares autorizados</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Papel</th>
                    <th>Canal</th>
                    <th>Recebe urgente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Marina Souza</td><td>Filha</td><td>WhatsApp</td><td>Sim</td></tr>
                  <tr><td>Rafael Souza</td><td>Neto</td><td>Push</td><td>Sim</td></tr>
                  <tr><td>Ana Costa</td><td>Cuidadora</td><td>App</td><td>Nao</td></tr>
                </tbody>
              </table>
            </article>
          </section>
        )}

        {view === 'settings' && (
          <section className="content-grid">
            <article className="card">
              <h3>Politica LGPD</h3>
              <p>Consentimento ativo para localizacao e saude.</p>
              <p>Retencao configurada: 90 dias para eventos operacionais.</p>
            </article>
            <article className="card">
              <h3>Canais de alerta</h3>
              <p>Push: ativo</p>
              <p>WhatsApp: ativo</p>
              <p>SMS: fallback ativo</p>
            </article>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
