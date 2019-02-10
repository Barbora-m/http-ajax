import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorization"] = "AUTH TOKEN";
axios.defaults.headers.post["Content-Type"] = "application/json";

/*(kdyz nechci psat dlouhou url adresu ale jen /posts)
we can use axios and there access to default s object to set up defaults object to set up defaults which are true for all requests which are being sent. 
And there we can define a baseURL and this URL will now be used as a baseURL to which the other paths are then simply appended.
We can also access defaults headers and there set a common header, so on that common object of authorization , common headers are simply the general
headers which are set for all types of requests, and there you could set this to your auth token if you had one or whatever that is. 
we can also set headers just for specific request types, like for post requests only where you maybe want to set the content type you are sending to 
application.json, which you don't need to, that's the default anyways, just ot show this.
*/

axios.interceptors.request.use(
  request => {
    console.log(request);
    // Edit request config
    return request;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
/*it will affect all requests sent from anywhere in your app, I will use use() to register a new interceptor, that interceptor takes a function as an input
which receives the config (the request), in the interceptor function here I need to always return the request or the request config, otherwise you are blocking
the request. I can also edit the request config before I return it, that's the idea behind the interceptor, you can add headers etc. I can also pass a second
function besides that request configuration changing function, I can add a function which handles any errors, I should also return promise.reject(error) here
though so that I still forward to my request as I wrote it in a component where we can handle it again with the catch method, this makes sense if youhave some
local task you want to do like show something on the UI but also globally, you want to log it in the log file which you send to a server or something like that.*/

axios.interceptors.response.use(
  response => {
    console.log(response);
    // Edit request config
    return response;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
