import { DELETE, ADD } from "./actionType";

export function add_flight_info(data) {
  return {
    type: ADD,
    payload: data,
  };
}
export function delete_flight_info(id) {
  return {
    type: DELETE,
    payload: id,
  };
}
