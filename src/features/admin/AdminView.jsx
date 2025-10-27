import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';

function AdminView() {
  const { content, setContent, reset } = useContent();
  const [form, setForm] = useState(content);

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

  const handleSave = () => {
    setContent(form);
    alert('Conteúdo salvo (localStorage)');
  };

  const handleReset = () => {
    if (confirm('Restaurar conteúdo padrão?')) {
      reset();
      setForm({});
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Painel Administrativo</h2>

      <div className="game-card p-4">
        <h3 className="font-semibold mb-3">Identidade</h3>
        <label className="block text-sm">Nome do app</label>
        <input className="w-full p-2 border rounded mb-3" value={form.appName || ''} onChange={(e) => onChange('appName', e.target.value)} />
        <label className="block text-sm">URL do logo (opcional)</label>
        <input className="w-full p-2 border rounded mb-3" value={form.logoUrl || ''} onChange={(e) => onChange('logoUrl', e.target.value)} />
      </div>

      <div className="game-card p-4">
        <h3 className="font-semibold mb-3">Navegação</h3>
        {['home','quiz','map','achievements','games','knowledge','challenges'].map(id => (
          <div key={id} className="mb-2">
            <label className="block text-sm">{id} label</label>
            <input className="w-full p-2 border rounded" value={(form.navLabels && form.navLabels[id]) || ''} onChange={(e) => onChange(`navLabels.${id}`, e.target.value)} />
          </div>
        ))}
      </div>

      <div className="game-card p-4">
        <h3 className="font-semibold mb-3">Página Inicial</h3>
        <label className="block text-sm">Título</label>
        <input className="w-full p-2 border rounded mb-2" value={(form.home && form.home.title) || ''} onChange={(e) => onChange('home.title', e.target.value)} />
        <label className="block text-sm">Texto introdutório</label>
        <textarea className="w-full p-2 border rounded mb-2" value={(form.home && form.home.intro) || ''} onChange={(e) => onChange('home.intro', e.target.value)} />
        <label className="block text-sm">URL imagem hero</label>
        <input className="w-full p-2 border rounded" value={(form.home && form.home.heroImage) || ''} onChange={(e) => onChange('home.heroImage', e.target.value)} />
      </div>

      <div className="game-card p-4">
        <h3 className="font-semibold mb-3">Biblioteca / 3D</h3>
        <label className="block text-sm">URL do vídeo (embed)</label>
        <input className="w-full p-2 border rounded mb-2" value={(form.knowledge && form.knowledge.videoUrl) || ''} onChange={(e) => onChange('knowledge.videoUrl', e.target.value)} />
        <label className="block text-sm">Caminho/URL do modelo 3D (.glb)</label>
        <input className="w-full p-2 border rounded" value={(form.knowledge && form.knowledge.modelPath) || ''} onChange={(e) => onChange('knowledge.modelPath', e.target.value)} />
      </div>

      <div className="flex space-x-3">
        <Button onClick={handleSave}>Salvar alterações</Button>
        <Button variant="outline" onClick={handleReset}>Restaurar padrão</Button>
      </div>
    </div>
  );
}

export default AdminView;
