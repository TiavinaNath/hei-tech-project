export default function UserCard() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1537565609867-73c2edb961ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80)',
      }}
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="max-w-3xl w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className="bg-gray-900 border border-gray-900 shadow-lg rounded-3xl p-4 m-4">
            <div className="flex-none sm:flex">
              <div className="relative h-32 w-32 sm:mb-0 mb-3">
                <img
                  src="https://tailwindcomponents.com/storage/avatars/njkIbPhyZCftc4g9XbMWwVsa7aGVPajYLRXhEeoo.jpg"
                  alt="aji"
                  className="w-32 h-32 object-cover rounded-2xl"
                />
                <a
                  href="#"
                  className="absolute -right-2 bottom-2 text-white p-1 text-xs bg-green-400 hover:bg-green-500 font-medium tracking-wider rounded-full transition ease-in duration-300"
                >
                  ✎
                </a>
              </div>
              <div className="flex-auto sm:ml-5 justify-evenly">
                <div className="flex items-center justify-between sm:mt-2">
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">
                        Aji
                      </div>
                      <div className="flex-auto text-gray-400 my-1">
                        <span className="mr-3">UI/UX Designer</span>
                        <span className="mr-3 border-r border-gray-600 max-h-0"></span>
                        <span>Cochin, IND</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Ajoute ici les étoiles, les infos supplémentaires, etc. */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
