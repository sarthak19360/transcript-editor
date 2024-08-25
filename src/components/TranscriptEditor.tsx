import { useState, useEffect } from "react";
import lodash from "lodash";
import Modal from "./Modal";

const TranscriptEditor = ({
  initialTranscript,
}: {
  initialTranscript: { word: string; start_time: number; duration: number }[];
}) => {
  // State to track the transcript and current time
  const [transcript, setTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track the word being edited
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to handle the playback time update
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 100); // Increment time by 100ms
      }, 100);
    } else if (!isPlaying && currentTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime]);

  // Function to start playback
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Function to stop playback
  const handleStop = () => {
    setIsPlaying(false);
  };

  // Function to reset playback
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Function to handle editing a word
  const handleEditWord = (index: any) => {
    setEditingIndex(index); // Set the current word to be edited
  };

  // Function to handle change in the input field
  const handleWordChange = (e: any, index: number) => {
    const temp = initialTranscript[index].word;
    const newTranscript = lodash.cloneDeep(transcript);
    newTranscript[index].word = e.target.value;
    if (newTranscript[index].word === "") {
      newTranscript[index].word = temp;
    }
    setTranscript(newTranscript);
  };

  // Function to save the edited word
  const handleSaveWord = () => {
    setEditingIndex(null); // Exit editing mode
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="mx-auto w-9/12 my-3">
      <div className="my-4 flex justify-center">
        {/* Display transcript with highlighted word */}
        {transcript.map((item, index) => {
          const isActive =
            currentTime >= item.start_time &&
            currentTime < item.start_time + item.duration;

          return (
            <span
              key={index}
              style={{
                backgroundColor: isActive ? "yellow" : "transparent",
              }}
              className="px-1 cursor-pointer"
              onClick={() => {
                handleEditWord(index);
                setIsModalOpen(!isModalOpen);
              }} // Allow editing on click
            >
              {editingIndex === index ? (
                <>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(!isModalOpen)}
                    onChange={(e) => handleWordChange(e, index)}
                    onSubmit={handleSaveWord}
                    onBlur={handleSaveWord}
                    val={item.word}
                  />
                  {item.word}
                </>
              ) : (
                item.word
              )}
            </span>
          );
        })}
      </div>

      {/* Playback controls */}
      <div className="flex justify-center">
        <button
          className="bg-gray-500 text-white px-2 py-1 mx-2 my-1 rounded-lg"
          onClick={handlePlay}
        >
          Play
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 mx-2 my-1 rounded-lg"
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 mx-2 my-1 rounded-lg"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TranscriptEditor;
