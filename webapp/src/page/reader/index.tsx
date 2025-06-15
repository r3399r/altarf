import useFetch from './useFetch';

const Reader = () => {
  const { result } = useFetch();

  if (!result) return <div>Loading...</div>;

  return (
    <>
      {result.map((v) => (
        <div key={v.id}>{v.id}</div>
      ))}
    </>
  );
};

export default Reader;
