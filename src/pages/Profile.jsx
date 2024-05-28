import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";

export default function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await AuthService.me();
        console.log("result1", result.data);
        if (result.data) {
          console.log(result.data);
          setUser(result.data.data); // Mengubah state histories dengan data yang diterima dari server
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized"); // Menangkap error 401
          localStorage.clear();
          // window.location.href = "/";
          // history.replace("/login");
          window.history.replaceState("/login");
        } else {
          console.log(error.response.data);
        }
      }
    };
    getData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white overflow-hidden shadow rounded-lg border w-full max-w-md mt-4">
        <div className="relative flex justify-center mt-4">
          <img
            className="rounded-full w-20 h-20"
            src={
              user.image_url ??
              "data:image/jpeg;base64,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"
            }
            alt="Profile Picture"
          />
        </div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This is some information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            {/* Add more profile fields as needed */}
          </dl>
        </div>
      </div>
    </div>
  );
}
