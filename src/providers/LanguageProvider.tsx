"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

type LocaleType = "en" | "id";
type LocaleData = typeof en;

interface LanguageContextProps {
  locale: LocaleType;
  translations: LocaleData;
  changeLanguage: (lang: LocaleType) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState<LocaleType>("id");
  const [translations, setTranslations] = useState<LocaleData>(id);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as LocaleType;
    if (storedLang) {
      setLocale(storedLang);
      setTranslations(storedLang === "en" ? en : id);
    }
  }, []);

  const changeLanguage = (lang: LocaleType) => {
    setLocale(lang);

    setTranslations(lang === "en" ? en : id);
    localStorage.setItem("lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ locale, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
