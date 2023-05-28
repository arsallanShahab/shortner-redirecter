"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>
        An error occurred: <span>{error}</span>
      </h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
