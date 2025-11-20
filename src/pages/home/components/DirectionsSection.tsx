import { BookOpen, Zap, Users, Trophy, Code, Microscope } from "lucide-react";

export default function DirectionsSection() {
  const directions = [
    {
      title: "IT va Dasturlash",
      icon: Code,
      color: "from-blue-400 to-cyan-400",
      description: "Zamonaviy texnologiya va dasturlash tili",
    },
    {
      title: "Muhandislik",
      icon: Zap,
      color: "from-orange-400 to-red-400",
      description: "Raqobatbardosh muhandislik ta'limi",
    },
    {
      title: "Tabiiy fanlar",
      icon: Microscope,
      color: "from-green-400 to-teal-400",
      description: "Tadqiqot va tajriba asosida o'qitish",
    },
    {
      title: "Biznes va Iqtisodiyot",
      icon: Trophy,
      color: "from-purple-400 to-pink-400",
      description: "Xalqaro biznes standartlari",
    },
    {
      title: "Milliy Tillar",
      icon: BookOpen,
      color: "from-indigo-400 to-blue-400",
      description: "O'zbek tilshunosligi va adabiyoti",
    },
    {
      title: "Huquq va Ijtimoiy Fanlar",
      icon: Users,
      color: "from-rose-400 to-pink-400",
      description: "Jamiyat va haqoqat ta'limi",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Yo'nalishlarga ega bo'ling
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Alberuniy Universitetida 50+ ta mutaxassislik bo'yicha o'qishning
            imkoniyati bor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {directions.map((dir, i) => {
            const Icon = dir.icon;
            return (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl p-6 card-hover soft-shadow cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${dir.color} 0%, rgba(255, 255, 255, 0.8) 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                    <Icon className="w-7 h-7 text-gray-800" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {dir.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{dir.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
