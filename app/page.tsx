import itineraryData from '@/data/itinerary.json';

export default function Home() {
  // Calculate days until trip
  const tripStartDate = new Date('2025-12-13');
  const today = new Date();
  const daysUntil = Math.ceil((tripStartDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with countdown */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-fukuoka-blue mb-4">
          福岡之旅行程表 🎌
        </h1>
        <p className="text-xl text-gray-700 mb-2">
          2025年12月13日 (六) - 12月20日 (六)
        </p>
        {daysUntil > 0 && (
          <div className="inline-block bg-fukuoka-pink text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
            ⏰ 還有 {daysUntil} 天！
          </div>
        )}
        {daysUntil === 0 && (
          <div className="inline-block bg-fukuoka-gold text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
            🎉 今天出發！
          </div>
        )}
        {daysUntil < 0 && daysUntil > -8 && (
          <div className="inline-block bg-fukuoka-blue text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
            🌸 旅程進行中！
          </div>
        )}
      </div>

      {/* Itinerary Timeline */}
      <div className="max-w-4xl mx-auto space-y-8">
        {itineraryData.map((day, index) => (
          <div 
            key={day.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border-l-4 border-fukuoka-pink"
          >
            {/* Day Header */}
            <div className="bg-gradient-to-r from-fukuoka-pink to-fukuoka-blue p-6">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {day.day} - {day.title}
                  </h2>
                  <p className="text-white text-opacity-90">
                    {day.date} ({day.weekday})
                  </p>
                </div>
                <div className="text-5xl">
                  {index === 0 && '✈️'}
                  {index === 1 && '🍜'}
                  {index === 2 && '🌊'}
                  {index === 3 && '⛩️'}
                  {index === 4 && '🏙️'}
                  {index === 5 && '😌'}
                  {index === 6 && '🎁'}
                  {index === 7 && '👋'}
                </div>
              </div>
            </div>

            {/* Day Activities */}
            <div className="p-6">
              <div className="space-y-4">
                {day.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="flex gap-4 items-start p-4 hover:bg-fukuoka-cream rounded-lg transition-colors"
                  >
                    {/* Icon */}
                    {item.icon && (
                      <div className="text-3xl flex-shrink-0">
                        {item.icon}
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {item.time && (
                          <span className="inline-block bg-fukuoka-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                            {item.time}
                          </span>
                        )}
                        <h3 className="font-bold text-lg text-fukuoka-blue">
                          {item.activity}
                        </h3>
                        {item.needsReservation && (
                          <span className="inline-block bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            需預約
                          </span>
                        )}
                        {item.warning && (
                          <span className="inline-block bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">
                            ⚠️ {item.warning}
                          </span>
                        )}
                      </div>
                      
                      {item.details && (
                        <p className="text-gray-700 mt-2">
                          {item.details}
                        </p>
                      )}
                      
                      {item.address && (
                        <p className="text-gray-600 text-sm mt-1 flex items-start gap-1">
                          <span>📍</span>
                          <span>{item.address}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Notes Section */}
      <div className="max-w-4xl mx-auto mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-yellow-800 mb-4">📝 重要筆記</h3>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span><strong>預約建議:</strong> 強烈建議提前預約燒肉大喜、鮨 品川、Nico Appartement 和 Kawaya</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span><strong>太宰府+能古島:</strong> 無需預約，當天自由安排即可</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span><strong>食堂 光:</strong> 位於糸島，距離市區較遠，需預留足夠的交通時間</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span><strong>行程彈性:</strong> 第四天是輕鬆日，可依體力調整太宰府或能古島的停留時間</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

