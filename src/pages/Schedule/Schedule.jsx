import { useContext, useEffect, useState } from "react";
import ScheduleTable from "../../components/SchedleTable";
import Swal from "sweetalert2";
import { AuthContext } from "../../authprovider/AuthProvider";

const Schedule = () => {
  const {clientData, setClientData} = useContext(AuthContext)
  const [search, setSearch] = useState("")
  console.log(search);

  useEffect(() => {
    fetch(`http://localhost:3000/schedule?searchParams=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setClientData(data);
      });
  }, [setClientData, search]);

  const handleDeleteData = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/schedule/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              console.log("after deleted data response", data);
              const remainingClient = clientData.filter(remaining => remaining._id != id)
              setClientData(remainingClient)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <>
      <div className="w-[400px] mx-auto mb-4">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="search"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="w-1/2 mx-auto bg-slate-50">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>serial</th>
                <th>Title</th>
                <th>Day</th>
                <th>Date</th>
                <th>Time</th>
                <th>Auction</th>
              </tr>
            </thead>
            <tbody>
              {clientData.map((client, index) => (
                <ScheduleTable
                  key={client._id}
                  client={client}
                  index={index}
                  handleDeleteData={handleDeleteData}
                ></ScheduleTable>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Schedule;
