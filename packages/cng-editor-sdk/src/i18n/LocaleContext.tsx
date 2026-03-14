import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Locale, LocaleStrings } from './strings';
import { getStrings } from './strings';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: LocaleStrings;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: getStrings('en'),
});

export interface LocaleProviderProps {
  locale?: Locale;
  children: React.ReactNode;
}

export function LocaleProvider({
  locale: initialLocale = 'en',
  children,
}: LocaleProviderProps): React.JSX.Element {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const t = useMemo(() => getStrings(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

/** Hook to access current locale strings and setter */
export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}

export { LocaleContext };
