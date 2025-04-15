import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Confetti from 'react-confetti';
import { format } from 'date-fns';
import {
  Moon,
  Sun,
  Activity,
  Droplets,
  Footprints,
  Flame,
  Heart,
  Moon as MoonIcon,
  Trophy,
  Timer,
  Scale,
  Apple,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const mockData = {
  steps: 8432,
  stepsGoal: 10000,
  calories: 1850,
  caloriesGoal: 2500,
  water: 6,
  waterGoal: 8,
  sleep: 7.5,
  sleepGoal: 8,
  weight: 70.5,
  mood: 'energetic',
  activities: [
    { date: '2024-03-01', steps: 7500 },
    { date: '2024-03-02', steps: 8200 },
    { date: '2024-03-03', steps: 9100 },
    { date: '2024-03-04', steps: 8432 },
  ],
};

const ProgressCard = ({ title, current, goal, color, icon: Icon }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div className="w-32 h-32 mx-auto">
        <CircularProgressbar
          value={percentage}
          text={`${Math.round(percentage)}%`}
          styles={buildStyles({
            pathColor: color.includes('text-') ? color.replace('text-', '') : color,
            textColor: color.includes('text-') ? color.replace('text-', '') : color,
            trailColor: '#d1d5db',
          })}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {current} / {goal}
        </p>
      </div>
    </motion.div>
  );
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {

    const interval = setInterval(() => {
      setSyncing(true);
      setTimeout(() => setSyncing(false), 1000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mockData.steps >= mockData.stepsGoal) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [mockData.steps]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Fitness Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-600" />}
          </button>
        </div>

        {syncing && (
          <div className="fixed top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Activity className="w-6 h-6 text-primary-500" />
            </motion.div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProgressCard
            title="Steps"
            current={mockData.steps}
            goal={mockData.stepsGoal}
            color="text-green-500"
            icon={Footprints}
          />
          <ProgressCard
            title="Calories"
            current={mockData.calories}
            goal={mockData.caloriesGoal}
            color="text-red-500"
            icon={Flame}
          />
          <ProgressCard
            title="Water"
            current={mockData.water}
            goal={mockData.waterGoal}
            color="text-blue-500"
            icon={Droplets}
          />
          <ProgressCard
            title="Sleep"
            current={mockData.sleep}
            goal={mockData.sleepGoal}
            color="text-purple-500"
            icon={MoonIcon}
          />
        </div>

        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Steps Trend</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.activities}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => format(new Date(date), 'MMM d')}
                />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="steps"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <Heart className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Heart Rate</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">72 BPM</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Achievements</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <Timer className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Active Time</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">45 mins</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <Scale className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Weight</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockData.weight} kg</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Today's Nutrition</h2>
            <Apple className="w-6 h-6 text-green-500" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">65g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">220g</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">55g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;