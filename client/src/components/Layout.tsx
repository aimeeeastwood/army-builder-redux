import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="flex flex-col items-center">
      <header className="border-b border-zinc-800 p-6">
        <h1 className="text-center text-4xl font-bold tracking-wide">
          Kairos: The Fulcrum Wars
        </h1>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-800 p-4 text-center text-sm text-zinc-500">
        © 2061 Demon Kitty Games
      </footer>
    </div>
  )
}
