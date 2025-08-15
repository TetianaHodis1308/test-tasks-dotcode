import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6">
        Thank you for the test task 🧡
      </h1>

      <p className="text-lg sm:text-xl text-gray-700 max-w-xl mb-10">
        I sincerely appreciate the opportunity to complete this task. I gave it
        my best, and I would love the chance to grow and work with you at{' '}
        <span className="font-semibold text-orange-500">DotCode</span>.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/first-task"
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded transition shadow-md"
        >
          Go to the First Task →
        </Link>

        <Link
          to="/second-task"
          className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded transition shadow-md"
        >
          Go to the Second Task →
        </Link>
      </div>
    </section>
  );
};
