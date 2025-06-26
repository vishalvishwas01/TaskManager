import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [form, setForm] = useState("");
  const [list, setList] = useState([]);
  const [filters, setFilter] = useState("");
  const inputRef = useRef(null);
  const [editId, setEditId] = useState(null);
  const [filterType, setFilterType] = useState("All");

  const getText = async () => {
    const res = await fetch("http://localhost:3002");
    const Texts = await res.json();
    setList(Texts);
  };

  useEffect(() => {
    getText();
  }, []);

  const filteredList = list
    .filter((item) => item.text.toLowerCase().includes(filters.toLowerCase()))
    .filter((item) => {
      if (filterType === "Completed") return item.completed;
      if (filterType === "Pending") return !item.completed;
      return true;
    });

    const handleChange = (e) => {
      const value = e.target.value;
    
      if (value.length === 60) {
        toast.warn("You've reached the 60 character limit!");
      }
    
      setForm(value);
    };
    

  const handleAdd = async () => {
    if (editId) {
      if (form.length >= 3) {
        const updatedTask = { id: editId, text: form };
        setList(list.map((item) => (item.id === form.id ? newEntry : item)));
        await fetch("http://localhost:3002", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
        setEditId(null);

        toast.info('Edit Successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        toast.error('Minimum 3 character required', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
      }
    } else {
      if (form.length >= 3) {
        const updatedList = { text: form, id: uuidv4(), completed: false };
        setList([...list, updatedList]);
        await fetch("http://localhost:3002", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedList),
        });

        toast.success('Task added successfully', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        toast.error('Minimum 3 character required', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
         
          });
      }
    }
    getText();
    setForm("");
  };

  const handleToggle = (id) => {
    setList(
      list.map((value) =>
        value.id === id ? { ...value, completed: !value.completed } : value
      )
    );
  };

  const toggleCompleted = async (id, currentStatus) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !currentStatus } : item
    );
    setList(updatedList);

    await fetch("http://localhost:3002/toggle", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: !currentStatus }),
    });
  };

  const handleDelete = async (id) => {
    setList(list.filter((value) => value.id !== id));
    await fetch("http://localhost:3002", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    toast.warn('Deleted Successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const handleEdit = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    if (itemToEdit) {
      setForm(itemToEdit.text); // Set input box to task text
      setList(list.filter((value) => value.id !== id));
      setEditId(itemToEdit.id);
    }
  };

  const handleDeleteAll = async () => {
    setList([]);
    await fetch("http://localhost:3002/Delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}), // Empty body indicates delete all
    });
    toast.warn('All tasks deleted successfully', {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
  };
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />
      <div className="overflow-hidden flex flex-col justify-center items-center m-0 p-0">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

        <div className=" text-purple-400 font-bold text-4xl mt-20 comic-relief-regular comic-relief-bold">Task Manager</div>

        <div className="mt-10 rounded-4xl h-[700px] w-full flex flex-col items-center   max-w-[800px] p-4 border-2 border-amber-200">
          {/* adding task and searching section start */}
          <div className="w-full max-w-[800px] h-auto rounded-3xl m-5 flex flex-wrap flex-col gap-4  flex-none">
            <input
              ref={inputRef}
              onChange={handleChange}
              maxLength={60}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAdd();
                }
              }}
              value={form}
              placeholder="type your task here"
              type="text"
              className=" h-[50px] w-full rounded-2xl px-5 bg-gray-200 transition duration-300 ease-in-out border-2 border-white focus:border-purple-500 focus:shadow-md outline-none comic-relief-regular"
            />

            <div className="w-full flex flex-wrap gap-2.5 px-1">
              <input
                onChange={(e) => {
                  setFilter(e.target.value);
                }}
                value={filters}
                placeholder="Search your task"
                type="text"
                className="bg-gray-200 px-5  h-[50px] flex-1 min-w-[150] rounded-2xl transition duration-300 ease-in-out border-2 border-white focus:border-purple-500 focus:shadow-md outline-none comic-relief-regular"
              />
              <button
                onClick={handleAdd}
                className="bg-purple-400 h-[50px] px-4 rounded-2xl active:bg-purple-500 focus:outline-none transition duration-50 cursor-pointer comic-relief-regular"
              >
                Add Task
              </button>
            </div>
          </div>
          {/* adding task and searching section end */}

          {/* filter section start */}

          <div className="w-full h-auto flex justify-center items-center gap-5 p-4">
            <button
              onClick={() => {
                setFilterType("All");
              }}
              className="bg-purple-400 rounded-xl h-10 w-15 cursor-pointer active:bg-purple-500 focus:outline-none transition duration-50 comic-relief-regular"
            >
              All
            </button>
            <button
              onClick={() => {
                setFilterType("Completed");
              }}
              className="bg-green-200 rounded-xl h-10 w-30 cursor-pointer active:bg-green-400 focus:outline-none transition duration-50 comic-relief-regular"
            >
              Completed
            </button>
            <button
              onClick={() => {
                setFilterType("Pending");
              }}
              className="bg-red-300 rounded-xl h-10 w-25 cursor-pointer active:bg-red-400 focus:outline-none transition duration-50 comic-relief-regular"
            >
              Pending
            </button>
            <button
               onClick={handleDeleteAll}
              className="bg-red-500 rounded-xl h-10 w-25 cursor-pointer active:bg-red-400 focus:outline-none transition duration-50 comic-relief-regular"
            >
              Delete All
            </button>
          </div>
          {/* filter section end */}

          <div className="flex-1 overflow-y-auto  rounded-xl p-2 container space-y-4 custom-scrollbar">
            {list.length === 0 ? (
              <>
                <div
                  className="bg-purple-400 rounded-xl h-[200px] flex justify-center items-center text-purple-800 font-semibold text-xl cursor-pointer comic-relief-regular"
                  onClick={() => inputRef.current?.focus()}
                >
                  Add some task first
                </div>
              </>
            ) : (
              <>
                {filteredList.map((value) => (
                  <label
                    key={value.id}
                    className="bg-purple-300 w-full h-16 rounded-2xl flex items-center gap-6 p-4"
                  >
                    <input
                      type="checkbox"
                      checked={value.completed}
                      onChange={() => {
                        handleToggle(value.id),
                          toggleCompleted(value.id, value.completed);
                      }}
                      className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                    />
                    <div
                      className={`flex justify-start items-center font-semibold text-xl w-full transition duration-300 comic-relief-regular ${
                        value.completed
                          ? "line-through text-gray-600 leading-tight"
                          : ""
                      }`}
                    >
                      {value.text}
                    </div>
                    <div className="cursor-pointer">
                      <FaEdit
                        size={22}
                        onClick={() => {
                          handleEdit(value.id);
                        }}
                      />
                    </div>
                    <div className="cursor-pointer">
                      <MdDelete
                        size={22}
                        onClick={() => {
                          handleDelete(value.id);
                        }}
                      />
                    </div>
                  </label>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
