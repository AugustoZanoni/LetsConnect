import React, { createContext, useContext } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const AppCtx = createContext();
const useAppContext = () => useContext(AppCtx);

const AppContext = ({children}) => {
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        `${document.location.protocol === "https:" ? "wss" : "ws"}://${document.location.hostname}${document.location.port ? (":" + document.location.port) : ""}/ws`
    );

    useEffect(() => {
        if (lastMessage !== null) {
          //setMessageHistory((prev) => prev.concat(lastMessage));
        }
      }, [lastMessage]);

    const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
      }[readyState];

    return (
        <AppCtx.Provider value={{
            connectionStatus
        }}>
            {children}
        </AppCtx.Provider>
    )
}

export { AppContext, useAppContext }