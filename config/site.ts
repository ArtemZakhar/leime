export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'LEIME',
  description: 'Create an app with a popular memes.',
  navItems: [
    {
      label: 'Table',
      href: '/',
    },
    {
      label: 'List',
      href: '/list',
    },
  ],
  links: {
    github: 'https://github.com/heroui-inc/heroui',
    twitter: 'https://twitter.com/hero_ui',
    docs: 'https://heroui.com',
    discord: 'https://discord.gg/9b6yyZKmH4',
    sponsor: 'https://patreon.com/jrgarciadev',
  },
};
