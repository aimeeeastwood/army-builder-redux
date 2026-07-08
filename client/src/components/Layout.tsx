import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 bg-zinc-950 p-4">
        <h1 className="text-3xl font-bold">Kairos Army Builder</h1>
        <p className="text-sm text-zinc-400">Demon Kitty Games • 2061</p>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800 p-4 text-center text-sm text-zinc-500">
        © 2061 Demon Kitty Games
      </footer>
    </div>
  )
}
