/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
export default function CardHistory({ predict }) {
  return (
    <div className="m-2 bg-white border rounded-xl shadow-sm sm:flex dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="flex-shrink-0 relative w-full rounded-t-xl overflow-hidden sm:rounded-s-xl sm:max-w-60 md:rounded-se-none md:max-w-xs">
        <img
          className="absolute top-0 left-0 object-cover w-full h-full max-h-[150px]"
          src="https://cdn-web.ruangguru.com/landing-pages/assets/hs/EA%20-%20News%20Item%20Text-01.jpg"
          alt="Image Description"
        />
      </div>
      <div className="flex flex-wrap">
        <div className="p-4 flex flex-col h-full sm:p-7">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {predict.result}
          </h3>
          <p className="mt-1 text-gray-500 dark:text-neutral-400">
            Some quick example text to build on the card title and make up the
            bulk of the cards content.
          </p>
          <div className="mt-5 sm:mt-auto">
            <p className="text-xs text-gray-500 dark:text-neutral-500">
              {predict.createdAt}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
