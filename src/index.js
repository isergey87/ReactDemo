import React from "react";
import ReactDOM from "react-dom";
import Widget from "./Widget/Widget";


ReactDOM.render(<Widget
  updateInterval={15000}
  //url={"http://api.massrelevance.com/MassRelDemo/kindle.json"}
  //url={"http://api.massrelevance.com/MassRelDemo/all-networks.json"}
  url={"http://api.massrelevance.com/MassRelDemo/-nab2015.json"}
  numberParam={"limit"}
  numberOfPosts={3}
/>, document.getElementById("root"));
