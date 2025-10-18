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
import { User, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

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
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(backButtonPath)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          
          {!showBackButton && (
            <>
              <Image
                src={theme === 'dark' ? '/logo-light.svg' : '/logo-dark.svg'}
                alt="Orba Logo"
                width={32}
                height={32}
                className="text-primary-foreground"
              />
              <h1 className="text-2xl font-bold text-primary">Orba</h1>
            </>
          )}
          
          {leftContent}
        </div>

        <div className="flex items-center gap-3">
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
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
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
