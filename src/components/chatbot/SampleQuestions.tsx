
const SAMPLE_QUESTIONS = [
  "What is the difference between joggers and tights?",
  "Are your compression shorts available in navy?",
  "Which tops have moisture-wicking?",
  "What's your most popular hoodie?",
  "Suggest a good workout routine for beginners.",
];

interface SampleQuestionsProps {
  onSampleClick: (question: string) => void;
}

const SampleQuestions = ({ onSampleClick }: SampleQuestionsProps) => (
  <div className="text-gray-400 text-xs my-2 font-medium">
    👋 Hi there! Ask about our products or fitness in general.<br />
    <div className="flex flex-wrap mt-2 gap-1.5">
      {SAMPLE_QUESTIONS.map(q => (
        <button
          key={q}
          className="rounded border bg-white text-gray-600 px-2 py-1 text-xs shadow-sm hover:bg-corex-blue/10 focus:bg-corex-blue/10"
          style={{ borderColor: '#0088ff' }}
          tabIndex={0}
          onClick={() => onSampleClick(q)}
        >
          {q}
        </button>
      ))}
    </div>
  </div>
);

export default SampleQuestions;
