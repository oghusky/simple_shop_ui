import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/Raleway-Black.ttf'
import './fonts/Raleway-Bold.ttf'
import './fonts/Raleway-ExtraBold.ttf'
import './fonts/Raleway-ExtraLight.ttf'
import './fonts/Raleway-ExtraLightItalic.ttf'
import './fonts/Raleway-Italic.ttf'
import './fonts/Raleway-Light.ttf'
import './fonts/Raleway-Medium.ttf'
import './fonts/Raleway-MediumItalic.ttf'
import './fonts/Raleway-Regular.ttf'
import './fonts/Raleway-Thin.ttf'
import './fonts/Raleway-ThinItalic.ttf'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
