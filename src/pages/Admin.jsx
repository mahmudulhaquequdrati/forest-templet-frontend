import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function Admin() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:5000/api/forest");
      const locationData = await response.data;
      setInfo(locationData?.data);
    };
    getData();
  }, []);

  const handleSolve = (dt, type) => {
    if (type === "solved") {
      const updatedData = {
        ...dt,
        status: "solved",
      };
      axios
        .put(`http://localhost:5000/api/update/${dt?._id}`, updatedData)
        .then((res) => {
          const data = res.data;

          axios.get("http://localhost:5000/api/forest").then((res) => {
            setInfo(res?.data?.data);
          });
        });
    } else {
      const updatedData = {
        ...dt,
        approve: true,
      };
      axios
        .put(`http://localhost:5000/api/update/${dt?._id}`, updatedData)
        .then((res) => {
          const data = res.data;
          axios.get("http://localhost:5000/api/forest").then((res) => {
            setInfo(res?.data?.data);
          });
        });
    }
  };
  return (
    <div>
      <Header />

      <div className="max-w-[85rem] mx-auto mt-16 px-12 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {info?.length
          ? info?.map((dt, i) => {
              return (
                <div
                  key={i}
                  class="max-w-sm bg-white border border-gray-200 rounded-lg shadow "
                >
                  {dt?.img && (
                    <img
                      class="rounded-t-lg w-full"
                      src={`http://localhost:5000/${dt.img}`}
                      alt=""
                    />
                  )}
                  {dt?.video && (
                    <video width="640" height="360" controls>
                      <source
                        src={`http://localhost:5000/${dt?.video}`}
                        type="video/mp4"
                      />
                    </video>
                  )}
                  <div class="p-5">
                    <div class="mb-2 text-2xl font-semibold tracking-tight text-gray-800 ">
                      <p className="text-lg font-medium text-gray-700  ">
                        Problem Type:
                      </p>
                      <br />
                      {dt?.reportType?.map((m, i) => {
                        return (
                          <span key={i} className="block my-0.5">
                            {i === dt?.reportType?.length - 1 ? m : `${m},`}
                          </span>
                        );
                      })}
                    </div>
                    <p class="mb-2 mt-6 font-normal text-gray-700 ">
                      Where it happend: {dt?.address?.address}
                    </p>
                    <p class="mb-2 font-normal text-gray-700">
                      User : {dt?.name}
                    </p>
                    <p class="mb-2 font-normal text-gray-700">
                      Date : {dt?.date}
                    </p>
                    <p class="mb-2 font-normal text-gray-700">
                      Email : {dt?.email}
                    </p>
                    <p class="mb-8 font-normal text-gray-700">
                      Status : {dt?.status}
                    </p>

                    <div className="flex gap-4">
                      {dt?.approve === false ? (
                        <button
                          class="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                          onClick={() => handleSolve(dt, "add")}
                        >
                          Add To Map
                        </button>
                      ) : (
                        <button
                          className="
                      
                      inline-flex items-center px-6 py-2 uppercase text-blue-500 font-medium text-center rounded-md  border
                      "
                        >
                          Approved
                        </button>
                      )}
                      {dt?.status !== "solved" ? (
                        <button
                          class="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-md hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 "
                          onClick={() => handleSolve(dt, "solved")}
                        >
                          Mark it Solved
                        </button>
                      ) : (
                        <button
                          className="
                      
                      inline-flex items-center px-6 py-2 uppercase text-green-500 font-medium text-center rounded-md  border
                      "
                        >
                          solved
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
