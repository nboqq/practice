import * as React from "react";

export function AccountModal({ open, onClose, onLogin }: { open: boolean; onClose: () => void; onLogin?: () => void }) {
  const [mode, setMode] = React.useState<'login' | 'register'>('register');
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement real login logic
    if (onLogin) onLogin();
    else onClose();
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement registration logic
    onClose();
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
        {mode === 'register' ? (
          <form className="space-y-3" onSubmit={handleRegister}>
            <input type="text" placeholder="Имя" className="w-full border px-2 py-1 rounded" style={{borderColor: '#588157'}} />
            <input type="email" placeholder="Email" className="w-full border px-2 py-1 rounded" style={{borderColor: '#588157'}} />
            <input type="password" placeholder="Пароль" className="w-full border px-2 py-1 rounded" style={{borderColor: '#588157'}} />
            <button type="submit" className="w-full bg-[#588157] text-[#DAD7CD] py-2 rounded">Зарегистрироваться</button>
          </form>
        ) : (
          <form className="space-y-3" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className="w-full border px-2 py-1 rounded" style={{borderColor: '#588157'}} />
            <input type="password" placeholder="Пароль" className="w-full border px-2 py-1 rounded" style={{borderColor: '#588157'}} />
            <button type="submit" className="w-full bg-[#588157] text-[#DAD7CD] py-2 rounded">Войти</button>
          </form>
        )}
      </div>
    </div>
  );
}
