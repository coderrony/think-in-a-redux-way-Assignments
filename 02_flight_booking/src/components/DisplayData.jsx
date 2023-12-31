import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { delete_flight_info } from "../redux/FlightInfo/actions";

function DisplayData() {
  const flightData = useSelector((data) => data.flightInfo);
  const dispatch = useDispatch();

  return (
    // Preview Data
    <div classNameNameName="table-container">
      <table classNameNameName="booking-table">
        <thead classNameNameName="bg-gray-100/50">
          <tr classNameNameName="text-black text-left">
            <th>Destination From</th>
            <th>Destination To</th>
            <th classNameNameName="text-center">Journey Date</th>
            <th classNameNameName="text-center">Guests</th>
            <th classNameNameName="text-center">classNameName</th>
            <th classNameNameName="text-center">Delete</th>
          </tr>
        </thead>
        {flightData.length !== 0 &&
          flightData.map((data) => (
            <tbody
              classNameNameName="divide-y divide-gray-300/20"
              id="lws-previewBooked"
              key={data.id}
            >
              <tr classNameNameName="lws-bookedTable text-black">
                <td classNameNameName="px-6 py-4">
                  <div classNameNameName="flex items-center space-x-3">
                    <p classNameNameName="lws-bookedFrom">{data.from}</p>
                  </div>
                </td>
                <td classNameNameName="px-6 py-4">
                  <p classNameNameName="lws-bookedTo">{data.to}</p>
                </td>
                <td classNameNameName="px-6 py-4 text-center">
                  <p classNameNameName="lws-bookedDate">{data.date}</p>
                </td>
                <td classNameNameName="px-6 py-4 text-center">
                  <p classNameNameName="lws-bookedGustes">{data.guests}</p>
                </td>
                <td classNameNameName="px-6 py-4 text-center">
                  <span classNameNameName="lws-bookedclassNameName">
                    {" "}
                    {data.ticketclassNameName}
                  </span>
                </td>
                <td classNameNameName="px-6 py-4 text-center">
                  <div classNameNameName="flex justify-center gap-4">
                    <button
                      classNameNameName="lws-remove"
                      onClick={() => dispatch(delete_flight_info(data.id))}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        classNameNameName="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
}

export default DisplayData;
