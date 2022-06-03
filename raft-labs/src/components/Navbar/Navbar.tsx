import { SiAddthis } from "../../Icons/Icons";
import BrandIcon from "../../assets/pie-chart-and-connections-svgrepo-com.svg";

export type NavbarType = {
  setShowModal: (value: boolean) => void;
};

const Navbar = ({ setShowModal }: NavbarType) => {
  return (
    <div className="h-[160px] md:h-[120px] w-full flex md:flex-row flex-col items-center justify-between py-4 px-1 bg-slate-800">
      <div className="flex items-center justify-center pl-10">
        <div className="cursor-pointer flex items-center justify-between">
          <img src={BrandIcon} className="w-[35px] mt-2 mr-3" alt="brand" />
          <h1 className="text-3xl text-white">6DegSeperation</h1>
        </div>
      </div>
      <div className="bg-darkCharcoal rounded-md my-2 md:mt-5 pl-3 md:pr-10">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center mr-4 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 active:border-b-0 rounded uppercase"
        >
          <SiAddthis className="mr-2" />
          <span>add people</span>
        </button>
      </div>
    </div>
  );
};

export { Navbar };
