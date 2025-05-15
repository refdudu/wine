interface CounterProps {
  handleAdd: () => void;
  handleRemove: () => void;
  total: number;
}
export function Counter({ handleAdd, handleRemove, total }: CounterProps) {
  return (
    <div className="border border-custom-gray rounded-md flex gap-4 px-2 py-1">
      <button type="button" className="text-custom-gray" onClick={handleRemove}>
        -
      </button>
      <span className="text-custom-gray">{total}</span>
      <button type="button" className="text-custom-gray" onClick={handleAdd}>
        +
      </button>
    </div>
  );
}
export function ButtonCounter({
  handleAdd,
  handleRemove,
  total,
}: CounterProps) {
  return (
    <div className=" rounded-md bg-custom-green text-white flex gap-8 px-6 py-3 max-w-80 font-bold">
      <div className="flex gap-4 items-center">
        <button
          type="button"
          className="border rounded-full border-white w-6 h-6 flex items-center justify-center"
          onClick={handleRemove}
        >
          -
        </button>
        <span className="">{total}</span>
        <button
          type="button"
          className="border rounded-full border-white w-6 h-6 flex items-center justify-center"
          onClick={handleAdd}
        >
          +
        </button>
      </div>
      <button type='button' className="flex-1 flex items-center justify-center">
        <span className="font-bold">Adicionar</span>
      </button>
    </div>
  );
}
