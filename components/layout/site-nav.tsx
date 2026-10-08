"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { IconArrowRight, IconClose, IconMenu } from "@/components/icons";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navItems, site } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const desktopLinks = navItems.filter((item) => item.href !== "/contact");

  function openMenu() {
    dialogRef.current?.showModal();
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  return (
    <div className="flex items-center gap-1.5">
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1">
          {desktopLinks.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-medium leading-none transition-colors ${
                    current ? "bg-ink text-bg" : "text-muted hover:bg-sunken hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <ThemeToggle className="hidden lg:inline-flex" />
      <Link
        href="/contact"
        aria-current={isCurrent(pathname, "/contact") ? "page" : undefined}
        className="btn btn-primary hidden h-11 px-4 text-sm lg:inline-flex"
      >
        Get in touch
      </Link>
      <button
        ref={menuButtonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-sunken lg:hidden"
        aria-haspopup="dialog"
        aria-controls="site-menu"
        onClick={openMenu}
      >
        <span className="sr-only">Open menu</span>
        <IconMenu />
      </button>
      <dialog
        ref={dialogRef}
        id="site-menu"
        className="site-menu lg:hidden"
        aria-labelledby="site-menu-title"
        onClose={() => menuButtonRef.current?.focus()}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between px-5">
            <p id="site-menu-title" className="eyebrow">
              Menu
            </p>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-sunken"
              onClick={closeMenu}
            >
              <span className="sr-only">Close menu</span>
              <IconClose />
            </button>
          </div>
          <nav aria-label="Mobile" className="px-5">
            <ul className="border-t border-line">
              {[{ href: "/", label: "Home" }, ...navItems].map((item) => {
                const current = isCurrent(pathname, item.href);
                return (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={`flex min-h-15 items-center justify-between text-title-lg font-semibold tracking-[-0.03em] ${
                        current ? "text-accent" : "text-ink"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.label}
                      <IconArrowRight className="text-subtle" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-auto flex items-center justify-between gap-4 border-t border-line px-5 py-5">
            <p className="text-sm text-muted">{site.availability}</p>
            <ThemeToggle />
          </div>
        </div>
      </dialog>
    </div>
  );
}
