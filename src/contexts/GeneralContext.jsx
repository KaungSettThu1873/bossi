import { createContext, useMemo } from "react";
import BASE_URL from "../hooks/baseUrl";
import useFetch from "../hooks/useFetch";

const GeneralContext = createContext({
    banners: null,
    banner_text: null,
    ads_banner: null,
    promotions: null,
    contacts: null,
    loading: false
});

const GeneralContextProvider = ({ children }) => {
    const { data, loading } = useFetch(BASE_URL + "/home");

    const value = useMemo(() => ({
        banners: data?.banners || null,
        banner_text: data?.banner_text || null,
        ads_banner: data?.ads_banner || null,
        promotions: data?.promotions || null,
        contacts: data?.contacts || null,
        loading
    }), [data, loading]);

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
};

export { GeneralContext, GeneralContextProvider };
