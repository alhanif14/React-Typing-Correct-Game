const EndGame = ({score, onGame}) => {
    return (
        <div className="enGame">
            <div className="result">
                <div>
                    <div className="title">
                        Correct Word
                    </div>
                    <div className="number">
                        {score.right}
                    </div>
                </div>
                <div>
                    <div className="title">
                        Incorrect Word
                    </div>
                    <div className="number">
                        {score.wrong}
                    </div>
                </div>
            </div>
            <button className="btnPlay" onClick={() => onGame('playGame')}>
                Play Again
            </button>
        </div>
    )
}
export default EndGame;