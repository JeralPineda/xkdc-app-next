import { Text } from '@nextui-org/react';
import Link from 'next/link';

export const Header = () => {
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
          <li>
            <Link href="/about">
              <a className="text-sm">About</a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a className="text-sm">Search</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
