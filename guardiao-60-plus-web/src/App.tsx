import { useMemo, useState } from 'react'
import './App.css'

type AlertLevel = 'info' | 'attention' | 'urgent'

type AlertItem = {
  id: number
  level: AlertLevel
  message: string
  time: string
  resolved: boolean
}

type TimelineItem = {
  time: string
  place: string
  event: string
}

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    level: 'urgent',
    message: 'SOS acionado as 14:12 perto da Farmacia Central.',
    time: '14:12',
    resolved: false,
  },
  {
    id: 2,
    level: 'attention',
    message: 'Bateria da tag GPS em 18%.',
    time: '13:44',
    resolved: false,
  },
  {
    id: 3,
    level: 'info',
    message: 'Retorno para casa confirmado.',
    time: '11:31',
    resolved: true,
  },
]

const timeline: TimelineItem[] = [
  { time: '08:04', place: 'Casa', event: 'Saida da area segura' },
  { time: '08:31', place: 'Praca Aurora', event: 'Parada breve' },
  { time: '09:15', place: 'Farmacia Central', event: 'Permanencia 14 min' },
  { time: '10:26', place: 'Casa', event: 'Retorno para area segura' },
]

function App() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [showOnlyOpen, setShowOnlyOpen] = useState(false)
  const [insideSafeArea, setInsideSafeArea] = useState(true)
  const [watchOnWrist, setWatchOnWrist] = useState(true)

  const openAlerts = useMemo(
    () => alerts.filter((alert) => !alert.resolved).length,
    [alerts],
  )

  const urgentAlerts = useMemo(
    () =>
      alerts.filter((alert) => !alert.resolved && alert.level === 'urgent').length,
    [alerts],
  )

  const visibleAlerts = useMemo(() => {
    if (!showOnlyOpen) return alerts
    return alerts.filter((alert) => !alert.resolved)
  }, [alerts, showOnlyOpen])

  function resolveAlert(id: number) {
    setAlerts((current) =>
      current.map((alert) =>
        alert.id === id ? { ...alert, resolved: true } : alert,
      ),
    )
  }

  function simulateExitSafeArea() {
    setInsideSafeArea(false)
    setAlerts((current) => [
      {
        id: Date.now(),
        level: 'attention',
        message: 'Idoso saiu da area segura Casa.',
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        resolved: false,
      },
      ...current,
    ])
  }

  function simulateSOS() {
    setAlerts((current) => [
      {
        id: Date.now(),
        level: 'urgent',
        message: 'SOS acionado no rastreador GPS.',
        time: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        resolved: false,
      },
      ...current,
    ])
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="hero-head">
          <p className="eyebrow">Guardiao 60+</p>
          <span className="pill">MVP operavel</span>
        </div>
        <h1>Plataforma familiar de monitoramento para idosos.</h1>
        <p className="lead">
          Landing comercial + dashboard funcional de cuidador, pronto para demo
          real com fluxo de alertas, status dos dispositivos e historico.
        </p>
      </header>

      <section className="kpi-grid">
        <article className="kpi-card">
          <h2>Status geral</h2>
          <p className="kpi-value">{urgentAlerts > 0 ? 'Urgente' : 'Atencao'}</p>
          <p className="kpi-note">{openAlerts} alertas pendentes</p>
        </article>
        <article className="kpi-card">
          <h2>Tag GPS</h2>
          <p className="kpi-value">18%</p>
          <p className="kpi-note">Ultima atualizacao: 14:13</p>
        </article>
        <article className="kpi-card">
          <h2>Smartwatch</h2>
          <p className="kpi-value">64%</p>
          <p className="kpi-note">FC media: 77 bpm</p>
        </article>
        <article className="kpi-card">
          <h2>Localizacao</h2>
          <p className="kpi-value">Farmacia Central</p>
          <p className="kpi-note">-22.9121, -43.2302</p>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <h2>Acoes rapidas</h2>
          <div className="actions">
            <button type="button" onClick={simulateExitSafeArea}>
              Simular saida da area segura
            </button>
            <button type="button" className="danger" onClick={simulateSOS}>
              Simular SOS
            </button>
            <button type="button">Ligar para idoso</button>
            <button type="button">Avisar familia</button>
          </div>
        </article>

        <article className="panel">
          <h2>Estado da rotina</h2>
          <div className="toggles">
            <label>
              <input
                type="checkbox"
                checked={insideSafeArea}
                onChange={(event) => setInsideSafeArea(event.target.checked)}
              />
              Dentro da area segura
            </label>
            <label>
              <input
                type="checkbox"
                checked={watchOnWrist}
                onChange={(event) => setWatchOnWrist(event.target.checked)}
              />
              Relogio em uso
            </label>
          </div>
          <p className="routine-status">
            {insideSafeArea
              ? 'Rotina em padrao esperado.'
              : 'Quebra de rotina detectada: fora da area segura.'}
          </p>
          <p className="routine-status">
            {watchOnWrist
              ? 'Dados de saude recebendo normalmente.'
              : 'Atencao: sem uso de smartwatch no momento.'}
          </p>
        </article>

        <article className="panel panel-wide">
          <div className="panel-head">
            <h2>Alertas</h2>
            <label className="inline-toggle">
              <input
                type="checkbox"
                checked={showOnlyOpen}
                onChange={(event) => setShowOnlyOpen(event.target.checked)}
              />
              Mostrar apenas pendentes
            </label>
          </div>
          <ul className="alert-list">
            {visibleAlerts.map((alert) => (
              <li key={alert.id} className={`alert ${alert.level}`}>
                <div>
                  <p className="alert-message">{alert.message}</p>
                  <p className="alert-meta">
                    {alert.time} - {alert.resolved ? 'Resolvido' : 'Pendente'}
                  </p>
                </div>
                {!alert.resolved && (
                  <button type="button" onClick={() => resolveAlert(alert.id)}>
                    Marcar resolvido
                  </button>
                )}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel panel-wide">
          <h2>Historico de deslocamento</h2>
          <ul className="timeline">
            {timeline.map((item) => (
              <li key={`${item.time}-${item.place}`}>
                <span>{item.time}</span>
                <strong>{item.place}</strong>
                <p>{item.event}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  )
}

export default App
