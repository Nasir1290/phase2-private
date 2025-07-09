"use client";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <PersistGate loading={<Loading />} persistor={persistor}> */}
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
