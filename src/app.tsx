import { Redirect, Route, Switch } from 'wouter'
import { Navbar } from './components/navbar'
import { Calculator } from './pages/calculator'
import { Repair } from './pages/repair'

export function App() {
  return (
    <>
      <Navbar />

      <Switch>
        <Route path="/" component={Calculator} />
        <Route path="/repair" component={Repair} />

        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  )
}
