import { useState } from "react";

import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router-dom";
import { formatTime12Hour } from "../../Utitlites/formatTime12Hour";
import Swal from "sweetalert2";

const UpdateSchedule = () => {
  const data = useLoaderData()
  console.log(data);
  const [title, setTitle] = useState(data?.title)
  const [date, setDate] = useState(data?.formattedDate)
  const [day, setDay] = useState(data?.day)
  const [hour, setHour] = useState(data.formatHour)

  console.log(data);
  const handleUpdateSchedule = (e) => {
    e.preventDefault()
    const updateData = {
      title: title,
      day:day,
      hour: hour,
      data:date,
    }
    console.log(updateData);

        fetch(`http://localhost:3000/schedule/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Successfully added",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log("after added response", data);
            }
          });
  };
  return (
    <div>
      <div className="bg-[#F4F3F0] lg:p-24">
        <h2 className="text-3xl text-center font-bold">Update Gym Schedule</h2>
        <form onSubmit={handleUpdateSchedule}>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                name="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Day</span>
              </label>
              <DatePicker value={date} onChange={(date) => setDate(date.toLocaleDateString("en-CA"))} className="input input-bordered w-full" />
            </div>
          </div>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Day</span>
              </label>

              <select className="input input-bordered" value={day} onChange={(e) => setDay(e.target.value)} name="day" id="day">
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Time</span>
              </label>

              <DatePicker
                className="input input-bordered w-full"
                value={hour}
                onChange={(date) => setHour(formatTime12Hour(date))}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>

          {/* End of Labels */}
          <input
            type="submit"
            value="Update Schedule"
            className="btn w-full bg-pink-500 text-white mt-6"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateSchedule;
