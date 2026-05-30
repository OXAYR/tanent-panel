
export function WelcomeText() {
  return (
    <>
      {/* Left Side Content */}
      <div className="text-white space-y-2 hidden md:block">
        <p className="text-lg font-light tracking-wide text-slate-400">Welcome to</p>
        <h1 className="text-5xl font-semibold leading-tight tracking-tight">Super Admin</h1>
      </div>

      {/* Mobile Welcome */}
      <div className="text-white text-center space-y-1 md:hidden mb-6">
        <p className="text-base font-light text-slate-400">Welcome to</p>
        <h1 className="text-4xl font-semibold">Super Admin</h1>
      </div>
    </>
  );
}
