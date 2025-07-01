import { Redirect, Route, Router, Switch } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { Navbar } from './components/navbar'
import { Calculator } from './pages/calculator'
import { CalculatorDs2 } from './pages/calculator-ds2'
import { Repair } from './pages/repair'

export function App() {
  return (
    <>
      <Navbar />

      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Calculator} />
          <Route path="/ds2" component={CalculatorDs2} />
          <Route path="/repair" component={Repair} />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
