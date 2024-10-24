const App = () => {
  return (
    <main className="flex-col gap-4 center w-screen h-screen p-5 md:p-10">
      <p className="text-4xl">Snake</p>
      <section className="gameArea center flex-col md:flex md:flex-row gap-3 relative">
        <div
          data-testid="info-area"
          className="md:w-[250px] md:block w-full flex md:h-full md:order-last mb-2 md:mb-0 bg-red-400"
        >
          info area
        </div>
        <div
          data-testid="game-area"
          className="flex-1 h-full md:h-100 w-full bg-green-400"
        >
          game area
        </div>
      </section>
    </main>
  );
};

export default App;
