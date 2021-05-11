import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productos from './components/Productos';
import EditarProducto from './components/EditarProducto';

// import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/" component={EditarProducto} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
