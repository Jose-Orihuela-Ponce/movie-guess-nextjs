export function SelectMode({
  setDifficulty
}: {
  setDifficulty: (value: number) => void;
}) {
  return (
    <article className="grid grid-rows-2">
      <h2 className=" text-purple-500">Select mode</h2>
      <div className="flex justify-center gap-4 mb-10">
        <button className="w-20 p-3" onClick={() => setDifficulty(8)}>
          hard
        </button>
        <button className="w-20 p-3" onClick={() => setDifficulty(2)}>
          normal
        </button>
      </div>
      <ul className="grid place-content-center">
        <li className="w-80 list-disc text-purple-500">
          You can chosse the complexity of the game selecting hard mode or
          normal mode
        </li>
        <li className="w-80 list-disc text-purple-500">
          there are some help you can use the hint and for last the help option
        </li>
      </ul>
    </article>
  );
}
