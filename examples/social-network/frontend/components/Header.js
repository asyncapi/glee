import { MailIcon } from '@heroicons/react/solid'
import classNames from 'classnames'

export default function Header({profile}) {
  return (
    <div>
      <div>
        <img className="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt="" />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-4">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
              src={profile.imageUrl}
              alt=""
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:block mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <MailIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}