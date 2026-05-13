import Card from './components/Card'
import TodoFooter from './components/TodoFooter'

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center bg-linear-to-r from-sky-300 to-cyan-100">
      <Card
        className="m-8"
        title={
          <h2 className="text-lg font-semibold text-zinc-800">
            This is a technical proof
          </h2>
        }
        footer={<TodoFooter />}
      >
        <p className="text-center text-sm text-zinc-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco.
        </p>
      </Card>
    </main>
  )
}
