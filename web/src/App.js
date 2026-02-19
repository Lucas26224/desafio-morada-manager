import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SALAS_DISPONIVEIS = [
  "Capela 01 - Térreo", "Capela 02 - Térreo", "Capela VIP - 1º Andar", "Salão Nobre", "Anfiteatro Ecumênico"
];

function App() {
  const [agendamentos, setAgendamentos] = useState([]);
  
  // Estados do formulário
  const [salaSelecionada, setSalaSelecionada] = useState(SALAS_DISPONIVEIS[0]);
  const [responsavel, setResponsavel] = useState('');
  const [status, setStatus] = useState('Ocupada');
  const [tipoUrna, setTipoUrna] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  async function carregarDados() {
    const res = await axios.get('http://localhost:3333/capelas');
    setAgendamentos(res.data);
  }

  useEffect(() => { carregarDados(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await axios.post('http://localhost:3333/capelas', {
      nome: salaSelecionada, responsavel, status, tipo_urna: tipoUrna, detalhes, horario_inicio: inicio, horario_fim: fim
    });
    setResponsavel(''); setTipoUrna(''); setDetalhes(''); setInicio(''); setFim('');
    carregarDados();
  }

  // FUNÇÃO DE DELETAR (O "X")
  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja liberar esta sala e apagar o agendamento?")) {
      await axios.delete(`http://localhost:3333/capelas/${id}`);
      carregarDados();
    }
  }

  // FUNÇÃO DE ATUALIZAR STATUS (Mudar no card)
  async function handleStatusChange(id, novoStatus) {
    await axios.put(`http://localhost:3333/capelas/${id}`, { status: novoStatus });
    carregarDados();
  }

  function formatarData(dataISO) {
    if(!dataISO) return '---';
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR') + ' às ' + data.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
  }

  return (
    <div>
      <header>
        <h1>🏛️ Morada Manager</h1>
        <p>Sistema de Reservas de Capelas</p>
      </header>

      <div className="container">
        
        {/* FORMULÁRIO */}
        <div className="form-card">
          <h3>📅 Novo Agendamento</h3>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', width: '100%'}}>
            <select value={salaSelecionada} onChange={e => setSalaSelecionada(e.target.value)} style={{flex: 1}}>
              {SALAS_DISPONIVEIS.map(sala => <option key={sala} value={sala}>{sala}</option>)}
            </select>
            <select value={status} onChange={e => setStatus(e.target.value)} style={{flex: 1}}>
              <option value="Ocupada">🔴 Ocupada</option>
              <option value="Livre">🟢 Livre</option>
              <option value="Aguardando Limpeza">🟠 Aguardando Limpeza</option>
            </select>
          </div>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', width: '100%'}}>
             <input placeholder="Falecido / Responsável" value={responsavel} onChange={e => setResponsavel(e.target.value)} style={{flex: 2}} />
             <input placeholder="Tipo de Urna" value={tipoUrna} onChange={e => setTipoUrna(e.target.value)} style={{flex: 1}} />
          </div>
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '10px', width: '100%'}}>
            <input type="datetime-local" value={inicio} onChange={e => setInicio(e.target.value)} style={{flex: 1}} />
            <input type="datetime-local" value={fim} onChange={e => setFim(e.target.value)} style={{flex: 1}} />
          </div>
          <input placeholder="Detalhes..." value={detalhes} onChange={e => setDetalhes(e.target.value)} style={{width: '100%'}} />
          <button type="submit" onClick={handleAdd} style={{marginTop: '15px', width: '100%'}}>Confirmar Agendamento</button>
        </div>

        {/* PAINEL DE OCUPAÇÃO */}
        <h2>Painel de Ocupação</h2>
        <div className="grid-capelas">
          {agendamentos.map(item => {
             let classeCss = item.status === 'Ocupada' ? 'status-ocupada' : item.status === 'Aguardando Limpeza' ? 'status-limpeza' : 'status-livre';
             
             return (
              <div key={item.id} className={`card-capela ${classeCss}`} style={{position: 'relative'}}>
                
                {/* BOTÃO X (DELETAR) */}
                <button 
                  onClick={() => handleDelete(item.id)}
                  style={{
                    position: 'absolute', top: '10px', right: '10px', 
                    background: '#e74c3c', color: 'white', border: 'none', 
                    width: '25px', height: '25px', borderRadius: '50%', 
                    cursor: 'pointer', fontWeight: 'bold', fontSize: '12px'
                  }}
                  title="Liberar Sala / Excluir"
                >
                  X
                </button>

                <div style={{marginRight: '30px'}}>
                  <h3>{item.nome}</h3>
                  
                  {/* SELETOR DE STATUS DENTRO DO CARD */}
                  <div style={{marginTop: '5px'}}>
                    <select 
                      value={item.status} 
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      style={{
                        padding: '2px', fontSize: '0.8rem', borderRadius: '4px',
                        border: '1px solid #ccc', fontWeight: 'bold'
                      }}
                    >
                      <option value="Ocupada">🔴 Ocupada</option>
                      <option value="Aguardando Limpeza">🟠 Limpeza</option>
                      <option value="Livre">🟢 Livre</option>
                    </select>
                  </div>
                </div>

                <div style={{marginTop: '15px', fontSize: '0.95rem'}}>
                  <p><strong>👤 Falecido:</strong> {item.responsavel}</p>
                  <p><strong>⚰️ Urna:</strong> {item.tipo_urna || 'Padrão'}</p>
                  
                  <div style={{background: '#eef2f7', padding: '10px', borderRadius: '5px', margin: '10px 0'}}>
                    <p style={{fontSize: '0.85rem'}}>🕒 <strong>Início:</strong> {formatarData(item.horario_inicio)}</p>
                    <p style={{fontSize: '0.85rem'}}>⚱️ <strong>Fim:</strong> {formatarData(item.horario_fim)}</p>
                  </div>
                  {item.detalhes && <p style={{fontSize: '0.8rem', color: '#666'}}>Obs: {item.detalhes}</p>}
                </div>
              </div>
             )
          })}
        </div>

      </div>
    </div>
  );
}

export default App;