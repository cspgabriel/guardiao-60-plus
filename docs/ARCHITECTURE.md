# Arquitetura inicial

## Fluxo

1. Tracker GPS 4G envia dados de localizacao, bateria e SOS.
2. Backend normaliza eventos e gera alertas.
3. App do familiar consome status, historico e alertas.
4. Notificacoes saem por push e canais secundarios (fase 2).

## Componentes

- `guardiao-60-plus-web`: vitrine ativa do produto e status de rollout
- `backend` (fase seguinte): API Fastify/Node para ingestao e alertas
- Banco de dados (fase seguinte): eventos, usuarios, consentimentos e auditoria

## Dados criticos

- `LocationEvent`: lat, lng, timestamp, deviceId
- `DeviceStatus`: battery, signal, online
- `Alert`: tipo, prioridade, origem, destino, status
- `Consent`: tipo, data, termo aceito, usuario responsavel
