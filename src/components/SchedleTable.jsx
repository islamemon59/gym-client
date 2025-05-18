import { FaFile, FaTrash } from "react-icons/fa";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import { Link } from "react-router-dom";

const ScheduleTable = ({ client, index, handleDeleteData }) => {
  const { _id, title, formattedDate, day, formatHour } = client;

  const handleComplete = () => {
    fetch(`https://gym-server-coral.vercel.app/schedule/${_id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({})
    })
    .then(res => res.json())
    .then(data => {
      console.log("after updated data", data);
    })
  }

  return (
    <>
      <tr>
        <td>{index + 1}</td>
        <td>{title}</td>
        <td>{day}</td>
        <td>{formattedDate}</td>
        <td>{formatHour}</td>
        <td>
          <div className="flex gap-4">
            {" "}
            <button
              onClick={() =>handleDeleteData(_id)}
              className="bg-pink-500 px-4 py-2 rounded text-white"
            >
              <FaTrash className=""></FaTrash>
            </button>
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              <Link to={`/update/${_id}`}>
                {" "}
                <FaFile />
              </Link>
            </button>
            <button onClick={handleComplete} className="bg-pink-500 px-4 py-2 rounded text-white">
              {client?.isCompleted ? <MdOutlineDoneAll /> : <MdDone />}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ScheduleTable;
