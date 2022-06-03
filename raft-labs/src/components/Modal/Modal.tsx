import { useState } from "react";
import { useUser } from "../../hooks/useUser";

export type ModalType = {
  setShowModal: (value: boolean) => void;
};

const Modal = ({ setShowModal }: ModalType) => {
  const [inputTextFriend1, setInputTextFriend1] = useState<string>("");
  const [friend1, setfriend1] = useState<string>("");
  const [friend2, setfriend2] = useState<string>("");
  let { allUsers, setAllUsers, options, setOptions } = useUser();

  const handleAddUserOrRelation = () => {
    if (inputTextFriend1.length === 0 && friend1.length === 0) {
      alert("cannot add when friend 1 is empty");
      return;
    }
    if (friend2.length === 0) {
      alert("cannot add when friend 2 is empty");
      return;
    }

    if (allUsers[inputTextFriend1 as keyof typeof allUsers]) {
      alert(
        "User already present, select from the dropdown if you want to form a new relation"
      );
      setInputTextFriend1("");
      setfriend2("");
      return;
    }
    if (inputTextFriend1) {
      setAllUsers((prevState) => ({
        ...prevState,
        [inputTextFriend1]: [`${friend2}`],
      }));
      setOptions((prevState) => [
        ...prevState,
        { value: inputTextFriend1, label: inputTextFriend1 },
      ]);
      setInputTextFriend1("");
      setfriend2("");
    } else {
      allUsers = {
        ...allUsers,
        [`${friend1}`]: [
          ...allUsers[friend1 as keyof typeof allUsers],
          friend2,
        ],
      };
      setAllUsers(allUsers);
      setfriend1("");
      setfriend2("");
    }
  };

  return (
    <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-slate-700/50">
      <div className="flex items-center flex-col w-[80%] md:w-[600px] bg-white text-slate-900 rounded-md shadow-md pt-4 px-6 pb-0 absolute">
        <p className="text-left w-full my-2 text-slate-500 font-medium">
          Add People / Create Relations
        </p>
        <div className="w-full my-2 flex flex-wrap items-center justify-evenly">
          <div className="flex flex-col items-center justify-between">
            <input
              type="text"
              name="friend1"
              value={inputTextFriend1}
              onChange={(e) => setInputTextFriend1(e.target.value)}
              placeholder="Enter new user..."
              className="w-[170px] border border-1 border-gray-300 rounded-md p-2 mt-2 sm:mt-0"
            />
            <span className="my-1 italic text-slate-700 font-medium text-sm">
              --OR--
            </span>
            <select
              name="friend1"
              className="border border-1 border-gray-300 rounded-md p-2 mb-2 md:mb-0"
              value={friend1}
              onChange={(e) => setfriend1(e.target.value)}
            >
              <option value="" disabled>
                Select Friend 1
              </option>
              {options.map(({ label, value }, idx) => {
                return (
                  <option
                    className="border border-1 border-gray-300 rounded-md p-2"
                    value={value}
                    key={idx}
                  >
                    {label}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="border border-1 border-gray-300 rounded-md p-2 bg-gray-200 text-gray-500 mx-2 mb-2 sm:mb-0">
            is a friend of
          </p>
          <select
            name="user"
            className="border border-1 border-gray-300 rounded-md p-2 mt-2 sm:mt-0"
            value={friend2}
            onChange={(e) => setfriend2(e.target.value)}
          >
            <option value="" disabled>
              Select Friend 2
            </option>
            {options.map(({ label, value }, idx) => {
              return (
                <option
                  className="border border-1 border-gray-300 rounded-md p-2"
                  value={value}
                  key={idx}
                >
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="self-end flex items-center w-100 mt-20">
          <button
            className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-5 border-b-4 active:border-b-0 mb-5 border-slate-700 hover:border-slate-500 rounded uppercase mr-5"
            onClick={handleAddUserOrRelation}
          >
            add
          </button>
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-5 border-b-4 active:border-b-0 mb-5 border-red-700 hover:border-red-500 rounded uppercase"
            onClick={() => setShowModal(false)}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export { Modal };
