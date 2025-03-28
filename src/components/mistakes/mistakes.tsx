type MistakesProps = {
  count: number;
};

function Mistakes({ count }: MistakesProps): JSX.Element {
  const mistakes = Array.from({ length: count });

  return (
    <div className="game__mistakes" data-testid="mistakes-container">
      {mistakes.map((_item, index) => {
        const keyValue = `mistake-${index}`;
        return <div key={keyValue} className="wrong" data-testid="mistakes-item" />;
      })}
    </div>
  );
}

export default Mistakes;
