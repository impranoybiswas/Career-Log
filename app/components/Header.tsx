export default function Header() {
  return (
    <header className="fixed w-fit z-100 left-1/2 top-8 md:top-10 -translate-x-1/2 group">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-center md:text-left">
        Career <span className="text-indigo-400 whitespace-nowrap">Log</span>
      </h1>
      <div className="h-0.5 w-1/2 group-hover:w-4/5 mx-auto mt-2 bg-indigo-400 rounded-full transition-all duration-300 ease-in-out"></div>
    </header>
  );
}
