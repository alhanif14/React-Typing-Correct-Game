import { useEffect, useState } from "react";

const PlayGame = ({ onChangeScore }) => {
    const [defaultData] = useState(
        "Esse reprehenderit dolore ut minim consequat. Aute incididunt veniam dolor excepteur labore sint do aute laboris. Ad eiusmod fugiat duis sint occaecat pariatur proident enim non id nostrud. Tempor consectetur adipisicing Lorem proident duis anim. Sit exercitation aute nulla enim. Nulla deserunt cillum dolor nisi voluptate anim ipsum eiusmod magna exercitation. Anim consequat consequat enim minim cillum nulla culpa est fugiat tempor officia magna cupidatat aute."
    );
    const [dataTyping, setDataTyping] = useState([]);
    const [textTyping, setTextTyping] = useState({
        value: "",
        position: 0,
    });
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const addWord = (quantity = 20) => {
            const arrayDefaultDB = defaultData.split(" ");
            const dataTypingTest = [];
            for (let index = 0; index < quantity; index++) {
                const position = Math.floor(Math.random() * arrayDefaultDB.length);
                dataTypingTest.push({
                    value: arrayDefaultDB[position],
                    status: null,
                });
            }
            setDataTyping(dataTypingTest);
        };
        if (dataTyping.length === 0 || textTyping.position >= dataTyping.length) {
            addWord();
            setTextTyping({...textTyping, position: 0})
        }
    }, [dataTyping, textTyping.position, defaultData]);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer]);

    const handleChangeTyping = (e) => {
        const valueInput = e.target.value;
        if (!valueInput.includes(" ")) {
            setTextTyping((prevTextTyping) => ({
                ...prevTextTyping,
                value: valueInput,
            }));
        } else if (valueInput.trim() !== "") {
            checkResult();
        }
    };

    const checkResult = () => {
        setDataTyping((prevDataTyping) => {
            const dataCheck = [...prevDataTyping];
            const wordCheck = dataCheck[textTyping.position].value;
            if (textTyping.value === wordCheck) {
                dataCheck[textTyping.position].status = true;
                onChangeScore('right');
            } else {
                dataCheck[textTyping.position].status = false;
                onChangeScore('wrong');
            }
            console.log(dataCheck[textTyping.position].status);
            return dataCheck;
        });

        setTextTyping((prevTextTyping) => {
            const newPosition = prevTextTyping.position + 1;
            if (newPosition >= dataTyping.length) {
                const arrayDefaultDB = defaultData.split(" ");
                const dataTypingTest = [];
                for (let index = 0; index < 20; index++) {
                    const position = Math.floor(Math.random() * arrayDefaultDB.length);
                    dataTypingTest.push({
                        value: arrayDefaultDB[position],
                        status: null,
                    });
                }
                setDataTyping(dataTypingTest);
                return { value: "", position: 0 };
            }
            return { ...prevTextTyping, value: "", position: newPosition };
        });

        if (onChangeScore) {
            onChangeScore();
        }
    };

    return (
        <div className="playing">
            <div className="timer">{timer}</div>
            <ul className="list">
                {dataTyping.map((word, index) => (
                    <li
                        key={index}
                        className={
                            word.status === true
                                ? "correct"
                                : word.status === false
                                ? "incorrect"
                                : ""
                        }
                    >
                        {word.value}
                    </li>
                ))}
            </ul>
            <div className="inputForm">
                <input
                    type="text"
                    value={textTyping.value}
                    onChange={handleChangeTyping}
                />
            </div>
        </div>
    );
};

export default PlayGame;
