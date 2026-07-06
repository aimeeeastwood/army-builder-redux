import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="p-4 bg-gray-800 text-white">
        <h1 className="text-2xl font-bold">Army Builder</h1>
      </header>

      <main className="p-4">
        <Outlet />
      </main>

      <footer className="p-4 text-center text-gray-500">
        © 2061 Demon Kitty Games
      </footer>
    </>
  )
}
