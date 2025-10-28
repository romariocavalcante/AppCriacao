import React, { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';

function AdminView() {
  const { content, setContent, reset } = useContent();
  const [form, setForm] = useState(content || {});
  const [jsonEditors, setJsonEditors] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(content || {});
    // initialize JSON editors with pretty JSON
    setJsonEditors({
      dailyMissions: JSON.stringify((content && content.dailyMissions) || [], null, 2),
      quizQuestions: JSON.stringify((content && content.quizQuestions) || [], null, 2),
      preventionTips: JSON.stringify((content && content.preventionTips) || [], null, 2),
      achievements: JSON.stringify((content && content.achievements) || [], null, 2),
      challenges: JSON.stringify((content && content.challenges) || [], null, 2),
      levels: JSON.stringify((content && content.levels) || [], null, 2),
      studyAreas: JSON.stringify((content && content.studyAreas) || [], null, 2),
    });
    setErrors({});
  }, [content]);

  const onChange = (path, value) => {
    setForm(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!cur[k]) cur[k] = {};
        cur = cur[k];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const handleApplyJSON = (field) => {
    try {
      const parsed = JSON.parse(jsonEditors[field] || '[]');
      setForm(prev => ({ ...prev, [field]: parsed }));
      setErrors(prev => ({ ...prev, [field]: null }));
      alert(`${field} aplicado no formulário`);
    } catch (e) {
      setErrors(prev => ({ ...prev, [field]: e.message }));
    }
  };

  const handleSave = () => {
    setContent(form);
    alert('Conteúdo salvo (localStorage)');
  };

  const handleReset = () => {
    if (confirm('Restaurar conteúdo padrão?')) {
      reset();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Painel Administrativo</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="game-card p-4">
          <h3 className="font-semibold mb-3">Identidade</h3>
          <label className="block text-sm mb-1">Nome do app</label>
          <input className="w-full p-2 border rounded mb-3" value={form.appName || ''} onChange={(e) => onChange('appName', e.target.value)} />
          <label className="block text-sm mb-1">URL do logo (opcional)</label>
          <input className="w-full p-2 border rounded" value={form.logoUrl || ''} onChange={(e) => onChange('logoUrl', e.target.value)} />
        </div>

        <div className="game-card p-4">
          <h3 className="font-semibold mb-3">Navegação</h3>
          {['home','quiz','achievements','challenges'].map(id => (
            <div key={id} className="mb-3">
              <label className="block text-sm mb-1">{id} label</label>
              <input className="w-full p-2 border rounded" value={(form.navLabels && form.navLabels[id]) || ''} onChange={(e) => onChange(`navLabels.${id}`, e.target.value)} />
            </div>
          ))}
        </div>

        <div className="game-card p-4 md:col-span-2">
          <h3 className="font-semibold mb-3">Página Inicial</h3>
          <label className="block text-sm mb-1">Título</label>
          <input className="w-full p-2 border rounded mb-2" value={(form.home && form.home.title) || ''} onChange={(e) => onChange('home.title', e.target.value)} />
          <label className="block text-sm mb-1">Texto introdutório</label>
          <textarea className="w-full p-2 border rounded mb-2" value={(form.home && form.home.intro) || ''} onChange={(e) => onChange('home.intro', e.target.value)} />
          <label className="block text-sm mb-1">URL imagem hero</label>
          <input className="w-full p-2 border rounded" value={(form.home && form.home.heroImage) || ''} onChange={(e) => onChange('home.heroImage', e.target.value)} />
        </div>

        {/* Biblioteca removida */}

        {/* Quick editors: levels, missions, achievements, impact */}
        <div className="game-card p-4 md:col-span-2">
          <h3 className="font-semibold mb-3">Editar nomes rápidos</h3>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Níveis</h4>
            {(form.levels || []).map((lvl, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <div className="w-10">Nivel {lvl.level}</div>
                <input className="flex-1 p-2 border rounded" value={lvl.name || ''} onChange={(e) => {
                  const next = { ...form };
                  next.levels = (next.levels || []).map((l,i) => i===idx ? { ...l, name: e.target.value } : l);
                  setForm(next);
                }} />
                <input className="w-24 p-2 border rounded" value={lvl.pointsRequired || 0} onChange={(e) => {
                  const v = parseInt(e.target.value || '0', 10);
                  const next = { ...form };
                  next.levels = (next.levels || []).map((l,i) => i===idx ? { ...l, pointsRequired: v } : l);
                  setForm(next);
                }} />
              </div>
            ))}
            <div className="mt-2">
              <Button onClick={() => {
                const next = { ...form };
                next.levels = [ ...(next.levels || []), { level: (next.levels || []).length + 1, name: 'Novo nível', pointsRequired: 0 } ];
                setForm(next);
              }}>Adicionar Nível</Button>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Missões (títulos)</h4>
            {(form.dailyMissions || []).map((m, idx) => (
              <div key={m.id || idx} className="flex items-center space-x-2 mb-2">
                <input className="flex-1 p-2 border rounded" value={m.title || ''} onChange={(e) => {
                  const next = { ...form };
                  next.dailyMissions = (next.dailyMissions || []).map((x,i) => i===idx ? { ...x, title: e.target.value } : x);
                  setForm(next);
                }} />
                <Button variant="outline" onClick={() => {
                  const next = { ...form };
                  next.dailyMissions = (next.dailyMissions || []).filter((_,i) => i!==idx);
                  setForm(next);
                }}>Remover</Button>
              </div>
            ))}
            <div>
              <Button onClick={() => {
                const next = { ...form };
                const nextId = Date.now();
                next.dailyMissions = [ ...(next.dailyMissions || []), { id: nextId, title: 'Nova Missão', points: 10, completed: false, icon: 'Droplets' } ];
                setForm(next);
              }}>Adicionar Missão</Button>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2">Conquistas (nomes)</h4>
            {(form.achievements || []).map((a, idx) => (
              <div key={a.id || idx} className="flex items-center space-x-2 mb-2">
                <input className="flex-1 p-2 border rounded" value={a.name || ''} onChange={(e) => {
                  const next = { ...form };
                  next.achievements = (next.achievements || []).map((x,i) => i===idx ? { ...x, name: e.target.value } : x);
                  setForm(next);
                }} />
                <Button variant="outline" onClick={() => {
                  const next = { ...form };
                  next.achievements = (next.achievements || []).filter((_,i) => i!==idx);
                  setForm(next);
                }}>Remover</Button>
              </div>
            ))}
            <div>
              <Button onClick={() => {
                const next = { ...form };
                next.achievements = [ ...(next.achievements || []), { id: Date.now(), name: 'Nova Conquista', description: '', icon: 'Star', unlocked: false } ];
                setForm(next);
              }}>Adicionar Conquista</Button>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Impacto</h4>
            <label className="block text-sm mb-1">Título</label>
            <input className="w-full p-2 border rounded mb-2" value={(form.home && form.home.impactTitle) || ''} onChange={(e) => onChange('home.impactTitle', e.target.value)} />
            <label className="block text-sm mb-1">Texto</label>
            <input className="w-full p-2 border rounded" value={(form.home && form.home.impactText) || ''} onChange={(e) => onChange('home.impactText', e.target.value)} />
          </div>
        </div>

        <div className="game-card p-4 md:col-span-2">
          <h3 className="font-semibold mb-3">Áreas de Estudo</h3>
          {(form.studyAreas || []).map((s, idx) => (
            <div key={s.id || idx} className="mb-3 border-b pb-2">
              <div className="flex items-center space-x-2 mb-2">
                <input className="flex-1 p-2 border rounded" value={s.title || ''} onChange={(e) => {
                  const next = { ...form };
                  next.studyAreas = (next.studyAreas || []).map((x,i) => i===idx ? { ...x, title: e.target.value } : x);
                  setForm(next);
                }} />
                <input className="w-32 p-2 border rounded" value={s.lessons || 0} onChange={(e) => {
                  const v = parseInt(e.target.value || '0', 10);
                  const next = { ...form };
                  next.studyAreas = (next.studyAreas || []).map((x,i) => i===idx ? { ...x, lessons: v } : x);
                  setForm(next);
                }} />
                <Button variant="outline" onClick={() => {
                  const next = { ...form };
                  next.studyAreas = (next.studyAreas || []).filter((_,i) => i!==idx);
                  setForm(next);
                }}>Remover</Button>
              </div>
              <div>
                <label className="block text-sm mb-1">Descrição</label>
                <input className="w-full p-2 border rounded" value={s.description || ''} onChange={(e) => {
                  const next = { ...form };
                  next.studyAreas = (next.studyAreas || []).map((x,i) => i===idx ? { ...x, description: e.target.value } : x);
                  setForm(next);
                }} />
              </div>
              <div className="mt-2">
                <label className="block text-sm mb-1">Título do Certificado</label>
                <input className="w-full p-2 border rounded" value={s.certificateTitle || ''} onChange={(e) => {
                  const next = { ...form };
                  next.studyAreas = (next.studyAreas || []).map((x,i) => i===idx ? { ...x, certificateTitle: e.target.value } : x);
                  setForm(next);
                }} />
              </div>
            </div>
          ))}
          <div>
            <Button onClick={() => {
              const next = { ...form };
              next.studyAreas = [ ...(next.studyAreas || []), { id: `area-${Date.now()}`, title: 'Nova Área', description: '', lessons: 1, hasQuiz: false, certificateTitle: 'Certificado' } ];
              setForm(next);
            }}>Adicionar Área</Button>
          </div>
        </div>

        {/* JSON editors for lists (full width) */}
        {['dailyMissions','quizQuestions','preventionTips','achievements','games','challenges','levels','studyAreas'].map(field => (
          <div key={field} className="game-card p-4 md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{field}</h3>
              <div className="text-sm text-red-500">{errors[field] && `Erro: ${errors[field]}`}</div>
            </div>
            <textarea
              className="w-full h-48 p-2 border rounded font-mono text-sm"
              value={jsonEditors[field] || ''}
              onChange={(e) => setJsonEditors(prev => ({ ...prev, [field]: e.target.value }))}
            />
            <div className="mt-2 flex space-x-2">
              <Button onClick={() => handleApplyJSON(field)}>Aplicar JSON</Button>
              <Button variant="outline" onClick={() => setJsonEditors(prev => ({ ...prev, [field]: JSON.stringify(form[field] || [], null, 2) }))}>Recarregar</Button>
            </div>
          </div>
        ))}

      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button onClick={handleSave}>Salvar alterações</Button>
        <Button variant="outline" onClick={handleReset}>Restaurar padrão</Button>
      </div>
    </div>
  );
}

export default AdminView;
