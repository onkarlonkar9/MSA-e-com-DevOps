function Error() {
    return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 select-none">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong !</h1>
      <p className="text-lg text-gray-600 mb-6">Please try again later or refresh the page.</p>
   
    </div>
  );
};

export default Error
