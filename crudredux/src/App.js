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

function App() {
  return (
    <Router>
      {/* <CssBaseline /> */}
      <Header />
      {/* <ScopedCssBaseline> */}
      <Container maxWidth="xl">
        <Provider store={store}>
          <Switch>
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/usuarios" component={Usuarios} />
            <Route exact path="/" component={EditarProducto} />
          </Switch>
        </Provider>
      </Container>
      {/* </ScopedCssBaseline> */}
    </Router>
  );
}

export default App;
