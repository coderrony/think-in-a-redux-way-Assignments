import React from "react";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";
import { add_flight_info } from "../redux/FlightInfo/actions";
import icon from "../assets/img/icons/Frame.svg";
import icon2 from "../assets/img/icons/Vector (1).svg";
import icon3 from "../assets/img/icons/Vector (3).svg";

function InputData() {
  const flightDataLength = useSelector((data) => data.flightInfo.length);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(nanoid());
    // input data
    const data = new FormData(e.currentTarget);
    const currentData = {
      id: nanoid(),
      from: data.get("from"),
      to: data.get("to"),
      date: data.get("date"),
      guests: data.get("guests"),
      ticketClass: data.get("ticketClass"),
    };
    dispatch(add_flight_info(currentData));

    document.querySelector(".lws-inputform").reset();
  };

  return (
    <section>
      {/* Input Data */}
      <div className="mt-[160px] mx-4 md:mt-[160px] relative">
        <div className="bg-white rounded-md max-w-6xl w-full mx-auto">
          <form className="first-hero lws-inputform" onSubmit={handleSubmit}>
            {/* From */}
            <div className="des-from">
              <p>Destination From</p>
              <div className="flex flex-row">
                <img src={icon} alt="" />
                <select
                  className="outline-none px-2 py-2 w-full"
                  name="from"
                  id="lws-from"
                  required
                >
                  <option value="" hidden>
                    Please Select
                  </option>
                  <option>Dhaka</option>
                  <option>Sylhet</option>
                  <option>Saidpur</option>
                  <option>Cox's Bazar</option>
                </select>
              </div>
            </div>

            {/* To */}
            <div className="des-from">
              <p>Destination To</p>
              <div className="flex flex-row">
                <img src={icon} alt="" />
                <select
                  className="outline-none px-2 py-2 w-full"
                  name="to"
                  id="lws-to"
                  required
                >
                  <option value="" hidden>
                    Please Select
                  </option>
                  <option>Dhaka</option>
                  <option>Sylhet</option>
                  <option>Saidpur</option>
                  <option>Cox's Bazar</option>
                </select>
              </div>
            </div>

            {/* Date */}
            <div className="des-from">
              <p>Journey Date</p>
              <input
                type="date"
                className="outline-none px-2 py-2 w-full date"
                name="date"
                id="lws-date"
                required
              />
            </div>

            {/* Guests */}
            <div className="des-from">
              <p>Guests</p>
              <div className="flex flex-row">
                <img src={icon2} alt="" />
                <select
                  className="outline-none px-2 py-2 w-full"
                  name="guests"
                  id="lws-guests"
                  required
                >
                  <option value="" hidden>
                    Please Select
                  </option>
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                </select>
              </div>
            </div>

            {/* className */}
            <div className="des-from !border-r-0">
              <p>Class</p>
              <div className="flex flex-row">
                <img src={icon3} alt="" />
                <select
                  className="outline-none px-2 py-2 w-full"
                  name="ticketClass"
                  id="lws-ticketClass"
                  required
                >
                  <option value="" hidden>
                    Please Select
                  </option>
                  <option>Business</option>
                  <option>Economy</option>
                </select>
              </div>
            </div>

            {flightDataLength !== 3 ? (
              <button className="addCity" type="submit" id="lws-addCity">
                <svg
                  style={{
                    width: "15px",
                    height: "15px",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "2",
                    stroke: "currentColor",
                  }}
                ></svg>
                ➕<span className="text-sm">Book</span>
              </button>
            ) : (
              <button
                className="addCity"
                type="submit"
                id="lws-addCity"
                disabled
              >
                <svg
                  style={{
                    width: "15px",
                    height: "15px",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    strokeWidth: "2",
                    stroke: "currentColor",
                  }}
                ></svg>
                ❌<span className="text-sm">Disable</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default InputData;
