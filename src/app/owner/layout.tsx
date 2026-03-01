export default function OwnerLayout({ children }) {
  return (
    <div>
      <nav className="bg-purple-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl font-bold">Owner Portal</h1>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  )
}
