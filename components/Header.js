import { useRef, useState } from 'react';
import { Text } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header = () => {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();

    if (!q) return;

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults.results);
      });
  };

  const restOfLocales = locales.filter((l) => l !== locale);

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <Text
        h1
        size={35}
        css={{
          textGradient: '45deg, #000 -20%, #bbb 100%',
          alignItems: 'center',
        }}
        weight="bold"
      >
        <Link href="/">
          <a>
            next
            <span className="font-light">xkdc</span>
          </a>
        </Link>
      </Text>

      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <Link href="/">
              <a className="text-sm">Home</a>
            </Link>
          </li>

          {/* Traducción */}
          {/* Nunca tienes que crear url, hay que decirle a donde ir y en que idioma */}
          <li>
            <Link href="/" locale={restOfLocales[0]}>
              <a className="text-sm font-semibold">{restOfLocales[0]}</a>
            </Link>
          </li>

          {/* Search */}
          <li>
            <input className="px-4 py-1 text-xs border border-gray-400 rounded-3xl" ref={searchRef} type="search" placeholder="Search..." onChange={handleChange} />
            <div className="relative z-10">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0">
                  <ul className="z-50 w-full overflow-hidden bg-white border rounded-lg shadow-xl border-gray-50">
                    <li className="m-0" key="all-results">
                      <Link href={`/search?q=${getValue()}`}>
                        <a className="block px-2 py-1 overflow-hidden text-sm italic font-semibold text-gray-400 hover:bg-slate-200 text-ellipsis whitespace-nowrap">Ver {results.length} resultados</a>
                      </Link>
                    </li>

                    {results.map((result) => {
                      return (
                        <li className="m-0" key={result.id}>
                          <Link href={`/comic/${result.id}`}>
                            <a className="block px-2 py-1 overflow-hidden text-sm font-semibold hover:bg-slate-200 text-ellipsis whitespace-nowrap">{result.title}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};
