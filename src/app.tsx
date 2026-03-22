import { Redirect, Route, Router, Switch } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { Navbar } from './components/navbar'
import { CalculatorDS1 } from './pages/calculator-ds1'
import { CalculatorDS2 } from './pages/calculator-ds2'
import { Repair } from './pages/repair'

export function App() {
  return (
    <>
      <Navbar />

      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={CalculatorDS1} />
          <Route path="/DS2" component={CalculatorDS2} />
          <Route path="/repair" component={Repair} />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
