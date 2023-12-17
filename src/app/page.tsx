"use client";

import { useState } from "react";

export default function Home() {
  const [number, setNumber] = useState("");
  const sendOtp = async () => {
    try {
      const response = await fetch(
        "https://cpp.bka.sh/external-services/referral/report/otp/request",
        {
          method: "POST",
          mode: "cors", // This enables cross-origin resource sharing
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Set the desired origin or use "*" for any origin
          },
          body: JSON.stringify({ referrerWallet: number }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const movies = await response.json();
      console.log(movies);
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };
  const isValidNumber = (number: string) => {
    const regex = /^01[0-9]{9}$/;
    return regex.test(number);
  };
  return (
    <main className="flex min-h-screen flex-col items-center gap-3 p-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => setNumber(e.target.value)}
        type="text"
        name="number"
        id=""
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        onClick={sendOtp}
        disabled={!isValidNumber(number)}
      >
        Submit
      </button>
    </main>
  );
}
