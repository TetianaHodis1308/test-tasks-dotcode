export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-40 space-y-4">
      <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-orange-500"></div>
      <p className="text-orange-500 font-semibold">Loading...</p>
    </div>
  );
};
