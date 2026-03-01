export default function ManagerLayout({ children }) {
  return (
    <div>
      <nav className="bg-green-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Manager Portal</h1>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
