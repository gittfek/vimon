export default function Test() {
    return (
      <div className="min-h-screen p-8 space-y-8">
        <h1 className="text-4xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
          Primärfärg: #28385C
        </h1>
        <div className="flex gap-8">
          <div className="w-32 h-32 rounded-xl shadow-lg" style={{ backgroundColor: 'hsl(var(--primary))' }}></div>
          <div className="w-32 h-32 rounded-xl shadow-lg" style={{ backgroundColor: 'hsl(var(--accent))' }}></div>
        </div>
        <button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/0.9)] text-white px-8 py-4 rounded-xl font-bold">
          Registrera dig nu!
        </button>
      </div>
    );
  }