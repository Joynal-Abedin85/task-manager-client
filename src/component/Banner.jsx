
const Banner = () => {
  return (
    <div className="relative bg-[#8dc8ff] flex flex-col md:flex-row items-center justify-between  p-10 md:p-16">
      {/* Left Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to Your Task Manager
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage your tasks efficiently with drag-and-drop, real-time updates, and powerful collaboration tools.
        </p>
        <button className="px-6 py-3 border-2 border-blue-500 text-blue-800 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition">
          Get Started
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0">
        <img 
          src="./assets/b1.png" 
          alt="Task Management" 
          className="w-full  h-auto rounded-lg "
        />
      </div>
    </div>
  );
};

export default Banner;
