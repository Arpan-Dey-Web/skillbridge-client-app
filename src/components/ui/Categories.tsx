const categories = [
  { name: "Mathematics", tutors: 120, icon: "∑" },
  { name: "Computer Science", tutors: 85, icon: "</>" },
  { name: "Physics", tutors: 64, icon: "⚛" },
  { name: "Languages", tutors: 92, icon: "文" },
];

export function Categories() {
  return (
    <section className="py-20 bg-accent/30">
      {" "}
      {/* Using your Pale Mint background */}
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="p-8 rounded-2xl bg-white border border-border hover:border-secondary hover:shadow-xl hover:shadow-secondary/10 transition-all cursor-pointer group text-center"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold text-foreground">{cat.name}</h3>
              <p className="text-sm text-muted-foreground">
                {cat.tutors} Tutors
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
