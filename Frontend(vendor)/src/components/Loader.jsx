function Loader() {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200 gap-4">
        <span className="loading loading-dots loading-xs"></span>
        <span className="loading loading-dots loading-sm"></span>
        <span className="loading loading-dots loading-md"></span>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
}

export default Loader
