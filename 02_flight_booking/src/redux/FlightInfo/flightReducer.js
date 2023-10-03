import { ADD, DELETE } from "../FlightInfo/actionType";

const initialState = {
  flightInfo: [],
};
const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        flightInfo: [...state.flightInfo, action.payload],
      };
    case DELETE:
      return {
        ...state,
        flightInfo: state.flightInfo.filter(
          (data) => data.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default flightReducer;
