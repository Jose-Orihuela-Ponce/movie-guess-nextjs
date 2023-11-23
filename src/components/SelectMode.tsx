export function SelectMode({
  setDifficulty
}: {
  setDifficulty: (value: number) => void;
}) {
  return (
    <article className="grid grid-rows-2">
      <h2 className=" text-purple-500">Select mode</h2>
      <div className="flex justify-center gap-4">
        <button className="w-20 p-3" onClick={() => setDifficulty(8)}>
          hard
        </button>
        <button className="w-20 p-3" onClick={() => setDifficulty(2)}>
          normal
        </button>
      </div>
    </article>
  );
}
