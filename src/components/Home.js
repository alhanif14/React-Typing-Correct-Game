const Home = ({onGame}) => {
    return (
        <div className="home">
            <div className="title">
                TYPING GAME
            </div>
            <button className="btnPlay"
            onClick={ () => onGame('PlayGame') }>
                Play Game
            </button>
        </div>
    )
}
export default Home;