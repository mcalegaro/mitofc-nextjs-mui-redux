// ./store/store
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { reducer as teamsReducer } from "./teams/reducer";

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
    teams: teamsReducer,
    // OTHER REDUCERS WILL BE ADDED HERE
});

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
    if (isServer) {
        //If it's on server side, create a store
        return createStore(combinedReducer, bindMiddleware([thunkMiddleware]));
    } else {
        //If it's on client side, create a store which will persist
        const { persistStore, persistReducer } = require("redux-persist");
        const storage = require("redux-persist/lib/storage").default;

        const persistConfig = {
            key: "mitoFcSession",
            whitelist: ["teams"], // only reducers in this list will be persisted, add other reducers if needed
            storage, // if needed, use a safer storage
        };

        // Create a new reducer with our existing reducer
        const persistedReducer = persistReducer(persistConfig, combinedReducer);

        const store = createStore(
            persistedReducer,
            bindMiddleware([thunkMiddleware])
        ); // Creating the store again

        // This creates a persistor object & push that persisted object to .__persistor, 
        // so that we can avail the persistability feature
        store.__persistor = persistStore(store);

        return store;
    }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);