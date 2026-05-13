import Card from "./components/Card";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-linear-to-r from-sky-300 to-cyan-100">
      <Card
        title={<h2 className="text-lg font-semibold text-zinc-800">This is a technical proof</h2>}
        footer={
          <>
            <button className="px-4 py-2 rounded-lg text-blue-800 border border-blue-800 text-sm ">
              Undo
            </button>
            <button className="px-4 py-2 rounded-lg border border-blue-800 text-sm text-blue-800">
              Add
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-800 text-white text-sm">
              Delete
            </button>
          </>
        }
      >
        <p className="text-zinc-500 text-sm">Your TODO list goes here.</p>
      </Card>
    </main>
  );
}
