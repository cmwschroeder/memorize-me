import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import successSound from '../assets/success-sound-effect.mp3';
import failureSound from '../assets/game-fail-sound-effect.mp3';
import { addHighscore, updateHighscore } from '../utils/Helpers';

function OldOrNew() {

    var correctSound = new Howl({
        src: [successSound],
        html5: true,
    });

    var incorrectSound = new Howl({
        src: [failureSound],
        html5: true,
    });

    Howler.volume(0.2)

    const [score, setScore] = useState(0);
    const [currNew, setCurrNew] = useState(true);
    const [currWord, setCurrWord] = useState('');

    const [highscore, setHighscore] = useState(0);
    const [highscoreIndex, setHighscoreIndex] = useState(-1);
    const [highscoreId, setHighscoreId] = useState();

    const [game, setGame] = useState({});

    const params = useParams();

    const [unusedWords, setUnusedWords] = useState(['Hello', 'Goodbye', 'Computer', 'Programming', 'Javascript', 'Style', 'Sheet', 'Cool', 'Easy', 'Game', 'New',
        'Old', 'List', 'Make', 'More', 'Later', 'Number', 'Letter', 'Sequelize', 'Tree', 'Chicken', 'Donut', 'Binary', 'Dog', 'Cat', 'Search', 'Array', 'Logarithm',
        'Linear', 'Parabola', 'Constant', 'Aligator', 'Crocodile', 'Elephant', 'Telephone', 'Medal', 'Gem', 'Battle', 'Xylophone', 'Guitar', 'Color', 'Cascading',
        'Dragon', 'Pegasus', 'Minotaur', 'Piano', 'Diagonal', 'Across', 'According', 'Action', 'Admnistration', 'Adult', 'Agreement', 'Become', 'Below', 'Margin',
        'Background', 'Brother', 'Sister', 'Business', 'Camera', 'Candidate', 'Career', 'Challenge', 'Coding', 'Collection', 'Continue', 'Describe', 'Daughter',
        'Development', 'Difference', 'Direction', 'Economic', 'Education', 'Environment', 'Everybody', 'Experience', 'Father', 'Mother', 'Financial', 'Focus',
        'Generation', 'Glass', 'Government', 'Happen', 'Hospital', 'However', 'Imagine', 'Important', 'Individual', 'Information', 'Interesting', 'Knowledge',
        'Language', 'Leader', 'Leave', 'Listen', 'Machine', 'Magazine', 'Management', 'Measure', 'Memory', 'Minute', 'Movement', 'Necessary', 'Nothing', 'Notice',
        'Occur', 'Operation', 'Opportunity', 'Organization', 'Outside', 'Participant', 'Progress', 'Performance', 'Physical', 'Population', 'Pressure', 'Production',
        'Quality', 'Question', 'Quickly', 'Rather', 'Recognize', 'Record', 'Relationship', 'Responsibility', 'Reveal', 'Science', 'Security', 'Service', 'Source',
        'Significant', 'Similar', 'Situation', 'Sometimes', 'Southern', 'Statement', 'Successful', 'Technology', 'Throughout', 'Together', 'Tonight', 'Traditional',
        'Understand', 'Until', 'Various', 'Voice', 'Weight', 'Western', 'Whatever', 'Window', 'Weather', 'Wheat', 'Year', 'Young', 'Yourself', 'Zebra']);
    const [usedWords, setUsedWords] = useState([]);

    useEffect(() => {
        const username = localStorage.getItem('username');
        const selectWord = Math.floor(Math.random() * unusedWords.length);
        setCurrWord(unusedWords[selectWord]);
        const getGame = async () => {
            const response = await fetch('/api/game/' + params.gameId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const gameData = await response.json();
            setGame(gameData);
            for (let i = 0; i < gameData.highscores.length; i++) {
                if (gameData.highscores[i].username === username) {
                    setHighscoreIndex(i);
                    setHighscore(gameData.highscores[i].score);
                    setHighscoreId(gameData.highscores[i]._id);
                }
            };
        }
        getGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAnswer = (isNew) => {
        let currUnusedWords, currUsedWords;
        if ((isNew && currNew) || (!isNew && !currNew)) {
            setScore(score + 1);
            correctSound.play();
            if (currNew) {
                setUsedWords([...usedWords, currWord]);
                setUnusedWords(unusedWords.filter((word) => word === currWord ? false : true));
                currUnusedWords = unusedWords.filter((word) => word === currWord ? false : true);
                currUsedWords = [...usedWords, currWord];
            }
            else {
                currUnusedWords = [...unusedWords];
                currUsedWords = [...usedWords];
            }
            var selectType = Math.floor(Math.random() * 2);
            if (score > 5) {
                selectType = Math.floor(Math.random() * 2);
            }
            else {
                selectType = Math.floor(Math.random() * 3);
            }
            if (unusedWords.length !== 0) {
                if (selectType === 1 || selectType === 2) {
                    const selectWord = Math.floor(Math.random() * currUnusedWords.length);
                    setCurrNew(true);
                    setCurrWord(currUnusedWords[selectWord]);
                }
                else {
                    const selectWord = Math.floor(Math.random() * currUsedWords.length);
                    setCurrNew(false);
                    setCurrWord(currUsedWords[selectWord]);
                }
            }
            else {
                //ran out of words do something i guess idk we will figure it out later
                document.getElementById('currWord').classList.add('hidden');
                document.getElementById('old-btn').classList.add('hidden');
                document.getElementById('new-btn').classList.add('hidden');
                document.getElementById('game-over').classList.remove('hidden');
                document.getElementById('game-over').textContent = 'Ran out of words, Game Over'
                document.getElementById('end-score').classList.remove('hidden');
                document.getElementById('curr-highscore').classList.remove('hidden');
                document.getElementById('replay-btn').classList.remove('hidden');
                document.getElementById('add-highscore').classList.remove('hidden');
            }
        }
        else {
            //game over
            incorrectSound.play();
            document.getElementById('currWord').classList.add('hidden');
            document.getElementById('old-btn').classList.add('hidden');
            document.getElementById('new-btn').classList.add('hidden');
            document.getElementById('game-over').classList.remove('hidden');
            document.getElementById('end-score').classList.remove('hidden');
            document.getElementById('curr-highscore').classList.remove('hidden');
            document.getElementById('replay-btn').classList.remove('hidden');
            document.getElementById('add-highscore').classList.remove('hidden');
        }
    }

    const sendHighscore = () => {
        if (highscoreIndex === -1) {
            addHighscore(game.title, score);
            document.getElementById('save').classList.add('modal-open');
        } else {
            updateHighscore(highscoreId, score);
            document.getElementById('save').classList.add('modal-open');
        }
    }


    return (
        <div className="bg-base-200 min-h-screen">
            <div id="old-or-new-game" className="w-full flex justify-center">
                <div className="card w-5/6 bg-base-100 shadow-xl my-6 p-3">
                    <div className="card-body text-center">
                        <div className="flex flex-col sm:flex-row justify-between">
                            <h2 className="card-title text-4xl text-primary">Old Or New:</h2>
                            <h2 className="card-title text-4xl mt-4 sm:mt-0">Score: {score}</h2>
                        </div>
                        <p className="text-3xl text-info my-20" id="currWord">{score + 1}: {currWord}</p>
                        <p className="text-3xl text-accent my-20 hidden" id="game-over">Game Over</p>
                        <p className="text-3xl text-accent mb-10 hidden" id="end-score">Your score was: {score}</p>
                        <p className="text-3xl text-accent mb-10 hidden" id="curr-highscore">Your current highscore is: {highscore} &#127942;</p>
                        <div className="flex justify-around">
                            <button className="btn btn-secondary w-1/3" onClick={() => checkAnswer(false)} id="old-btn">Old</button>
                            <button className="btn btn-primary w-1/3" onClick={() => checkAnswer(true)} id="new-btn">New</button>
                        </div>
                        <div className="flex justify-around">
                            <button className="btn btn-secondary w-1/3 hidden" id="add-highscore" onClick={() => sendHighscore()}>Save Highscore</button>
                            <Link className="btn btn-primary w-1/3 hidden" id="replay-btn" to={'/game/' + game._id}>Play Again</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal modal-bottom sm:modal-middle" id="save">
                <div className="modal-box">
                    <h3 className="font-bold text-3xl text-secondary">Save</h3>
                    <p className="py-4" id="error-text">Highscore saved, your new highscore is: {score}</p>
                    <div className="modal-action">
                        <Link className="btn btn-accent w-1/3" to={'/game/' + game._id}>Close</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OldOrNew;