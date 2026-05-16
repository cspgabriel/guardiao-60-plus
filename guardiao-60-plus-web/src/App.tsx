import { useMemo, useState } from 'react'
import './App.css'

type View = 'command' | 'map' | 'alerts' | 'health' | 'circle' | 'settings'
type Level = 'stable' | 'attention' | 'urgent'

type AlertItem = {
  id: number
  level: Level
  title: string
  detail: string
  time: string
  done: boolean
}

const initialAlerts: AlertItem[] = [
  {
    id: 1,
    level: 'urgent',
    title: 'SOS acionado',
    detail: 'Botao fisico pressionado perto da Farmacia Central.',
    time: '14:42',
    done: false,
  },
  {
    id: 2,
    level: 'attention',
    title: 'Bateria critica da tag',
    detail: 'Tag GPS com 17%. Recarregar hoje.',
    time: '14:20',
    done: false,
  },
  {
    id: 3,
    level: 'stable',
    title: 'Retorno confirmado',
    detail: 'Voltou para a area segura Casa.',
    time: '11:15',
    done: true,
  },
]

const timeline = [
  ['08:04', 'Saiu de Casa', 'geofence'],
  ['08:31', 'Parada na Praca Aurora', 'location'],
  ['09:15', 'Chegou na Farmacia Central', 'location'],
  ['10:26', 'Retornou para Casa', 'geofence'],
]

const circle = [
  ['Marina Souza', 'Filha', 'WhatsApp', 'Urgente'],
  ['Rafael Souza', 'Neto', 'Push', 'Urgente'],
  ['Ana Costa', 'Cuidadora', 'App', 'Atencao'],
]

function App() {
  const [view, setView] = useState<View>('command')
  const [alerts, setAlerts] = useState(initialAlerts)
  const [insideSafe, setInsideSafe] = useState(false)
  const [battery, setBattery] = useState(17)

  const openAlerts = useMemo(() => alerts.filter((alert) => !alert.done), [alerts])
  const urgentAlerts = useMemo(
    () => openAlerts.filter((alert) => alert.level === 'urgent').length,
    [openAlerts],
  )

  function addAlert(level: Level, title: string, detail: string) {
    const time = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    setAlerts((current) => [
      { id: Date.now(), level, title, detail, time, done: false },
      ...current,
    ])
  }

  function resolveAlert(id: number) {
    setAlerts((current) =>
      current.map((alert) => (alert.id === id ? { ...alert, done: true } : alert)),
    )
  }

  function simulateSOS() {
    addAlert('urgent', 'SOS acionado', 'Acionar Marina e acompanhar mapa ao vivo.')
  }

  function simulateExit() {
    setInsideSafe(false)
    addAlert('attention', 'Saiu da area Casa', 'Permanencia fora do padrao esperado.')
  }

  function simulateReturn() {
    setInsideSafe(true)
    addAlert('stable', 'Chegada em Casa', 'Rotina voltou ao padrao esperado.')
  }

  function drainBattery() {
    setBattery((current) => {
      const next = Math.max(3, current - 5)
      addAlert('attention', 'Bateria atualizada', `Tag GPS agora esta em ${next}%.`)
      return next
    })
  }

  return (
    <div className="app">
      <aside className="rail">
        <div className="mark">G60</div>
        <nav aria-label="Navegacao principal">
          <button className={view === 'command' ? 'active' : ''} onClick={() => setView('command')} title="Comando">
            <Icon name="grid" />
          </button>
          <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')} title="Mapa">
            <Icon name="map" />
          </button>
          <button className={view === 'alerts' ? 'active' : ''} onClick={() => setView('alerts')} title="Alertas">
            <Icon name="bell" />
          </button>
          <button className={view === 'health' ? 'active' : ''} onClick={() => setView('health')} title="Saude">
            <Icon name="heart" />
          </button>
          <button className={view === 'circle' ? 'active' : ''} onClick={() => setView('circle')} title="Familia">
            <Icon name="users" />
          </button>
          <button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')} title="Configuracoes">
            <Icon name="shield" />
          </button>
        </nav>
      </aside>

      <main className="workspace">
        <header className="header">
          <div>
            <span className="eyebrow">Command Center</span>
            <h1>Maria Oliveira</h1>
            <p>Monitoramento ativo - Farmacia Central - atualizado as 14:46</p>
          </div>
          <div className="header-actions">
            <button className="ghost" onClick={simulateExit}>Saida</button>
            <button className="ghost" onClick={simulateReturn}>Retorno</button>
            <button className="danger" onClick={simulateSOS}>SOS</button>
          </div>
        </header>

        <section className="profile-strip">
          <article className="profile-card">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=380&q=80"
              alt="Perfil de Maria Oliveira"
            />
            <div>
              <h2>Maria, 72</h2>
              <p>{insideSafe ? 'Dentro da area segura' : 'Fora da area segura'}</p>
            </div>
          </article>
          <Metric label="Risco atual" value={urgentAlerts > 0 ? 'Urgente' : 'Atencao'} tone={urgentAlerts > 0 ? 'urgent' : 'attention'} />
          <Metric label="Tag GPS" value={`${battery}%`} tone={battery <= 20 ? 'attention' : 'stable'} />
          <Metric label="Smartwatch" value="63%" tone="stable" />
          <Metric label="FC media" value="78 bpm" tone="stable" />
        </section>

        {(view === 'command' || view === 'map') && (
          <section className="command-grid">
            <article className="panel map-panel">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Mapa ao vivo</span>
                  <h2>Zona Casa / Farmacia Central</h2>
                </div>
                <button className="ghost">Acompanhar</button>
              </div>
              <div className="live-map">
                <div className="safe-zone zone-home">Casa</div>
                <div className="safe-zone zone-clinic">Clinica</div>
                <div className="route-line"></div>
                <div className="pin elder-pin"><span></span>Maria</div>
                <div className="pin home-pin"><span></span>Casa</div>
              </div>
            </article>

            <article className="panel">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Acao recomendada</span>
                  <h2>Prioridade alta</h2>
                </div>
                <span className="status-dot urgent"></span>
              </div>
              <p className="recommendation">
                SOS recente + bateria baixa. Ligue para Maria e mantenha Marina
                como responsavel primario.
              </p>
              <div className="action-stack">
                <button className="primary">Ligar agora</button>
                <button className="ghost">Avisar familia</button>
                <button className="ghost" onClick={drainBattery}>Atualizar bateria</button>
              </div>
            </article>

            <article className="panel timeline-panel">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Linha do tempo</span>
                  <h2>Hoje</h2>
                </div>
              </div>
              <div className="timeline">
                {timeline.map(([time, event, type]) => (
                  <div className="timeline-item" key={`${time}-${event}`}>
                    <span className={`timeline-icon ${type}`}></span>
                    <div>
                      <strong>{time}</strong>
                      <p>{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel health-card">
              <div className="panel-head">
                <div>
                  <span className="eyebrow">Bem-estar</span>
                  <h2>Sinais basicos</h2>
                </div>
              </div>
              <div className="rings">
                <div className="ring"><span>78</span><small>bpm</small></div>
                <div className="ring alt"><span>3.8k</span><small>passos</small></div>
              </div>
              <p>Descanso: 6h 12m - sem movimento ha 1h 08m.</p>
            </article>
          </section>
        )}

        {view === 'alerts' && (
          <section className="panel full">
            <div className="panel-head">
              <div>
                <span className="eyebrow">Fila operacional</span>
                <h2>Alertas</h2>
              </div>
              <button className="ghost">Exportar</button>
            </div>
            <div className="alert-table">
              {alerts.map((alert) => (
                <article className={`alert-row ${alert.level}`} key={alert.id}>
                  <span className={`status-dot ${alert.level}`}></span>
                  <div>
                    <strong>{alert.title}</strong>
                    <p>{alert.detail}</p>
                  </div>
                  <time>{alert.time}</time>
                  <span>{alert.done ? 'Resolvido' : 'Pendente'}</span>
                  {!alert.done && <button className="ghost" onClick={() => resolveAlert(alert.id)}>Resolver</button>}
                </article>
              ))}
            </div>
          </section>
        )}

        {view === 'health' && (
          <section className="command-grid">
            <article className="panel health-wide">
              <div className="panel-head">
                <div><span className="eyebrow">Saude basica</span><h2>Resumo semanal</h2></div>
              </div>
              <div className="chart-bars">
                {[62, 78, 54, 90, 68, 74, 82].map((height, index) => (
                  <span style={{ height: `${height}%` }} key={index}></span>
                ))}
              </div>
            </article>
            <article className="panel">
              <h2>Padrao pessoal</h2>
              <p className="recommendation">Frequencia e passos dentro do normal. Descanso 14% menor que a media de 7 dias.</p>
            </article>
          </section>
        )}

        {view === 'circle' && (
          <section className="panel full">
            <div className="panel-head">
              <div><span className="eyebrow">Care circle</span><h2>Familia e cuidadores</h2></div>
              <button className="primary">Adicionar</button>
            </div>
            <div className="people-grid">
              {circle.map(([name, role, channel, priority]) => (
                <article className="person-card" key={name}>
                  <div className="avatar">{name.slice(0, 1)}</div>
                  <h3>{name}</h3>
                  <p>{role}</p>
                  <span>{channel} - {priority}</span>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === 'settings' && (
          <section className="command-grid">
            <article className="panel">
              <h2>Consentimento</h2>
              <p className="recommendation">Localizacao e saude basica ativos com auditoria de acesso.</p>
            </article>
            <article className="panel">
              <h2>Canais</h2>
              <p className="recommendation">Push, WhatsApp e SMS configurados com fallback.</p>
            </article>
            <article className="panel full">
              <h2>Retencao</h2>
              <p className="recommendation">Eventos operacionais por 90 dias. Dados sensiveis podem ser excluidos por solicitacao.</p>
            </article>
          </section>
        )}
      </main>
    </div>
  )
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: Level
}) {
  return (
    <article className={`metric ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function Icon({ name }: { name: 'grid' | 'map' | 'bell' | 'heart' | 'users' | 'shield' }) {
  const paths = {
    grid: <><path d="M4 4h7v7H4z" /><path d="M13 4h7v7h-7z" /><path d="M4 13h7v7H4z" /><path d="M13 13h7v7h-7z" /></>,
    map: <><path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" /><path d="M9 3v15" /><path d="M15 6v15" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    shield: <><path d="M12 3l7 3v5c0 4.7-2.9 8.1-7 10-4.1-1.9-7-5.3-7-10V6l7-3z" /><path d="M9 12l2 2 4-5" /></>,
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

export default App
