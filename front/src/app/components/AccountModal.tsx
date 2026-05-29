import * as React from "react";
import { authAPI } from "../api/api";

export function AccountModal({ 
  open, 
  onClose, 
  onLogin 
}: { 
  open: boolean; 
  onClose: () => void; 
  onLogin?: (token: string, user: any) => void;
}) {
  const [mode, setMode] = React.useState<'login' | 'register'>('register');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (onLogin) onLogin(response.token, response.user);
        onClose();
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Error logging in');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.register(name, email, password);
      
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        if (onLogin) onLogin(response.token, response.user);
        onClose();
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Error registering');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card text-card-foreground rounded-lg w-96 p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-muted-foreground">✕</button>
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 py-2 cursor-pointer ${mode === 'login' ? 'border-b-2 border-[#588157]' : ''}`}
            onClick={() => setMode('login')}
          >Войти</button>
          <button
            className={`flex-1 py-2 cursor-pointer ${mode === 'register' ? 'border-b-2 border-[#588157]' : ''}`}
            onClick={() => setMode('register')}
          >Регистрация</button>
        </div>

        {error && <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">{error}</div>}

        {mode === 'register' ? (
          <form className="space-y-3" onSubmit={handleRegister}>
            <input 
              type="text" 
              placeholder="Имя" 
              className="w-full border px-2 py-1 rounded" 
              style={{borderColor: '#588157'}}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full border px-2 py-1 rounded" 
              style={{borderColor: '#588157'}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Пароль" 
              className="w-full border px-2 py-1 rounded" 
              style={{borderColor: '#588157'}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="w-full bg-[#588157] text-[#DAD7CD] py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Зарегистрироваться'}
            </button>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full border px-2 py-1 rounded" 
              style={{borderColor: '#588157'}}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Пароль" 
              className="w-full border px-2 py-1 rounded" 
              style={{borderColor: '#588157'}}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="w-full bg-[#588157] text-[#DAD7CD] py-2 rounded disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Загрузка...' : 'Войти'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
