import { BrowserRouter } from "react-router-dom";
import PageHeader from "./components/PageHeader";
import PageNavigator from "./PageNavigator";
import { Provider } from "react-redux";
import { store } from "./Store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PageHeader />
        <PageNavigator />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
