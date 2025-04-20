import { siteConfig } from '@/config/site';
import { contacts } from '@/constants/contacts';
import { Link } from '@heroui/link';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from '@heroui/navbar';
import { link as linkStyles } from '@heroui/theme';

import NextLink from 'next/link';

import clsx from 'clsx';

import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '@/components/icons';
import { ThemeSwitch } from '@/components/theme-switch';

export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="flex gap-2">
          <Link isExternal aria-label="Github" href={contacts.github}>
            <GithubIcon className="text-default-500" />
          </Link>

          <Link isExternal aria-label="Github" href={contacts.linkedin}>
            <LinkedinIcon />
          </Link>

          <Link isExternal aria-label="Github" href={contacts.whatsApp}>
            <WhatsAppIcon />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
