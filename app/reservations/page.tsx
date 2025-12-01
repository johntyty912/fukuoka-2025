'use client';

import { useState, useEffect } from 'react';
import reservationsData from '@/data/reservations.json';
import type { Reservation } from '@/types';
import { getGoogleMapsUrl } from '../utils/googleMaps';

export default function ReservationsPage() {
  const [completedReservations, setCompletedReservations] = useState<Set<string>>(new Set());
  
  // Cast the imported data to the correct type
  const reservations = reservationsData as Reservation[];

  // Load completed reservations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedReservations');
    if (saved) {
      setCompletedReservations(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save to localStorage whenever completedReservations changes
  const toggleReservation = (id: string) => {
    const newCompleted = new Set(completedReservations);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedReservations(newCompleted);
    localStorage.setItem('completedReservations', JSON.stringify(Array.from(newCompleted)));
  };

  const getPriorityColor = (priority: number) => {
    if (priority === 5) return 'bg-red-500';
    if (priority === 4) return 'bg-orange-500';
    if (priority === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPriorityText = (priority: number) => {
    if (priority === 5) return '非常緊急';
    if (priority === 4) return '很重要';
    if (priority === 3) return '建議預約';
    return '可選';
  };

  const completedCount = completedReservations.size;
  const totalCount = reservations.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-fukuoka-blue mb-4">
          預約清單 & 攻略 📋
        </h1>
        <p className="text-xl text-gray-700 mb-6">
          這裡列出了行程中需要預約的項目，以及預約失敗時的備選方案
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>進度</span>
            <span>{completedCount} / {totalCount} 完成</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-fukuoka-pink h-full transition-all duration-500 rounded-full"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
          {completedCount === totalCount && (
            <div className="mt-4 text-green-600 font-bold text-lg">
              🎉 所有預約都完成了！
            </div>
          )}
        </div>
      </div>

      {/* Reservations List */}
      <div className="max-w-5xl mx-auto space-y-8">
        {reservations.map((reservation) => {
          const isCompleted = completedReservations.has(reservation.id);
          
          return (
            <div 
              key={reservation.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 transition-all duration-300 ${
                isCompleted ? 'border-green-500 opacity-75' : 'border-fukuoka-pink'
              }`}
            >
              {/* Reservation Header */}
              <div className="bg-gradient-to-r from-fukuoka-blue to-fukuoka-pink p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="text-2xl font-bold text-white">
                        {reservation.name}
                      </h2>
                      <span className={`${getPriorityColor(reservation.priority)} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                        {'⭐'.repeat(reservation.priority)} {getPriorityText(reservation.priority)}
                      </span>
                    </div>
                    <p className="text-white text-opacity-90 mb-1">
                      {reservation.type}
                    </p>
                    <p className="text-white text-sm">
                      {reservation.day}
                    </p>
                  </div>
                  
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleReservation(reservation.id)}
                    className={`flex-shrink-0 w-12 h-12 rounded-lg border-4 border-white flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500' 
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {isCompleted && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Reservation Details */}
              <div className="p-6">
                {/* When to Reserve */}
                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <div className="font-bold text-yellow-800 mb-1">⏰ 預約時間</div>
                  <div className="text-yellow-900">{reservation.when}</div>
                </div>

                {/* Reservation Methods */}
                <div className="mb-6">
                  <h3 className="font-bold text-lg text-fukuoka-blue mb-3">📞 預約方法</h3>
                  <div className="space-y-3">
                    {reservation.methods.map((method, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-fukuoka-pink text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-fukuoka-blue">{method.name}</div>
                          <div className="text-gray-700 text-sm mt-1">{method.description}</div>
                          {method.url && (
                            <a 
                              href={method.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-sm text-fukuoka-blue hover:text-fukuoka-pink font-medium hover:underline"
                            >
                              🔗 前往網站 →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                {reservation.address && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="font-bold text-gray-700 mb-1">📍 地址</div>
                    <a 
                      href={getGoogleMapsUrl(reservation.address, reservation.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fukuoka-blue hover:text-fukuoka-pink hover:underline"
                    >
                      {reservation.address}
                    </a>
                  </div>
                )}

                {/* Backup Plans */}
                {reservation.backups && reservation.backups.length > 0 && (
                  <div>
                    <h3 className="font-bold text-lg text-fukuoka-blue mb-3">🔄 備選方案 (Backup Plans)</h3>
                    <div className="space-y-3">
                      {reservation.backups.map((backup, index) => (
                        <div key={index} className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                          <div className="font-semibold text-green-800 mb-1">
                            Plan {String.fromCharCode(66 + index)}: {backup.name}
                          </div>
                          <div className="text-green-900 text-sm">{backup.description}</div>
                          {backup.url && (
                            <a 
                              href={backup.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-sm text-green-700 hover:text-green-900 font-medium hover:underline"
                            >
                              🔗 前往網站 →
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {reservation.notes && (
                  <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
                    <div className="font-bold text-purple-800 mb-1">💡 備註</div>
                    <div className="text-purple-900 text-sm">{reservation.notes}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Tips */}
      <div className="max-w-5xl mx-auto mt-12 bg-fukuoka-cream border-2 border-fukuoka-pink p-6 rounded-lg">
        <h3 className="text-xl font-bold text-fukuoka-blue mb-4">💡 預約小貼士</h3>
        <ul className="space-y-2 text-gray-800">
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span>點擊每個項目右上角的方框來標記已完成的預約</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span>你的進度會自動保存在瀏覽器中</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span>如果第一選擇無法預約，請參考備選方案（Backup Plans）</span>
          </li>
          <li className="flex items-start gap-2">
            <span>🔸</span>
            <span>建議從優先級最高（5星）的項目開始預約</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

