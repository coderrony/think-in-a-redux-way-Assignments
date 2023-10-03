import { createStore } from "redux";
import flightReducer from "./FlightInfo/flightReducer";

const store = createStore(flightReducer);

export default store;
