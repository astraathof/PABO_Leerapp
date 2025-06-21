'use client'

import { useState } from 'react'

// Cito Score Visualization Component
export function CitoScoreChart({ title, data, explanation }: {
  title: string
  data: { level: string; percentage: number; national: number; color: string }[]
  explanation: string
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-800 mb-4">{title}</h4>
      
      {/* Chart */}
      <div className="space-y-3 mb-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Niveau {item.level}</span>
              <span className="text-gray-600">{item.percentage}% (NL: {item.national}%)</span>
            </div>
            <div className="flex space-x-2">
              {/* School bar */}
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div 
                  className={`h-4 rounded-full ${item.color}`}
                  style={{ width: `${Math.min(item.percentage, 100)}%` }}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  School: {item.percentage}%
                </span>
              </div>
              {/* National comparison bar */}
              <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                <div 
                  className="h-4 rounded-full bg-gray-400"
                  style={{ width: `${Math.min(item.national, 100)}%` }}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                  NL: {item.national}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Explanation */}
      <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
        <p className="text-sm text-blue-800">{explanation}</p>
      </div>
    </div>
  )
}

// LVS Trend Visualization
export function LVSTrendChart({ subject, data }: {
  subject: string
  data: { month: string; percentage: number; target: number }[]
}) {
  const maxValue = Math.max(...data.map(d => Math.max(d.percentage, d.target))) + 10

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-800 mb-4">📈 LVS Trend: {subject}</h4>
      
      <div className="relative h-48 bg-gray-50 rounded-lg p-4">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(value => (
          <div 
            key={value}
            className="absolute left-0 right-0 border-t border-gray-200"
            style={{ bottom: `${(value / maxValue) * 100}%` }}
          >
            <span className="text-xs text-gray-500 bg-gray-50 px-1">{value}%</span>
          </div>
        ))}
        
        {/* Data points and lines */}
        <svg className="absolute inset-4 w-full h-full">
          {/* Target line */}
          <line 
            x1="0" 
            y1={`${100 - (data[0].target / maxValue) * 100}%`}
            x2="100%" 
            y2={`${100 - (data[data.length - 1].target / maxValue) * 100}%`}
            stroke="#ef4444" 
            strokeWidth="2" 
            strokeDasharray="5,5"
          />
          
          {/* Actual performance line */}
          {data.map((point, index) => {
            if (index === 0) return null
            const prevPoint = data[index - 1]
            return (
              <line
                key={index}
                x1={`${((index - 1) / (data.length - 1)) * 100}%`}
                y1={`${100 - (prevPoint.percentage / maxValue) * 100}%`}
                x2={`${(index / (data.length - 1)) * 100}%`}
                y2={`${100 - (point.percentage / maxValue) * 100}%`}
                stroke="#3b82f6"
                strokeWidth="3"
              />
            )
          })}
          
          {/* Data points */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={`${(index / (data.length - 1)) * 100}%`}
              cy={`${100 - (point.percentage / maxValue) * 100}%`}
              r="4"
              fill="#3b82f6"
            />
          ))}
        </svg>
        
        {/* Month labels */}
        <div className="absolute bottom-0 left-4 right-4 flex justify-between">
          {data.map((point, index) => (
            <span key={index} className="text-xs text-gray-600">{point.month}</span>
          ))}
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>Werkelijke prestatie</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-1 bg-red-500"></div>
          <span>Streefniveau</span>
        </div>
      </div>
    </div>
  )
}

// EDI Observation Scorecard
export function EDIObservationCard({ phase, score, maxScore, criteria, feedback }: {
  phase: string
  score: number
  maxScore: number
  criteria: string[]
  feedback: string
}) {
  const percentage = (score / maxScore) * 100
  const getScoreColor = () => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{phase}</h4>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-700">{score}/{maxScore}</span>
          <div className={`w-3 h-3 rounded-full ${getScoreColor()}`}></div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full ${getScoreColor()}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {/* Criteria checklist */}
      <div className="space-y-1 mb-3">
        {criteria.map((criterion, index) => (
          <div key={index} className="flex items-start space-x-2 text-sm">
            <span className={`mt-0.5 ${index < score ? 'text-green-600' : 'text-gray-400'}`}>
              {index < score ? '✓' : '○'}
            </span>
            <span className={index < score ? 'text-gray-700' : 'text-gray-400'}>
              {criterion}
            </span>
          </div>
        ))}
      </div>
      
      {/* Feedback */}
      <div className="bg-blue-50 rounded p-3 border-l-4 border-blue-500">
        <p className="text-sm text-blue-800">{feedback}</p>
      </div>
    </div>
  )
}

// Learning Line Progression Visual
export function LearningLineVisual({ subject, progression }: {
  subject: string
  progression: { grade: string; skills: string[]; example: string }[]
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-800 mb-4">📚 Leerlijn: {subject}</h4>
      
      <div className="relative">
        {/* Progression line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-blue-300"></div>
        
        {progression.map((stage, index) => (
          <div key={index} className="relative flex items-start space-x-4 pb-8">
            {/* Grade circle */}
            <div className="relative z-10 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {stage.grade}
            </div>
            
            {/* Content */}
            <div className="flex-1 bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="font-medium text-blue-800 mb-2">Groep {stage.grade}</h5>
              <ul className="space-y-1 mb-3">
                {stage.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-sm text-blue-700 flex items-start space-x-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-white rounded p-2 border border-blue-200">
                <p className="text-xs text-blue-600 font-medium mb-1">💡 Voorbeeld:</p>
                <p className="text-xs text-blue-800 italic">{stage.example}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// SEL Development Stages
export function SELDevelopmentChart({ stages }: {
  stages: { age: string; stage: string; characteristics: string[]; interventions: string[] }[]
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-800 mb-4">🧠 Sociaal-Emotionele Ontwikkeling</h4>
      
      <div className="grid gap-4">
        {stages.map((stage, index) => (
          <div key={index} className="border border-purple-200 rounded-lg p-4 bg-purple-50">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-purple-800">{stage.age}</h5>
              <span className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium">
                {stage.stage}
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="font-medium text-purple-700 mb-2">🎯 Kenmerken:</h6>
                <ul className="space-y-1">
                  {stage.characteristics.map((char, charIndex) => (
                    <li key={charIndex} className="text-sm text-purple-600 flex items-start space-x-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h6 className="font-medium text-purple-700 mb-2">🛠️ Interventies:</h6>
                <ul className="space-y-1">
                  {stage.interventions.map((intervention, intIndex) => (
                    <li key={intIndex} className="text-sm text-purple-600 flex items-start space-x-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{intervention}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Differentiation Matrix
export function DifferentiationMatrix({ activities }: {
  activities: { level: string; must: string; should: string; could: string }[]
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-800 mb-4">🎯 Differentiatie Matrix: Must - Should - Could</h4>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 p-3 text-left font-medium text-gray-700">Niveau</th>
              <th className="border border-gray-200 p-3 text-left font-medium text-red-700">Must (Basis)</th>
              <th className="border border-gray-200 p-3 text-left font-medium text-yellow-700">Should (Uitbreiding)</th>
              <th className="border border-gray-200 p-3 text-left font-medium text-green-700">Could (Verdieping)</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-3 font-medium text-gray-800">{activity.level}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-600 bg-red-50">{activity.must}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-600 bg-yellow-50">{activity.should}</td>
                <td className="border border-gray-200 p-3 text-sm text-gray-600 bg-green-50">{activity.could}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="bg-red-50 rounded p-3 border border-red-200">
          <h6 className="font-medium text-red-800 mb-1">🔴 Must (Verplicht)</h6>
          <p className="text-red-600">Minimale leerdoelen die iedereen moet behalen</p>
        </div>
        <div className="bg-yellow-50 rounded p-3 border border-yellow-200">
          <h6 className="font-medium text-yellow-800 mb-1">🟡 Should (Gewenst)</h6>
          <p className="text-yellow-600">Uitbreiding voor leerlingen die basis beheersen</p>
        </div>
        <div className="bg-green-50 rounded p-3 border border-green-200">
          <h6 className="font-medium text-green-800 mb-1">🟢 Could (Verrijking)</h6>
          <p className="text-green-600">Verdieping voor snelle leerlingen</p>
        </div>
      </div>
    </div>
  )
}

// 21st Century Skills Radar
export function SkillsRadarChart({ skills }: {
  skills: { name: string; level: number; description: string }[]
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-800 mb-4">🌟 21e-eeuwse Vaardigheden Assessment</h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Radar visualization (simplified) */}
        <div className="relative">
          <div className="w-48 h-48 mx-auto relative">
            {/* Concentric circles */}
            {[1, 2, 3, 4, 5].map(level => (
              <div
                key={level}
                className="absolute border border-gray-200 rounded-full"
                style={{
                  width: `${level * 20}%`,
                  height: `${level * 20}%`,
                  top: `${50 - (level * 10)}%`,
                  left: `${50 - (level * 10)}%`
                }}
              ></div>
            ))}
            
            {/* Skill points */}
            {skills.map((skill, index) => {
              const angle = (index / skills.length) * 2 * Math.PI
              const radius = (skill.level / 5) * 40 // 40% max radius
              const x = 50 + radius * Math.cos(angle - Math.PI / 2)
              const y = 50 + radius * Math.sin(angle - Math.PI / 2)
              
              return (
                <div
                  key={index}
                  className="absolute w-3 h-3 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  title={`${skill.name}: ${skill.level}/5`}
                ></div>
              )
            })}
          </div>
        </div>
        
        {/* Skills list */}
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index} className="border border-gray-200 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-medium text-gray-800">{skill.name}</h6>
                <span className="text-sm font-bold text-blue-600">{skill.level}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${(skill.level / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// School Leadership Dashboard
export function LeadershipDashboard({ metrics }: {
  metrics: { title: string; value: string; trend: 'up' | 'down' | 'stable'; color: string }[]
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="font-semibold text-gray-800 mb-4">📊 School Dashboard - Key Performance Indicators</h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className={`${metric.color} rounded-lg p-4 text-white`}>
            <div className="flex items-center justify-between mb-2">
              <h6 className="font-medium text-sm opacity-90">{metric.title}</h6>
              <span className="text-lg">
                {metric.trend === 'up' ? '📈' : metric.trend === 'down' ? '📉' : '➡️'}
              </span>
            </div>
            <div className="text-2xl font-bold">{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}