import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ThemeToggleProps {
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'ghost',
  size = 'icon',
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant}
            size={size}
            onClick={toggleTheme}
            className={`transition-all duration-200 ${className}`}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
            <span className="sr-only">Alternar tema</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {theme === 'light' 
              ? 'Mudar para tema escuro' 
              : 'Mudar para tema claro'
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Versão com texto para usar em menus
export const ThemeToggleWithText: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className={`w-full justify-start ${className}`}
    >
      {theme === 'light' ? (
        <>
          <Moon className="mr-2 h-4 w-4" />
          Tema Escuro
        </>
      ) : (
        <>
          <Sun className="mr-2 h-4 w-4" />
          Tema Claro
        </>
      )}
    </Button>
  );
};
