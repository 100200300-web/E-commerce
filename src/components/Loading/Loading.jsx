import React from "react";
import { MutatingDots } from "react-loader-spinner";
export default function Loading() {
  return (
    <>
      <div className="h-screen flex justify-center items-center bg-white">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#0891b2"
          secondaryColor="#0891b2"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </>
  );
}
