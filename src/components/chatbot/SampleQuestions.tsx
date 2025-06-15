
import { ArrowRight } from "lucide-react";

const SAMPLE_QUESTIONS = [
  "Where is my order?",
  "How do I return an item?",
  "Which tops have moisture-wicking?",
  "What's your most popular hoodie?",
  "Suggest a good workout routine for beginners.",
];

interface SampleQuestionsProps {
  onSampleClick: (question: string) => void;
}

const SampleQuestions = ({ onSampleClick }: SampleQuestionsProps) => (
  <div className="text-center px-4 py-8">
    <h4 className="text-base font-semibold text-gray-700 mb-2">Start a new conversation</h4>
    <p className="text-sm text-gray-500 mb-6">Ask me anything about our products, orders, or fitness.</p>
    <div className="flex flex-col items-start gap-3 text-left">
      {SAMPLE_QUESTIONS.map(q => (
        <button
          key={q}
          className="w-full text-left text-sm p-3 rounded-lg bg-white hover:bg-gray-100 text-gray-800 transition-colors flex justify-between items-center group border"
          tabIndex={0}
          onClick={() => onSampleClick(q)}
        >
          <span>{q}</span>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-corex-blue transition-colors" />
        </button>
      ))}
    </div>
  </div>
);

export default SampleQuestions;
