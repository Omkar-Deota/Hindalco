export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Hindalco",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Transporter",
      href: "/transporter",
    },
    {
      label: "Sample",
      href: "/sample",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Omkar-Deota",
    linkedin: "https://www.linkedin.com/in/omkar-deota-a76957256/",
  },
};
