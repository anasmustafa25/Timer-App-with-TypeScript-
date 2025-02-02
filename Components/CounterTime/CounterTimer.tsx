import React, { useEffect, useRef, useState } from 'react';
import './CounterTimer.css';

interface TimeInput {
    hours: number;
    minutes: number;
    seconds: number;
}

const CounterTimer: React.FC = () => {
    const [time, setTime] = useState<number>(0);
    const [isActive, setActive] = useState<boolean>(false);
    const [isPause, setIsPause] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [input, setInput] = useState<TimeInput>({ hours: 0, minutes: 0, seconds: 0 });

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    };

    const handleSetTime = () => {
        const totalSeconds = input.hours * 3600 + input.minutes * 60 + input.seconds;
        setTime(totalSeconds);
    };

    const formatTime = (): string => {
        const hrs = String(Math.floor(time / 3600)).padStart(2, '0');
        const min = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
        const sec = String(time % 60).padStart(2, '0');
        return `${hrs}:${min}:${sec}`;
    };

    const handleStart = () => {
        if (time > 0) {
            setActive(true);
            setIsPause(false);
        }
    };

    useEffect(() => {
        if (isActive && !isPause) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }

        if (time === 0 && isActive) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setActive(false);
            alert('Time is up');
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, isPause, time]);

    const handlePause = () => {
        setIsPause(!isPause);
    };

    const handleReset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setActive(false);
        setIsPause(false);
        setTime(0);
        setInput({ hours: 0, minutes: 0, seconds: 0 });
    };

    return (
        <div className='countdown-timer'>
            <h1>Countdown Timer</h1>
            <div className='timer-display'>
                <div className='input-group'>
                    <input type='number' name='hours' value={input.hours} placeholder='Hrs' onChange={handleInput} />
                    <input type='number' name='minutes' value={input.minutes} placeholder='Min' onChange={handleInput} />
                    <input type='number' name='seconds' value={input.seconds} placeholder='Sec' onChange={handleInput} />
                    <button onClick={handleSetTime}>Set Time</button>
                </div>
            </div>
            <div className='time'>{formatTime()}</div>
            <div className='timer-controls'>
                <button onClick={handleStart} disabled={isActive && !isPause}>Start</button>
                <button onClick={handlePause} disabled={!isActive}>{isPause ? 'Resume' : 'Pause'}</button>
                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default CounterTimer;
