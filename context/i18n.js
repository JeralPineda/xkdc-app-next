import { useRouter } from 'next/router';
import { createContext, useContext, useCallback } from 'react';
import es from '../traslations/es.json';
import en from '../traslations/en.json';

const I18NContext = createContext();

const languages = { es, en };

//slug -> slugify (comic/123)

export function I18NProvider({ children }) {
  // Recuperar el idioma en el que estamos
  const { locale } = useRouter();

  //! useMemo es para valores

  //* Cuando usar callback, cuando se va a regenerar o cambia una dependencia, useCallback permite que se regenere solo cuando cambie locale, es para memorizar una función
  const t = useCallback(
    (key, ...args) => {
      let translation = languages[locale][key];
      if (args.length === 0) return translation;

      args.forEach((value, index) => {
        translation = translation.replace(`\${${index + 1}}`, value);
      });

      return translation;
    },
    [locale]
  );

  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>;
}

// Hoock que permitira usar el metodo t
export function useI18N() {
  const context = useContext(I18NContext);

  //* Buena practica cuando son hooks para consumir
  if (context === undefined) {
    throw new Error('useI18N must be used within a I18NProvider');
  }

  return context;
}
