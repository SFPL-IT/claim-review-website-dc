import React from 'react';
import { applyMiddleware, createStore, compose } from 'redux'
import GetReview from './getReview/GetReview';
// import Background from './background.jpg';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

function App() {
  return (
  	 <Provider store={store}>
        <div className="overwapper">
        </div>
          <div className="background">
          <GetReview/>
          </div>

    </Provider>

  );
}

export default App;
