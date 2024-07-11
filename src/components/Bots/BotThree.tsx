import React from 'react'
import { Headphones } from "../Conversition/Headphones";
import { isBrowser } from "react-device-detect";
import { Spinner } from "@nextui-org/react";

const BotThree = (props:{botNumber:string}) => {
  const connecting=true
  return (
    <div className="col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-3 md:col-end-11 lg:col-start-4 lg:col-end-10 p-3 mb-1/2">
    <button
      disabled={true}
      type="button"
      className="relative block w-full glass p-6 sm:p-8 lg:p-12 rounded-xl bg-[#345830] text-white"
    >
      <h2 className="font-favorit mt-2 block font-bold text-xl">
        Welcome to Weya&apos;s Third Chat
      </h2>
      <span className="mt-4 block font-semibold">
        <div  className="border-2 border-[#345830] rounded-xl text-white bg-gradient-to-r from-[#345830] to-black p-4">
          {connecting ? (
            <div className="w-full h-full items-center flex justify-center opacity-40 cursor-not-allowed">
              <Spinner size={"sm"} className="-mt-1 mr-2" />
              Connecting...
            </div>
          ) : (
            <>{isBrowser ? "Click" : "Tap"} here to start</>
          )}
        </div>
      </span>
      <span className="mt-4 block text-sm text-gray-100/70">
        <Headphones /> For optimal enjoyment, we recommend using headphones
        while using this application.
      </span>
    </button>
  </div>
  )
}

export default BotThree