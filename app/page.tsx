import itineraryData from '@/data/itinerary.json';
import type { DayItinerary } from '@/types';
import { getGoogleMapsUrl } from './utils/googleMaps';

export default function Home() {
  // Cast the imported data to the correct type
  const itinerary = itineraryData as DayItinerary[];
  
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
        {itinerary.map((day, index) => (
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
                  {index === 3 && '🏝️'}
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
                      <div className="flex items-center gap-2 flex-wrap mb-1">
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
                        <p className="text-gray-700 mt-1">
                          {item.details}
                        </p>
                      )}

                      {/* Hours & Address Block */}
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        {item.hours && (
                          <p className="flex items-center gap-2">
                            <span>🕒</span>
                            <span>{item.hours}</span>
                          </p>
                        )}
                        
                        {item.address && (
                          <p className="flex items-start gap-2">
                            <span>📍</span>
                            <a 
                              href={getGoogleMapsUrl(item.address, item.activity)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-fukuoka-blue hover:underline"
                            >
                              {item.address}
                            </a>
                          </p>
                        )}
                      </div>

                      {/* Backup Plan */}
                      {item.backup && (
                        <div className="mt-3 bg-gray-100 p-2 rounded border-l-2 border-gray-400 text-sm text-gray-700">
                          <span className="font-bold mr-1">🛡️ 備案:</span>
                          {item.backup}
                        </div>
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
            <span><strong>預約提醒:</strong> 請務必提前預約 鮨 品川、燒肉大喜、Nico Appartement 和 Kawaya。</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span><strong>排隊心理準備:</strong> Dacomecca、Ikura、糸島食堂、食堂光 都是排隊名店，建議提早抵達或使用備案。</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span><strong>能古島交通:</strong> 冬季日落較早 (約 17:10)，建議上午前往海島公園，下午返回市區或海濱公園。</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span><strong>Marinoa City:</strong> 已於 2024/8 閉館，請勿前往。</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
