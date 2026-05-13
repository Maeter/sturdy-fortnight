import Card from './components/Card'

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-linear-to-r from-sky-300 to-cyan-100">
      <Card
        title={
          <h2 className="text-lg font-semibold text-zinc-800">
            This is a technical proof
          </h2>
        }
        footer={
          <>
            <button className="rounded-lg border border-blue-800 px-4 py-2 text-sm text-blue-800">
              Undo
            </button>
            <button className="rounded-lg border border-blue-800 px-4 py-2 text-sm text-blue-800">
              Add
            </button>
            <button className="rounded-lg bg-blue-800 px-4 py-2 text-sm text-white">
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-zinc-500">Your TODO list goes here.</p>
      </Card>
    </main>
  )
}
