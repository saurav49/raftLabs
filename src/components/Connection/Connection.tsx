import { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";

export type DuplicateObjTracker = {
  [num: string]: boolean;
};

const Connection = () => {
  const [friend1, setfriend1] = useState<string>("");
  const [friend2, setfriend2] = useState<string>("");
  const { allUsers, options } = useUser();
  const [connections, setConnections] = useState<Array<string>>([]);

  const handleCheckConnection = (frd1: string, frd2: string, path = frd1) => {
    let results: Array<string> = [];

    if (allUsers.hasOwnProperty(frd1)) {
      const friends = allUsers[frd1 as keyof typeof allUsers] as Array<string>;
      if (friends.length === 1 && friends.includes(frd2)) {
        results.push(`${path}->${frd2}`);
        setConnections((prevState) => [...prevState, ...results]);
        return results;
      } else if (friends.length === 1 && !friends.includes(frd2)) {
        let pathContd = `${path}->${friends[0]}`;
        results = [
          ...results,
          ...handleCheckConnection(friends[0], frd2, pathContd),
        ];
        return results;
      } else {
        friends.forEach((person) => {
          let path = `${frd1}->${person}`;
          results = [...handleCheckConnection(person, frd2, path)];
          setConnections((prevState) => [...prevState, ...results]);
        });
      }
    }
    return results;
  };

  useEffect(() => {
    const removeDuplicates = (arr: Array<string>) => {
      let obj: DuplicateObjTracker = {};
      let res: Array<string> = [];
      for (let ele of arr) {
        if (!obj[ele as keyof typeof obj]) {
          obj[ele as keyof typeof obj] = true;
          res.push(ele);
        }
      }
      return res;
    };

    setConnections((prevState) => removeDuplicates(prevState));
  }, [connections.length]);

  useEffect(() => {
    setConnections([]);
  }, [friend1, friend2]);

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className="flex flex-col items-center justify-around w-[85%] h-[320px] md:w-[500px] shadow-md rounded-md
    border-2 border-gray-200 px-2
    "
      >
        <p className="text-md text-slate-700 mt-3">
          It is said that all people on average are
          <a
            className="italic mx-1 font-medium decoration-solid underline-offset-1"
            href="https://en.wikipedia.org/wiki/Six_degrees_of_separation"
          >
            six, or fewer, social connections away from each other.
          </a>
        </p>
        <p className="text-lg text-slate-700 font-bold">
          Check below to find out
        </p>
        <div className="w-[90%] flex flex-wrap items-center justify-around">
          <select
            name="friend1"
            value={friend1}
            onChange={(e) => setfriend1(e.target.value)}
            className="border border-1 border-gray-300 rounded-md p-2 my-2 mr-2 sm:my-0 sm:mr-0"
          >
            <option value="" disabled>
              Select Friend 1
            </option>
            {options.map(({ value, label }) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>

          <select
            name="friend2"
            value={friend2}
            onChange={(e) => setfriend2(e.target.value)}
            className="border border-1 border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              Select Friend 2
            </option>
            {options.map(({ value, label }) => {
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={() => handleCheckConnection(friend1, friend2)}
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-5 border-b-4 active:border-b-0 mb-5 border-emerald-700 hover:border-emerald-500 rounded uppercase mr-5"
        >
          check
        </button>
      </div>
      {connections && Array.isArray(connections) && connections.length > 0 && (
        <div
          className="flex flex-col items-center justify-around w-[85%] md:w-[500px] shadow-md rounded-md
    border-2 border-gray-200 p-4 mt-4"
        >
          <p className="my-2 text-md text-slate-700">
            Seperation between {friend1} and {friend2}:
          </p>
          {connections.map((connection, idx) => {
            return (
              <p
                className="font-bold italic text-lg my-2 text-slate-700"
                key={idx}
              >
                Scenario-{idx + 1}: {connection}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { Connection };
