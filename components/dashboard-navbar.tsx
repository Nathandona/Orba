'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, ArrowLeft } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardNavbarProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  showBackButton?: boolean;
  backButtonPath?: string;
}

export function DashboardNavbar({
  user,
  leftContent,
  rightContent,
  showBackButton = false,
  backButtonPath = '/dashboard',
}: DashboardNavbarProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getUserInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-3 sm:px-4 lg:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(backButtonPath)}
              className="hidden sm:flex"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(backButtonPath)}
              className="sm:hidden p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}

          {!showBackButton && (
            <Link href="/dashboard" className="flex items-center gap-1 sm:gap-2">
              {mounted && (
                <Image
                  src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'}
                  alt="Orba Logo"
                  width={28}
                  height={28}
                  className="sm:w-8 sm:h-8 text-primary-foreground"
                />
              )}
              <h1 className="text-xl sm:text-2xl font-bold text-primary hidden sm:block">Orba</h1>
            </Link>
          )}

          {leftContent}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {rightContent}
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
                  <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
