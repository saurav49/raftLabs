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
          console.log({ path });
          results = [...handleCheckConnection(person, frd2, path)];
          setConnections((prevState) => [...prevState, ...results]);
        });
      }
    }
    return results;
  };

  console.log(connections);

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

  console.log(connections);

  return (
    <div>
      <select
        name="friend1"
        value={friend1}
        onChange={(e) => setfriend1(e.target.value)}
        className="border border-1 border-gray-300 rounded-md p-2 mb-2 md:mb-0"
      >
        <option value="" disabled>
          Select Friend 1
        </option>
        {options.map(({ value, label }) => {
          return <option value={value}>{label}</option>;
        })}
      </select>

      <select
        name="friend2"
        value={friend2}
        onChange={(e) => setfriend2(e.target.value)}
        className="border border-1 border-gray-300 rounded-md p-2 mb-2 md:mb-0"
      >
        <option value="" disabled>
          Select Friend 2
        </option>
        {options.map(({ value, label }) => {
          return <option value={value}>{label}</option>;
        })}
      </select>

      <button
        onClick={() => handleCheckConnection(friend1, friend2)}
        className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-2 px-5 border-b-4 active:border-b-0 mb-5 border-emerald-700 hover:border-emerald-500 rounded uppercase mr-5"
      >
        check
      </button>
    </div>
  );
};

export { Connection };
