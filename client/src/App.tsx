import { trpc } from './lib/trpc'

function App() {
  const { isLoading } = trpc.getTest.useQuery()
  const fa = 34
  if (fa) {
    console.log(':DFa')
  }
  return (
    <div>
      {isLoading ? 'Is loading' : null}
      <h1>Hello world</h1>
    </div>
  )
}

export default App
