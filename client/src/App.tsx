import { trpc } from './lib/trpc'

function App() {
  const { isLoading } = trpc.getTest.useQuery()
  let fa = 34
  let fa2 = 'Fas'
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
