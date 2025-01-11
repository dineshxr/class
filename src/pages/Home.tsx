import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shuffle, ChevronRight, Timer, ListChecks, 
  Dices, Volume2, Calculator, BookOpen, PenTool, Target, MessageSquare, 
  Presentation, CircleEqual } from 'lucide-react';
import { SEO } from '../components/SEO';
import { BackgroundGradient } from '../components/ui/background-gradient';

export const tools = [
  {
    title: "Random Name Picker",
    description: "Randomly select students for participation with a fun animation",
    icon: <Users className="w-5 h-5" />,
    path: "random-name-picker",
    category: "Classroom Management",
    preview: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Group Generator",
    description: "Create random groups or pairs for collaborative activities",
    icon: <Shuffle className="w-5 h-5" />,
    path: "group-generator",
    category: "Classroom Management",
    preview: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Timer",
    description: "Set countdown timers for activities and transitions",
    icon: <Timer className="w-5 h-5" />,
    path: "timer",
    category: "Classroom Management",
    preview: "https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Checklist Generator",
    description: "Create and manage task lists for classroom activities",
    icon: <ListChecks className="w-5 h-5" />,
    path: "checklist-generator",
    category: "Classroom Management",
    preview: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Dice Roller",
    description: "Roll virtual dice for games and probability lessons",
    icon: <Dices className="w-5 h-5" />,
    path: "dice-roller",
    category: "Math",
    preview: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Sound Meter",
    description: "Monitor classroom noise levels with visual feedback",
    icon: <Volume2 className="w-5 h-5" />,
    path: "sound-meter",
    category: "Classroom Management",
    preview: "https://images.unsplash.com/photo-1516223725307-6f76b9182f7c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Math Game Generator",
    description: "Create custom math games for different skill levels",
    icon: <Calculator className="w-5 h-5" />,
    path: "math-game-generator",
    category: "Math",
    preview: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Vocabulary Builder",
    description: "Interactive tool for learning and practicing new words",
    icon: <BookOpen className="w-5 h-5" />,
    path: "vocabulary-builder",
    category: "Language Arts",
    preview: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Writing Prompts",
    description: "Generate creative writing prompts for all grade levels",
    icon: <PenTool className="w-5 h-5" />,
    path: "writing-prompts",
    category: "Language Arts",
    preview: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Goal Tracker",
    description: "Track student progress towards learning objectives",
    icon: <Target className="w-5 h-5" />,
    path: "goal-tracker",
    category: "Assessment",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Discussion Generator",
    description: "Create engaging discussion topics and questions",
    icon: <MessageSquare className="w-5 h-5" />,
    path: "discussion-generator",
    category: "Engagement",
    preview: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Lesson Planner",
    description: "Plan and organize lessons with customizable templates",
    icon: <Presentation className="w-5 h-5" />,
    path: "lesson-planner",
    category: "Planning",
    preview: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Grade Calculator",
    description: "Calculate and weight grades for assignments and tests",
    icon: <CircleEqual className="w-5 h-5" />,
    path: "grade-calculator",
    category: "Assessment",
    preview: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop"
  },
];

export function Home() {
  const navigate = useNavigate();
  const categories = [...new Set(tools.map(tool => tool.category))];

  return (
    <>
      <SEO 
        title="Class Tool - AI-Powered Educational Tools"
        description="A collection of AI-powered tools to enhance your learning experience"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-900">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <a href="#" className="inline-flex space-x-6">
                  <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                    Latest updates
                  </span>
                  <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                    <span>Just released v1.0</span>
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </span>
                </a>
              </div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                AI-Powered Educational Tools
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Enhance your learning experience with our collection of AI-powered tools. From classroom management to interactive learning, we've got everything you need.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <button
                  onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                  Get started
                </button>
                <a href="#" className="text-sm font-semibold leading-6 text-white">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
            <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
              <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                <img
                  src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        {/* Tools Grid */}
        <div id="tools" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {tools.filter(tool => tool.category === category).length} tools
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {tools
                    .filter(tool => tool.category === category)
                    .map((tool, index) => (
                      <BackgroundGradient key={index} className="p-6 h-full">
                        <div className="h-48 relative rounded-xl overflow-hidden mb-6">
                          <img
                            src={tool.preview}
                            alt={`Preview of ${tool.title}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400">
                            {tool.icon}
                          </div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                            {tool.title}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                          {tool.description}
                        </p>
                        <button
                          onClick={() => navigate(`/tools/${tool.path}`)}
                          className="w-full rounded-full pl-4 pr-1 py-1.5 text-white flex items-center justify-between bg-black dark:bg-zinc-800"
                        >
                          <span className="text-sm font-medium">Try it now</span>
                          <span className="bg-zinc-700 rounded-full p-1">
                            <ChevronRight className="h-4 w-4" />
                          </span>
                        </button>
                      </BackgroundGradient>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}