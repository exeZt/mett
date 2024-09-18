'use client';
import React, {useContext, Context} from "react";

export const AppContext: Context<object> = React.createContext<object>({})
export const useAppContext = () => React.useContext(AppContext);