import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';

// import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import Usuarios from './components/Users/Usuarios';
import { Container, CssBaseline } from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { Footer } from './components/Footer';

function App() {
  return (
    <Router>
      {/* <CssBaseline /> */}
      <Header />
      {/* <ScopedCssBaseline> */}
      <main class="flex-shrink-0">
        <Container maxWidth="lg">
          <Provider store={store}>
            <Switch>
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/usuarios" component={Usuarios} />
              <Route exact path="/" component={EditarProducto} />
            </Switch>
          </Provider>
        </Container>
      </main>
      <Footer />
      {/* </ScopedCssBaseline> */}
    </Router>
  );
}

export default App;
