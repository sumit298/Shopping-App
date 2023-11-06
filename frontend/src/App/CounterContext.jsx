import { createContext, useState } from "react";

const CounterContext = createContext()

export const CounterProvider = ({ children }) => {
    const [counter, setCounter] = useState(0);

    const increment = () => {
        return setCounter(counter + 1)
    }

    const decrement = () => {
        return setCounter(counter - 1)
    }

    const incrementByAmount = (amount) => {
        return setCounter(counter + Number(amount))
    }

    const reset = ()=> {
        return setCounter(0);
    }

    return (
        <CounterContext.Provider value={{ counter, increment, incrementByAmount, decrement, reset }}>
            {children}
        </CounterContext.Provider>
    )
}

export default CounterContext;